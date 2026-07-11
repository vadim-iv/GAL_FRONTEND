import { IMultiLangText } from './shared/text.types'

export enum MemberRolesEnum {
	PRESIDENT = 'PRESIDENT',
	EXECUTIVE_BODY = 'EXECUTIVE_BODY',
	ADMINISTRATION = 'ADMINISTRATION',
	SELECTION_COMMITTEE = 'SELECTION_COMMITTEE',
	CENSORSHIP_COMMITTEE = 'CENSORSHIP_COMMITTEE'
}

export interface IMemberResponse {
	_id: string
	email: string
	name: IMultiLangText
	// Long bio — only meaningful for the President's own dedicated public paragraph.
	details?: IMultiLangText
	// Short blurb — used as the <li> entry everywhere else this member appears.
	shortDetails: IMultiLangText
	imageUrl?: string
	roles: MemberRolesEnum[]
}

export type TypeMemberFormState = Partial<Omit<IMemberResponse, '_id'>>
