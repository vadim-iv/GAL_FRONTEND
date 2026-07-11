'use client'

import { useQueryClient } from '@tanstack/react-query'
import { AnimatePresence, motion } from 'framer-motion'
import { useLenis } from 'lenis/react'
import { useLocale, useTranslations } from 'next-intl'
import { useEffect, useState, useCallback } from 'react'
import { FieldErrors, useForm, useWatch } from 'react-hook-form'
import { createPortal } from 'react-dom'
import { toast } from 'sonner'

import { LangBtn } from '../../BlogPageComponents/LangBtn'
import { Button } from '../../ui/Button'
import { ConfirmDeleteModal } from '../../ui/ConfirmDeleteModal/ConfirmDeleteModal'
import { Spinner } from '../../ui/Spinner/Spinner'

import { ADMIN_MEMBERS_TRANSLATE } from '@/constants/admin-members-translate.data'
import { ImageToUpload } from '@/types/blog.types'
import { IMemberResponse, MemberRolesEnum, TypeMemberFormState } from '@/types/member.types'

import { useCreateMember } from '@/hooks/member/useCreateMember'
import { useDeleteMember } from '@/hooks/member/useDeleteMember'
import { useUpdateMember } from '@/hooks/member/useUpdateMember'
import { useUploadMemberImages } from '@/hooks/member/useUploadMemberImages'
import { useDeleteMemberImages } from '@/hooks/member/useDeleteMemberImages'

import { MemberEmailInput } from './MemberEmailInput'
import { MemberNameInput } from './MemberNameInput'
import { MemberShortDetailsInput } from './MemberShortDetailsInput'
import { MemberPresidentBioInput } from './MemberPresidentBioInput'
import { MemberImageInput } from './MemberImageInput'
import { MemberRolesInput } from './MemberRolesInput'

interface Props {
	// Pre-checks this one role when creating from a section's "Add" button.
	// Ignored in edit mode, where the checkboxes reflect the member's actual roles.
	initialRole?: MemberRolesEnum
	member?: IMemberResponse
	onClose: () => void
}

