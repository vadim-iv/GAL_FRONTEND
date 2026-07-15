import { useMutation } from '@tanstack/react-query'
import { useTranslations } from 'next-intl'
import { toast } from 'sonner'

import { decisionService } from '@/services/decision.service'

export function useGenerateDecisionImageLink() {
	const t = useTranslations('Admin.ToastMessages')

	const {
		data: imageData,
		mutate: generateLink,
		isPending: isImageLinkPending,
		isSuccess: isImageLinkGenerated
	} = useMutation({
		mutationKey: ['generate upload link'],
		mutationFn: () => decisionService.generateImageUploadLink(),
		onSuccess: () => {
			toast.success(t('image_prepared'))
		},
		onError: () => {
			toast.error(t('image_preparation_failed'))
		}
	})

	return { imageData, isImageLinkPending, generateLink, isImageLinkGenerated }
}
