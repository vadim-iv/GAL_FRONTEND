'use client'

import { Control, FormState, useController } from 'react-hook-form'

import { ADMIN_MEMBERS_TRANSLATE } from '@/constants/admin-members-translate.data'
import { MemberRolesEnum, TypeMemberFormState } from '@/types/member.types'

interface Props {
	language: 'ro' | 'ru' | 'en'
	control: Control<TypeMemberFormState>
	formState: FormState<TypeMemberFormState>
}

export const ROLE_TITLE_KEY: Record<MemberRolesEnum, keyof typeof ADMIN_MEMBERS_TRANSLATE.roleTagLabel> = {
	[MemberRolesEnum.PRESIDENT]: 'president',
	[MemberRolesEnum.EXECUTIVE_BODY]: 'executive',
	[MemberRolesEnum.ADMINISTRATION]: 'administration',
	[MemberRolesEnum.SELECTION_COMMITTEE]: 'committee',
	[MemberRolesEnum.CENSORSHIP_COMMITTEE]: 'censorship'
}

// Same forest-green palette already used for the category tags on the public
// /administration page (src/components/CommonComponents/InfoSection.tsx) — one
// distinct shade per role instead of a single flat color.
export const ROLE_COLOR: Record<MemberRolesEnum, string> = {
	[MemberRolesEnum.PRESIDENT]: 'bg-forest-900',
	[MemberRolesEnum.EXECUTIVE_BODY]: 'bg-forest-800',
	[MemberRolesEnum.ADMINISTRATION]: 'bg-forest-700',
	[MemberRolesEnum.SELECTION_COMMITTEE]: 'bg-forest-600',
	[MemberRolesEnum.CENSORSHIP_COMMITTEE]: 'bg-forest-500'
}

const ALL_ROLES = Object.values(MemberRolesEnum)

export function MemberRolesInput({ language, control, formState }: Props) {
	const {
		field: { value, onChange }
	} = useController({
		name: 'roles',
		control,
		defaultValue: []
	})

	const roles = value ?? []
	const hasError = !!formState.errors.roles

	const toggleRole = (role: MemberRolesEnum) => {
		if (roles.includes(role)) {
			onChange(roles.filter((r: MemberRolesEnum) => r !== role))
		} else {
			onChange([...roles, role])
		}
	}

	return (
		<div className='flex flex-col gap-[0.5rem]'>
			<label className='font-bold text-green-700 text-[1rem] leading-[1.125rem]'>
				{ADMIN_MEMBERS_TRANSLATE.rolesInput[language].label}
			</label>
			<div className='flex flex-wrap gap-[1rem]'>
				{ALL_ROLES.map(role => (
					<label key={role} className='flex items-center gap-[0.5rem] cursor-pointer'>
						<input
							type='checkbox'
							checked={roles.includes(role)}
							onChange={() => toggleRole(role)}
							className='size-[1rem] cursor-pointer accent-green-600'
						/>
						<span className='text-[0.875rem] text-green-700'>
							{ADMIN_MEMBERS_TRANSLATE.sectionTitles[ROLE_TITLE_KEY[role]][language]}
						</span>
					</label>
				))}
			</div>
			{hasError && <p className='text-error text-sm'>{ADMIN_MEMBERS_TRANSLATE.rolesInput[language].error}</p>}
		</div>
	)
}
