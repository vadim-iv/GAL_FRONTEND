import { axiosWithMemberAuth } from '@/api/member-interceptors'
import { ISubmitDecisionVotePayload, ISubmitProjectVotePayload } from '@/types/voting.types'

class PlatformVotingService {
	async submitProjectVote(payload: ISubmitProjectVotePayload) {
		return axiosWithMemberAuth.post('/local-call/add-answers', payload)
	}

	async submitDecisionVote(payload: ISubmitDecisionVotePayload) {
		return axiosWithMemberAuth.post('/decision/add-answers', payload)
	}
}

export const platformVotingService = new PlatformVotingService()