export function MemberFormModal({ initialRole, member, onClose }: Props) {
	const locale = useLocale() as 'ro' | 'ru' | 'en'
	const [language, setLanguage] = useState<'ro' | 'ru' | 'en'>(locale)
	const isEdit = !!member

	const lenis = useLenis()
	const t = useTranslations('Admin.ToastMessages')
	const tAdmin = useTranslations('Admin')
	const queryClient = useQueryClient()

	useEffect(() => {
		lenis?.stop()
		return () => lenis?.start()
	}, [lenis])

	const [imagesToUpload, setImagesToUpload] = useState<ImageToUpload[]>([])
	const [imagesToDelete, setImagesToDelete] = useState<string[]>([])
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

	const { uploadImages, isImagesUploadPending } = useUploadMemberImages()
	const { deleteImages, isDeletePending: isImagesDeletePending } = useDeleteMemberImages()
	const { createMember, isCreatePending } = useCreateMember()
	const { updateMember, isUpdatePending } = useUpdateMember(member?._id ?? '')
	const { deleteMember, isDeletePending: isMemberDeletePending } = useDeleteMember()

	const addImageToUpload = useCallback((image: ImageToUpload) => {
		setImagesToUpload(prev => {
			if (!prev.find(img => img.uploadUrl === image.uploadUrl)) {
				return [...prev, image]
			}
			return prev
		})
	}, [])

	const addImageToDelete = useCallback((imageUrl: string) => {
		setImagesToDelete(prev => {
			if (!prev.includes(imageUrl)) {
				return [...prev, imageUrl]
			}
			return prev
		})
	}, [])

	const removeImageFromUpload = useCallback((uploadUrl: string) => {
		setImagesToUpload(prev => prev.filter(img => img.uploadUrl !== uploadUrl))
	}, [])

	const { register, control, handleSubmit, formState, setError } = useForm<TypeMemberFormState>({
		mode: 'onSubmit',
		reValidateMode: 'onChange',
		defaultValues: isEdit
			? {
					email: member.email,
					name: member.name,
					details: member.details ?? { ro: '', ru: '', en: '' },
					shortDetails: member.shortDetails,
					imageUrl: member.imageUrl ?? '',
					roles: member.roles
				}
			: {
					email: '',
					name: { ro: '', ru: '', en: '' },
					details: { ro: '', ru: '', en: '' },
					shortDetails: { ro: '', ru: '', en: '' },
					imageUrl: '',
					roles: initialRole ? [initialRole] : []
				}
	})

	const roles = useWatch({ control, name: 'roles' }) ?? []
	const isPresident = roles.includes(MemberRolesEnum.PRESIDENT)

	// Only invalidate the member/management caches once the whole chain (metadata +
	// any pending image upload/delete) is truly done — invalidating earlier would
	// refetch the list while imageUrl still points at a not-yet-uploaded S3 object.
	const finish = () => {
		queryClient.invalidateQueries({ queryKey: ['members'] })
		queryClient.invalidateQueries({ queryKey: ['management'] })
		onClose()
	}

	const afterMutationSuccess = () => {
		if (imagesToUpload.length > 0) {
			uploadImages(imagesToUpload, {
				onSuccess: () => {
					setImagesToUpload([])
					if (imagesToDelete.length > 0) {
						deleteImages(imagesToDelete, {
							onSuccess: () => {
								setImagesToDelete([])
								finish()
							}
						})
					} else {
						finish()
					}
				}
			})
		} else if (imagesToDelete.length > 0) {
			deleteImages(imagesToDelete, {
				onSuccess: () => {
					setImagesToDelete([])
					finish()
				}
			})
		} else {
			finish()
		}
	}

	// RichTextEditor remounts (via `key`) on every language switch so it can rebind to
	// the new field path — but useController-based fields unregister themselves on
	// unmount (unlike plain register() fields), so a language tab that was visited
	// and then abandoned silently drops out of RHF's tracked fields, along with its
	// required rule. Registration state can't be trusted for cross-language
	// completeness, so it's re-checked directly against live values here instead.
	const isMultiLangComplete = (value?: { ro?: string; ru?: string; en?: string }) =>
		!!value?.ro?.trim() && !!value?.ru?.trim() && !!value?.en?.trim()

	const onSubmit = (data: TypeMemberFormState) => {
		let hasError = false

		if (!data.roles || data.roles.length === 0) {
			setError('roles', { type: 'manual' })
			hasError = true
		}
		if (!isMultiLangComplete(data.name)) {
			setError('name', { type: 'manual' })
			hasError = true
		}
		if (!isMultiLangComplete(data.shortDetails)) {
			setError('shortDetails', { type: 'manual' })
			hasError = true
		}
		if (data.roles?.includes(MemberRolesEnum.PRESIDENT) && !isMultiLangComplete(data.details)) {
			setError('details', { type: 'manual' })
			hasError = true
		}

		if (hasError) {
			toast.error(t('please_fill_in_all_required_fields_correctly'))
			return
		}

		const payload: TypeMemberFormState = { ...data }

		if (!data.roles?.includes(MemberRolesEnum.PRESIDENT)) {
			delete payload.details
			if (payload.imageUrl) addImageToDelete(payload.imageUrl)
			delete payload.imageUrl
		}

		if (isEdit) {
			const updatePayload = { ...payload }
			delete updatePayload.email
			updateMember(updatePayload, { onSuccess: afterMutationSuccess })
		} else {
			createMember(payload, { onSuccess: afterMutationSuccess })
		}
	}

	const onInvalid = (errors: FieldErrors<TypeMemberFormState>) => {
		if (Object.keys(errors).length > 0) {
			toast.error(t('please_fill_in_all_required_fields_correctly'))
		}
	}

	const isPending =
		isCreatePending || isUpdatePending || isImagesUploadPending || isImagesDeletePending || isMemberDeletePending

	return createPortal(
		<motion.div
			className='fixed inset-0 flex items-center backdrop-blur-[0.25rem] justify-center bg-black/35 z-[50000]'
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			onClick={e => {
				if (e.target === e.currentTarget) onClose()
			}}
		>
			<motion.div
				initial={{ y: '-10%' }}
				animate={{ y: '0%' }}
				exit={{ y: '-10%' }}
				transition={{ type: 'spring', stiffness: 150, damping: 25 }}
				data-lenis-prevent
				className='modal-scrollbar relative bg-white max-w-[50rem] w-full max-h-[90vh] overflow-y-auto rounded-[1rem] p-[1.5rem] flex flex-col gap-[1.5rem]'
			>
				{isPending && (
					<div className='fixed inset-0 flex justify-center items-center bg-black/10 z-[100000]'>
						<Spinner />
					</div>
				)}

				<div className='flex items-center justify-between'>
					<h2 className='text-[1.5rem] font-bold text-green-700'>
						{isEdit ? ADMIN_MEMBERS_TRANSLATE.editMemberTitle[language] : ADMIN_MEMBERS_TRANSLATE.addMemberTitle[language]}
					</h2>
					<div className='flex items-center'>
						<LangBtn type='button' text='Română' isActive={language === 'ro'} onClick={() => setLanguage('ro')} />
						<LangBtn type='button' text='English' isActive={language === 'en'} onClick={() => setLanguage('en')} />
						<LangBtn type='button' text='Русский' isActive={language === 'ru'} onClick={() => setLanguage('ru')} />
					</div>
				</div>

				<form
					onSubmit={e => {
						e.stopPropagation()
						handleSubmit(onSubmit, onInvalid)(e)
					}}
					className='flex flex-col gap-[1.5rem]'
				>
					<MemberRolesInput language={language} control={control} formState={formState} />
					<MemberEmailInput language={language} register={register} formState={formState} disabled={isEdit} />
					<MemberNameInput language={language} register={register} formState={formState} />

					{isPresident && (
						<MemberPresidentBioInput language={language} register={register} control={control} formState={formState} />
					)}

					<MemberShortDetailsInput language={language} register={register} control={control} formState={formState} />

					{isPresident && (
						<MemberImageInput
							language={language}
							control={control}
							formState={formState}
							addImageToUpload={addImageToUpload}
							addImageToDelete={addImageToDelete}
							removeImageFromUpload={removeImageFromUpload}
						/>
					)}

					<div className='flex justify-between items-center mt-[0.5rem]'>
						{isEdit ? (
							<p
								onClick={() => setIsDeleteModalOpen(true)}
								className='cursor-pointer text-[1rem] leading-[1.125rem] text-error hover:opacity-70 transition-opacity duration-300'
							>
								{tAdmin('delete_member')}
							</p>
						) : (
							<div />
						)}

						<div className='flex items-center gap-[1.5rem]'>
							<p
								onClick={onClose}
								className='cursor-pointer text-[1rem] leading-[1.125rem] hover:opacity-60 transition-opacity duration-300'
							>
								{tAdmin('cancel')}
							</p>
							<Button type='submit' disabled={isPending} className='w-fit px-[2rem]'>
								{tAdmin('save')}
							</Button>
						</div>
					</div>
				</form>

				<AnimatePresence>
					{isDeleteModalOpen && member && (
						<ConfirmDeleteModal
							message={tAdmin('permanently_delete_member_question')}
							handleDelete={() => deleteMember(member._id, { onSuccess: onClose })}
							setDeleteModalOpen={setIsDeleteModalOpen}
							manageLenis={false}
						/>
					)}
				</AnimatePresence>
			</motion.div>
		</motion.div>,
		document.body
	)
}
