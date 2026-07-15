import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useTranslations } from 'next-intl'
import { toast } from 'sonner'

import { errorCatch } from '@/api/error'
import { ISubmitProjectVotePayload } from '@/types/voting.types'

import { platformVotingService } from '@/services/platform-voting.service'

export function useSubmitProjectVote(localCallId: string) {
	const t = useTranslations('Platform.ToastMessages')
	const queryClient = useQueryClient()

	const { mutate: submitProjectVote, isPending: isSubmitPending } = useMutation({
		mutationKey: ['submit project vote'],
		mutationFn: (payload: ISubmitProjectVotePayload) => platformVotingService.submitProjectVote(payload),
		onSuccess: () => {
			toast.success(t('voteSubmitted'))
			queryClient.invalidateQueries({ queryKey: ['localCall', localCallId] })
			queryClient.invalidateQueries({ queryKey: ['projects', localCallId] })
		},
		onError: error => {
			toast.error(errorCatch(error) || t('voteSubmitFailed'))
		}
	})

	return { submitProjectVote, isSubmitPending }
}
