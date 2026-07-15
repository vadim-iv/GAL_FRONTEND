import { IMultiLangText } from './shared/text.types'

export interface IMemberAuthForm {
	email: string
	password: string
}

export interface IForgotPasswordForm {
	email: string
}

export interface IResetPasswordConfirmForm {
	token: string
}

export interface ICurrentMember {
	_id: string
	name: IMultiLangText
	email: string
}

export interface IMemberAuthResponse {
	member: ICurrentMember
	accessToken: string
}
