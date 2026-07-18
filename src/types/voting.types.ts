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
	// Single selected value — used by RADIO/TEXT questions.
	value?: string
	// Selected option values — used by CHECKBOX (multi-select) questions instead of `value`.
	values?: string[]
	memberId: string
}

export interface ISubmitDecisionVotePayload {
	decisionId: string
	answers: IDecisionVoteAnswer[]
}
