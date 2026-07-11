'use client'

import { ErrorMessage } from '@hookform/error-message'
import { useEffect } from 'react'
import { FormState, UseFormRegister } from 'react-hook-form'

import { ADMIN_MEMBERS_TRANSLATE } from '@/constants/admin-members-translate.data'
import { TypeMemberFormState } from '@/types/member.types'

import { InputField } from '../../ui/InputField'

interface Props {
	language: 'ro' | 'ru' | 'en'
	register: UseFormRegister<TypeMemberFormState>
	formState: FormState<TypeMemberFormState>
}

export function MemberNameInput({ language, register, formState }: Props) {
	const hasError = formState.errors.name

	useEffect(() => {
		register('name.ro', { required: true })
		register('name.ru', { required: true })
		register('name.en', { required: true })
	}, [register])

	return (
		<div className='flex flex-col gap-[0.5rem]'>
			<label className='font-bold text-green-700 text-[1rem] leading-[1.125rem]'>
				{ADMIN_MEMBERS_TRANSLATE.nameInput[language].label}
			</label>
			<InputField
				hasError={!!hasError}
				placeholder={ADMIN_MEMBERS_TRANSLATE.nameInput[language].placeholder}
				{...register(`name.${language}`, { required: true })}
			/>
			<ErrorMessage
				errors={formState.errors}
				name='name'
				render={() => (
					<p className='text-error text-sm'>{ADMIN_MEMBERS_TRANSLATE.nameInput[language].error}</p>
				)}
			/>
		</div>
	)
}
