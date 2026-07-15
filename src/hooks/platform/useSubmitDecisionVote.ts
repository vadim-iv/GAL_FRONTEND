import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useTranslations } from 'next-intl'
import { toast } from 'sonner'

import { errorCatch } from '@/api/error'
import { ISubmitDecisionVotePayload } from '@/types/voting.types'

import { platformVotingService } from '@/services/platform-voting.service'

export function useSubmitDecisionVote(decisionId: string) {
	const t = useTranslations('Platform.ToastMessages')
	const queryClient = useQueryClient()

	const { mutate: submitDecisionVote, isPending: isSubmitPending } = useMutation({
		mutationKey: ['submit decision vote'],
		mutationFn: (payload: ISubmitDecisionVotePayload) => platformVotingService.submitDecisionVote(payload),
		onSuccess: () => {
			toast.success(t('voteSubmitted'))
			queryClient.invalidateQueries({ queryKey: ['decision', decisionId] })
		},
		onError: error => {
			toast.error(errorCatch(error) || t('voteSubmitFailed'))
		}
	})

	return { submitDecisionVote, isSubmitPending }
}
