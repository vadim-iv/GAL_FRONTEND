import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { ImageToUpload } from '@/types/blog.types'

import { memberService } from '@/services/member.service'
import { useTranslations } from 'next-intl'

export function useUploadMemberImages() {

	const t = useTranslations('Admin.ToastMessages')

	const {
		mutate: uploadImages,
		isPending: isImagesUploadPending,
		isSuccess: isUploadComplete
	} = useMutation({
		mutationKey: ['upload image'],
		mutationFn: async (uploads: ImageToUpload[]): Promise<string[]> => {
			let completedCount = 0
			const totalCount = uploads.length

			toast.loading(` ${t('uploading_slice_1')} 0 ${t('uploading_slice_2')} ${totalCount} ${t('uploading_slice_3')}...`, {
				id: 'upload-progress'
			})

			const uploadPromises = uploads.map(async ({ uploadUrl, file }) => {
				try {
					await memberService.uploadImage(uploadUrl, file)
					completedCount++

					toast.loading(` ${t('uploading_slice_1')} ${completedCount} ${t('uploading_slice_2')} ${totalCount} ${t('uploading_slice_3')}...`, {
						id: 'upload-progress'
					})

					return uploadUrl
				} catch (error) {
					throw new Error(`Failed to upload ${file.name}. ${error instanceof Error ? error.message : 'Unknown error'}`)
				}
			})

			return await Promise.all(uploadPromises)
		},
		onSuccess: () => {
			toast.success(t('uploading_success'), {
				id: 'upload-progress'
			})
		},
		onError: () => {
			toast.error(t('uploading_failed'))
		}
	})

	return { uploadImages, isImagesUploadPending, isUploadComplete }
}
