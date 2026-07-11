'use client'

import { ErrorMessage } from '@hookform/error-message'
import { useEffect } from 'react'
import { Control, FormState, UseFormRegister } from 'react-hook-form'

import { ADMIN_MEMBERS_TRANSLATE } from '@/constants/admin-members-translate.data'
import { TypeMemberFormState } from '@/types/member.types'

import { RichTextEditor } from '../../ui/RichTextEditor/RichTextEditor'

interface Props {
	language: 'ro' | 'ru' | 'en'
	register: UseFormRegister<TypeMemberFormState>
	control: Control<TypeMemberFormState>
	formState: FormState<TypeMemberFormState>
}

// Only rendered when the PRESIDENT role is checked — this is their own dedicated
// public bio paragraph, distinct from `shortDetails` (used everywhere else).
export function MemberPresidentBioInput({ language, register, control, formState }: Props) {
	const hasError = formState.errors.details

	useEffect(() => {
		register('details.ro', { required: true })
		register('details.ru', { required: true })
		register('details.en', { required: true })
	}, [register])

	return (
		<div className='flex flex-col gap-[0.5rem]'>
			<label className='font-bold text-green-700 text-[1rem] leading-[1.125rem]'>
				{ADMIN_MEMBERS_TRANSLATE.presidentBioInput[language].label}
			</label>
			<RichTextEditor
				key={`member-president-bio-${language}`}
				control={control}
				name={`details.${language}`}
				placeholder={ADMIN_MEMBERS_TRANSLATE.presidentBioInput[language].placeholder}
				rules={{ required: true }}
				className={hasError ? 'border-error text-error placeholder:text-error animate-shake' : ''}
			/>
			<ErrorMessage
				errors={formState.errors}
				name='details'
				render={() => (
					<p className='text-error text-sm'>{ADMIN_MEMBERS_TRANSLATE.presidentBioInput[language].error}</p>
				)}
			/>
		</div>
	)
}
