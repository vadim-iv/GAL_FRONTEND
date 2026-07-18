import { IMultiLangText } from './shared/text.types'
import { DecisionStatusEnum } from './shared/decision-status.types'

export enum DecisionQuestionType {
	RADIO = 'radio',
	CHECKBOX = 'checkbox',
	TEXT = 'text'
}

export interface IDecisionOption {
	value: string
	label: IMultiLangText
}

export interface IDecisionAnswer {
	// null when the member who cast this vote was later deleted — the populated
	// reference has nothing left to resolve to.
	memberId: string | { _id: string; name: IMultiLangText; email: string } | null
	// Single selected value — used by RADIO/TEXT answers.
	value?: string
	// Selected option values — used by CHECKBOX (multi-select) answers instead of `value`.
	values?: string[]
}

export interface IDecisionQuestion {
	_id: string
	question: IMultiLangText
	type: DecisionQuestionType
	options?: IDecisionOption[]
	answers: IDecisionAnswer[]
}

export interface IDecisionResponse {
	_id: string
	title: IMultiLangText
	description: IMultiLangText
	imageUrl?: string
	status: DecisionStatusEnum
	questions: IDecisionQuestion[]
	voteStart: string
	voteEnd: string
	createdAt: string
	updatedAt: string
}

export interface IPaginationInfo {
	page: number
	limit: number
	total: number
	totalPages: number
	hasNextPage: boolean
	hasPrevPage: boolean
}

export interface IDecisionsResponse {
	decisions: IDecisionResponse[]
	pagination: IPaginationInfo
}

export interface IGetDecisionsParams {
	page?: number
	limit?: number
}

// New options (added via the form's "add option" tile) don't have a stable identity
// beyond their position — the backend schema has no _id for DecisionOption either.
export type TypeDecisionOptionFormState = IDecisionOption

// New questions (added via the form's "add question" tile) don't have an _id yet —
// the server assigns one on save.
export type TypeDecisionQuestionFormState = Omit<IDecisionQuestion, '_id' | 'answers'> & { _id?: string }

// voteStart/voteEnd stay as the raw "yyyy-MM-dd'T'HH:mm" string a datetime-local
// input produces — converting them to Date breaks reset() populating the native
// input on edit (assigning a Date to input.value coerces via Date#toString(),
// which datetime-local can't parse, so the field silently renders empty).
export type TypeDecisionFormState = Partial<
	Omit<IDecisionResponse, '_id' | 'createdAt' | 'updatedAt' | 'questions'>
> & {
	questions?: TypeDecisionQuestionFormState[]
}
