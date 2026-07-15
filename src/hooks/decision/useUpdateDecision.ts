import { useMutation } from '@tanstack/react-query'
import { useTranslations } from 'next-intl'
import { toast } from 'sonner'

import { errorCatch } from '@/api/error'
import { TypeDecisionFormState } from '@/types/decision.types'

import { decisionService } from '@/services/decision.service'

// Query invalidation is deliberately NOT done here — the caller may still have a
// pending image upload to run after this resolves, and invalidating early would
// refetch the list while imageUrl still points at a not-yet-uploaded S3 object.
export function useUpdateDecision(id: string) {
	const t = useTranslations('Admin.ToastMessages')

	const { mutate: updateDecision, isPending: isUpdatePending } = useMutation({
		mutationKey: ['update decision'],
		mutationFn: (data: TypeDecisionFormState) => decisionService.updateDecision(id, data),
		onSuccess: () => {
			toast.success(t('decision_updated'))
		},
		onError: error => {
			toast.error(errorCatch(error) || t('decision_update_failed'))
		}
	})

	return { updateDecision, isUpdatePending }
}
