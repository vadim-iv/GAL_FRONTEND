'use client'

import { ErrorMessage } from '@hookform/error-message'
import { FormState, UseFormRegister } from 'react-hook-form'

import { ADMIN_MEMBERS_TRANSLATE } from '@/constants/admin-members-translate.data'
import { TypeMemberFormState } from '@/types/member.types'

import { InputField } from '../../ui/InputField'

interface Props {
	language: 'ro' | 'ru' | 'en'
	register: UseFormRegister<TypeMemberFormState>
	formState: FormState<TypeMemberFormState>
	disabled?: boolean
}

export function MemberEmailInput({ language, register, formState, disabled }: Props) {
	const hasError = !!formState.errors.email

	return (
		<div className='flex flex-col gap-[0.5rem]'>
			<label className='font-bold text-green-700 text-[1rem] leading-[1.125rem]'>
				{ADMIN_MEMBERS_TRANSLATE.emailInput[language].label}
			</label>
			<InputField
				type='email'
				disabled={disabled}
				hasError={hasError}
				placeholder={ADMIN_MEMBERS_TRANSLATE.emailInput[language].placeholder}
				className={disabled ? 'opacity-60 cursor-not-allowed' : ''}
				{...register('email', {
					pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
				})}
			/>
			<ErrorMessage
				errors={formState.errors}
				name='email'
				render={() => (
					<p className='text-error text-sm'>{ADMIN_MEMBERS_TRANSLATE.emailInput[language].error}</p>
				)}
			/>
		</div>
	)
}
