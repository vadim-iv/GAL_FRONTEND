import { useMutation } from '@tanstack/react-query'
import { useTranslations } from 'next-intl'
import { toast } from 'sonner'

import { localCallService } from '@/services/local-call.service'

// For the project's linked PDF document (distinct from the image-upload link).
export function useGenerateLocalCallUploadLink() {
	const t = useTranslations('Admin.ToastMessages')

	const {
		data: fileData,
		mutate: generateLink,
		isPending: isFileLinkPending,
		isSuccess: isFileLinkGenerated
	} = useMutation({
		mutationKey: ['generate pdf upload link'],
		mutationFn: () => localCallService.generateUploadLink(),
		onSuccess: () => {
			toast.success(t('image_prepared'))
		},
		onError: () => {
			toast.error(t('image_preparation_failed'))
		}
	})

	return { fileData, isFileLinkPending, generateLink, isFileLinkGenerated }
}
