import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useTranslations } from 'next-intl'
import { toast } from 'sonner'

import { errorCatch } from '@/api/error'

import { decisionService } from '@/services/decision.service'

export function useDeleteDecision() {
	const t = useTranslations('Admin.ToastMessages')
	const queryClient = useQueryClient()

	const { mutate: deleteDecision, isPending: isDeletePending } = useMutation({
		mutationKey: ['delete decision'],
		mutationFn: (id: string) => decisionService.deleteDecision(id),
		onSuccess: () => {
			toast.success(t('decision_deleted'))
			queryClient.invalidateQueries({ queryKey: ['decisions'] })
		},
		onError: error => {
			toast.error(errorCatch(error) || t('decision_deletion_failed'))
		}
	})

	return { deleteDecision, isDeletePending }
}
