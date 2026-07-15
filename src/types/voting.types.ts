export interface ILocalCallVoteAnswer {
	questionId: string
	answer: number
	memberId: string
}

export interface ISubmitProjectVotePayload {
	localCallId: string
	projectId: string
	answers: ILocalCallVoteAnswer[]
}

export interface IDecisionVoteAnswer {
	questionId: string
	value: string
	memberId: string
}

export interface ISubmitDecisionVotePayload {
	decisionId: string
	answers: IDecisionVoteAnswer[]
}
