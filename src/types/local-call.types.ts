import { IMultiLangText } from './shared/text.types'

export { ApprovalStatusEnum } from './shared/status.types'
import { ApprovalStatusEnum } from './shared/status.types'

export interface ILocalCallQuestion {
	_id: string
	question: IMultiLangText
	maxScore: number
}

export interface IProjectAnswer {
	questionId: string
	memberId: string | { _id: string; name: IMultiLangText; email: string }
	answer: number
}

export interface IProjectResponse {
	_id: string
	title: IMultiLangText
	description: IMultiLangText
	pdfUrl: string
	imageUrl?: string
	status: ApprovalStatusEnum
	answers: IProjectAnswer[]
	averageMark: number
}

export interface ILocalCallResponse {
	_id: string
	name: IMultiLangText
	description: IMultiLangText
	imageUrl?: string
	questions: ILocalCallQuestion[]
	projects: IProjectResponse[]
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

export interface ILocalCallsResponse {
	localCalls: ILocalCallResponse[]
	pagination: IPaginationInfo
}

export interface IProjectsResponse {
	projects: IProjectResponse[]
	pagination: IPaginationInfo
}

export interface IGetLocalCallsParams {
	page?: number
	limit?: number
}

export interface IGetProjectsParams {
	page?: number
	limit?: number
}

// New questions (added via the form's "add question" tile) don't have an _id yet —
// the server assigns one on save.
export type TypeLocalCallQuestionFormState = Omit<ILocalCallQuestion, '_id'> & { _id?: string }

// voteStart/voteEnd stay as the raw "yyyy-MM-dd'T'HH:mm" string a datetime-local
// input produces — converting them to Date breaks reset() populating the native
// input on edit (assigning a Date to input.value coerces via Date#toString(),
// which datetime-local can't parse, so the field silently renders empty).
export type TypeLocalCallFormState = Partial<
	Omit<ILocalCallResponse, '_id' | 'createdAt' | 'updatedAt' | 'projects' | 'questions'>
> & {
	questions?: TypeLocalCallQuestionFormState[]
}

export type TypeProjectFormState = Partial<Omit<IProjectResponse, '_id' | 'answers' | 'averageMark'>>
