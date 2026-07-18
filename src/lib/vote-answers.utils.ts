import { IProjectAnswer } from '@/types/local-call.types'
import { IDecisionAnswer } from '@/types/decision.types'

// A populated memberId resolves to null when the member who cast that vote was
// later deleted — the answer subdocument still holds the old ObjectId reference,
// but there's nothing left to populate it with. Such an answer can never belong
// to the current (still-existing) member, so it's treated as a non-match rather
// than crashing.
export function answerMemberId(
	memberId: IProjectAnswer['memberId'] | IDecisionAnswer['memberId'] | null
): string | null {
	if (!memberId) return null
	return typeof memberId === 'string' ? memberId : memberId._id
}

// A project's questions are always submitted together in one batch (see
// ProjectScoreForm), so a single answer bearing this member's id is enough to
// know every question was answered.
export function hasVotedOnProject(answers: IProjectAnswer[], memberId: string): boolean {
	return answers.some(answer => answerMemberId(answer.memberId) === memberId)
}

// Same all-or-nothing assumption as above, but a decision's answers are spread
// across each question rather than a single array.
export function hasVotedOnDecision(questions: { answers: IDecisionAnswer[] }[], memberId: string): boolean {
	return questions.some(question => question.answers.some(answer => answerMemberId(answer.memberId) === memberId))
}
