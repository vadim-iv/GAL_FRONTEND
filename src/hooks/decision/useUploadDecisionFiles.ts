import { useMutation } from '@tanstack/react-query'
import { useTranslations } from 'next-intl'
import { toast } from 'sonner'

import { ImageToUpload } from '@/types/blog.types'

import { decisionService } from '@/services/decision.service'

export function useUploadDecisionFiles() {
	const t = useTranslations('Admin.ToastMessages')

	const {
		mutate: uploadFiles,
		isPending: isFilesUploadPending,
		isSuccess: isUploadComplete
	} = useMutation({
		mutationKey: ['upload file'],
		mutationFn: async (uploads: ImageToUpload[]): Promise<string[]> => {
			const uploadPromises = uploads.map(async ({ uploadUrl, file }) => {
				await decisionService.uploadFile(uploadUrl, file)
				return uploadUrl
			})
			return await Promise.all(uploadPromises)
		},
		onSuccess: () => {
			toast.success(t('uploading_success'))
		},
		onError: () => {
			toast.error(t('uploading_failed'))
		}
	})

	return { uploadFiles, isFilesUploadPending, isUploadComplete }
}
