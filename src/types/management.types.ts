import { IMultiLangText } from './shared/text.types'

export interface IPresident {
	text: IMultiLangText
	image: string
}

export interface IExecutive {
	column1: IMultiLangText
	column2?: IMultiLangText
}

export interface IGeneralAssembly {
	column1: IMultiLangText
	column2?: IMultiLangText
}

export interface IAdministration {
	column1: IMultiLangText
	column2?: IMultiLangText
}

export interface ICommittee {
	column1: IMultiLangText
	column2?: IMultiLangText
}

export interface ICensorship {
	column1: IMultiLangText
	column2?: IMultiLangText
}

export interface IManagementResponse {
	_id: string
	main_image: string
	president: IPresident
	executive: IExecutive
	general_assembly: IGeneralAssembly
	administration: IAdministration
	committee: ICommittee
	censorship: ICensorship
	createdAt: string
	updatedAt: string
}

export type TypeMainImageFormState = {
	main_image?: string
}
