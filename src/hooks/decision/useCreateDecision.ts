import { useMutation } from '@tanstack/react-query'
import { useTranslations } from 'next-intl'
import { toast } from 'sonner'

import { errorCatch } from '@/api/error'
import { TypeDecisionFormState } from '@/types/decision.types'

import { decisionService } from '@/services/decision.service'

export function useCreateDecision() {
	const t = useTranslations('Admin.ToastMessages')

	const { mutate: createDecision, isPending: isCreatePending } = useMutation({
		mutationKey: ['create decision'],
		mutationFn: (data: TypeDecisionFormState) => decisionService.createDecision(data),
		onSuccess: () => {
			toast.success(t('decision_created'))
		},
		onError: error => {
			toast.error(errorCatch(error) || t('decision_creation_failed'))
		}
	})

	return { createDecision, isCreatePending }
}
