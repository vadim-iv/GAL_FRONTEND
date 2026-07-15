import { useMutation } from '@tanstack/react-query'
import { useTranslations } from 'next-intl'
import { toast } from 'sonner'

import { localCallService } from '@/services/local-call.service'

export function useGenerateLocalCallImageLink() {
	const t = useTranslations('Admin.ToastMessages')

	const {
		data: imageData,
		mutate: generateLink,
		isPending: isImageLinkPending,
		isSuccess: isImageLinkGenerated
	} = useMutation({
		mutationKey: ['generate upload link'],
		mutationFn: () => localCallService.generateImageUploadLink(),
		onSuccess: () => {
			toast.success(t('image_prepared'))
		},
		onError: () => {
			toast.error(t('image_preparation_failed'))
		}
	})

	return { imageData, isImageLinkPending, generateLink, isImageLinkGenerated }
}
