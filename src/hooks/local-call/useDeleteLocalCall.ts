import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useTranslations } from 'next-intl'
import { toast } from 'sonner'

import { errorCatch } from '@/api/error'

import { localCallService } from '@/services/local-call.service'

export function useDeleteLocalCall() {
	const t = useTranslations('Admin.ToastMessages')
	const queryClient = useQueryClient()

	const { mutate: deleteLocalCall, isPending: isDeletePending } = useMutation({
		mutationKey: ['delete local call'],
		mutationFn: (id: string) => localCallService.deleteLocalCall(id),
		onSuccess: () => {
			toast.success(t('local_call_deleted'))
			queryClient.invalidateQueries({ queryKey: ['localCalls'] })
		},
		onError: error => {
			toast.error(errorCatch(error) || t('local_call_deletion_failed'))
		}
	})

	return { deleteLocalCall, isDeletePending }
}
