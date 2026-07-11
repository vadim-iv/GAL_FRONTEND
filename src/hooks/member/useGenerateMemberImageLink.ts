import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { memberService } from '@/services/member.service'
import { useTranslations } from 'next-intl'

export function useGenerateMemberImageLink() {

	const t = useTranslations('Admin.ToastMessages')

	const {
		data: imageData,
		mutate: generateLink,
		isPending: isImageLinkPending,
		isSuccess: isImageLinkGenerated
	} = useMutation({
		mutationKey: ['generate upload link'],
		mutationFn: () => memberService.generateUploadLink(),
		onSuccess: () => {
			toast.success(t('image_prepared'))
		},
		onError: () => {
			toast.error(t('image_preparation_failed'))
		}
	})

	return { imageData, isImageLinkPending, generateLink, isImageLinkGenerated }
}
