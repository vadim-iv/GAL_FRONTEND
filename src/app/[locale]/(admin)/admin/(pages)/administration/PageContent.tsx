'use client'

import { useQueryClient } from '@tanstack/react-query'
import { useLocale } from 'next-intl'
import { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'

import { StatisticsNav as ManagementNav } from '@/components/AdminComponents/StatisticsPageComponents/StatisticsNav'
import { GeneralAssemblySection } from '@/components/AdminComponents/MembersPageComponents/GeneralAssemblySection'
import { MainImageFields } from '@/components/AdminComponents/MembersPageComponents/MainImageFields'
import { MemberListSection } from '@/components/AdminComponents/MembersPageComponents/MemberListSection'
import { PresidentSection } from '@/components/AdminComponents/MembersPageComponents/PresidentSection'

import { ADMIN_MEMBERS_TRANSLATE } from '@/constants/admin-members-translate.data'
import { ImageToUpload } from '@/types/blog.types'
import { TypeMainImageFormState } from '@/types/management.types'
import { MemberRolesEnum } from '@/types/member.types'

import { useDeleteImages } from '@/hooks/blog/useDeleteImages'
import { useUploadImages } from '@/hooks/blog/useUploadImages'
import { useGetMembers } from '@/hooks/member/useGetMembers'
import { useInitialMainImageData } from '@/hooks/management/useInitialMainImageData'
import { useUpdateMainImage } from '@/hooks/management/useUpdateMainImage'

export function PageContent() {
	const locale = useLocale() as 'ro' | 'ru' | 'en'
	const [language, setLanguage] = useState<'ro' | 'ru' | 'en'>(locale)

	const { members } = useGetMembers()
	const allMembers = members ?? []

	const queryClient = useQueryClient()

	const [imagesToUpload, setImagesToUpload] = useState<ImageToUpload[]>([])
	const [imagesToDelete, setImagesToDelete] = useState<string[]>([])

	const { uploadImages, isImagesUploadPending } = useUploadImages()
	const { deleteImages, isDeletePending } = useDeleteImages()
	const { updateMainImage, isMainImageUpdatePending } = useUpdateMainImage()

	const { control, handleSubmit, formState, reset } = useForm<TypeMainImageFormState>({
		mode: 'onSubmit'
	})
	const { isLoading } = useInitialMainImageData(reset)

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

	const isPending = isImagesUploadPending || isDeletePending || isMainImageUpdatePending || isLoading

	// Only invalidate the management cache once the whole chain (metadata + any
	// pending image upload/delete) is truly done — invalidating earlier would
	// refetch it while main_image still points at a not-yet-uploaded S3 object.
	const finish = () => {
		queryClient.invalidateQueries({ queryKey: ['management'] })
	}

	const onSubmit = (data: TypeMainImageFormState) => {
		updateMainImage(data.main_image ?? '', {
			onSuccess: () => {
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
		})
	}

	return (
		<div className='flex justify-end w-full'>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className='mt-[3rem] sidebar-req:w-[calc(100vw-20.625rem)] fullhd-threshold:w-[calc(var(--breakpoint-fullhd-threshold)-20.625rem)] w-full'
			>
				<ManagementNav language={language} setLanguage={setLanguage} isPending={isPending} />

				<MainImageFields
					language={language}
					control={control}
					formState={formState}
					addImageToUpload={addImageToUpload}
					addImageToDelete={addImageToDelete}
					removeImageFromUpload={removeImageFromUpload}
				/>

				<PresidentSection members={allMembers} language={language} />

				<MemberListSection
					role={MemberRolesEnum.EXECUTIVE_BODY}
					title={ADMIN_MEMBERS_TRANSLATE.sectionTitles.executive[language]}
					addLabel={ADMIN_MEMBERS_TRANSLATE.addButtonLabel.executive[language]}
					members={allMembers}
					language={language}
				/>

				<MemberListSection
					role={MemberRolesEnum.ADMINISTRATION}
					title={ADMIN_MEMBERS_TRANSLATE.sectionTitles.administration[language]}
					addLabel={ADMIN_MEMBERS_TRANSLATE.addButtonLabel.administration[language]}
					members={allMembers}
					language={language}
				/>

				<MemberListSection
					role={MemberRolesEnum.SELECTION_COMMITTEE}
					title={ADMIN_MEMBERS_TRANSLATE.sectionTitles.committee[language]}
					addLabel={ADMIN_MEMBERS_TRANSLATE.addButtonLabel.committee[language]}
					members={allMembers}
					language={language}
				/>

				<MemberListSection
					role={MemberRolesEnum.CENSORSHIP_COMMITTEE}
					title={ADMIN_MEMBERS_TRANSLATE.sectionTitles.censorship[language]}
					addLabel={ADMIN_MEMBERS_TRANSLATE.addButtonLabel.censorship[language]}
					members={allMembers}
					language={language}
				/>

				<GeneralAssemblySection members={allMembers} language={language} />
			</form>
		</div>
	)
}
