'use client'

import { useLocale, useTranslations } from 'next-intl'
import { useState } from 'react'
import { FieldErrors, useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { LocalCallForm } from '@/components/AdminComponents/LocalCallsPageComponents/LocalCallForm/LocalCallForm'
import { LocalCallPageNav } from '@/components/AdminComponents/LocalCallsPageComponents/LocalCallPageNav'

import { ImageToUpload } from '@/types/blog.types'
import { TypeLocalCallFormState } from '@/types/local-call.types'

import { ADMIN_PAGES } from '@/config/admin-pages.config'

import { useDeleteLocalCall } from '@/hooks/local-call/useDeleteLocalCall'
import { useDeleteLocalCallFiles } from '@/hooks/local-call/useDeleteLocalCallFiles'
import { useInitialLocalCallData } from '@/hooks/local-call/useInitialLocalCallData'
import { useUpdateLocalCall } from '@/hooks/local-call/useUpdateLocalCall'
import { useUploadLocalCallFiles } from '@/hooks/local-call/useUploadLocalCallFiles'

import { useRouter } from '@/i18n/navigation'
import { Pathnames } from '@/i18n/routing'

interface Props {
	localCallId: string
}

export function PageContent({ localCallId }: Props) {
	const router = useRouter()
	const locale = useLocale() as 'ro' | 'ru' | 'en'
	const [language, setLanguage] = useState<'ro' | 'ru' | 'en'>(locale)

	const [imagesToUpload, setImagesToUpload] = useState<ImageToUpload[]>([])
	const [imagesToDelete, setImagesToDelete] = useState<string[]>([])

	const { uploadFiles, isFilesUploadPending } = useUploadLocalCallFiles()
	const { deleteFiles, isDeletePending } = useDeleteLocalCallFiles()
	const { updateLocalCall, isUpdatePending } = useUpdateLocalCall(localCallId)
	const { deleteLocalCall, isDeletePending: isLocalCallDeletePending } = useDeleteLocalCall()

	const { reset, register, handleSubmit, control, formState } = useForm<TypeLocalCallFormState>({
		mode: 'onSubmit',
		reValidateMode: 'onChange'
	})

	const { isLoading } = useInitialLocalCallData(localCallId, reset)

	const t = useTranslations('Admin.ToastMessages')

	const onSubmit = (data: TypeLocalCallFormState) => {
		if (!data.questions || data.questions.length === 0) {
			toast.error(t('local_call_needs_at_least_one_question'))
			return
		}

		updateLocalCall(data, {
			onSuccess: () => {
				if (imagesToUpload.length > 0) {
					uploadFiles(imagesToUpload, {
						onSuccess: () => {
							setImagesToUpload([])
							if (imagesToDelete.length > 0) {
								deleteFiles(imagesToDelete, {
									onSuccess: () => setImagesToDelete([])
								})
							}
						}
					})
				} else if (imagesToDelete.length > 0) {
					deleteFiles(imagesToDelete, {
						onSuccess: () => setImagesToDelete([])
					})
				}
			}
		})
	}

	const handleDeleteLocalCall = () => {
		deleteLocalCall(localCallId, {
			onSuccess: () => {
				router.push(ADMIN_PAGES.LOCAL_CALLS as Pathnames)
			}
		})
	}

	const onInvalid = (errors: FieldErrors<TypeLocalCallFormState>) => {
		if (Object.keys(errors).length > 0) {
			toast.error(t('please_fill_in_all_required_fields_correctly'))
		}
	}

	const isPending = isFilesUploadPending || isDeletePending || isUpdatePending || isLocalCallDeletePending || isLoading

	return (
		<div className='flex justify-end w-full'>
			<form
				className='mt-[3rem] sidebar-req:w-[calc(100vw-20.625rem)] fullhd-threshold:w-[calc(var(--breakpoint-fullhd-threshold)-20.625rem)] w-full'
				onSubmit={handleSubmit(onSubmit, onInvalid)}
			>
				<LocalCallPageNav
					onDeleteLocalCall={handleDeleteLocalCall}
					isPending={isPending}
					language={language}
					setLanguage={setLanguage}
				/>

				<LocalCallForm
					isPending={isPending}
					formState={formState}
					control={control}
					register={register}
					language={language}
					setImagesToUpload={setImagesToUpload}
					setImagesToDelete={setImagesToDelete}
				/>
			</form>
		</div>
	)
}
