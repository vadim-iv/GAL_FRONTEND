import { useMutation } from '@tanstack/react-query'
import { useTranslations } from 'next-intl'
import { toast } from 'sonner'

import { decisionService } from '@/services/decision.service'

export function useDeleteDecisionFiles() {
	const t = useTranslations('Admin.ToastMessages')

	const { mutate: deleteFiles, isPending: isDeletePending } = useMutation({
		mutationKey: ['delete files'],
		mutationFn: (fileUrls: string[]) => decisionService.deleteFiles(fileUrls),
		onSuccess: () => {
			toast.success(t('images_deleted'))
		},
		onError: () => {
			toast.error(t('images_deletion_failed'))
		}
	})

	return { deleteFiles, isDeletePending }
}
