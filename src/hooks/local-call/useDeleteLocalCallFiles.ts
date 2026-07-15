import { useMutation } from '@tanstack/react-query'
import { useTranslations } from 'next-intl'
import { toast } from 'sonner'

import { localCallService } from '@/services/local-call.service'

export function useDeleteLocalCallFiles() {
	const t = useTranslations('Admin.ToastMessages')

	const { mutate: deleteFiles, isPending: isDeletePending } = useMutation({
		mutationKey: ['delete files'],
		mutationFn: (fileUrls: string[]) => localCallService.deleteFiles(fileUrls),
		onSuccess: () => {
			toast.success(t('images_deleted'))
		},
		onError: () => {
			toast.error(t('images_deletion_failed'))
		}
	})

	return { deleteFiles, isDeletePending }
}
