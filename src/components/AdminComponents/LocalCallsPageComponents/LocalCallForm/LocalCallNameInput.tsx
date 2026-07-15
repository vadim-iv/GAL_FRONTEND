'use client'

import { ErrorMessage } from '@hookform/error-message'
import { useEffect } from 'react'
import { FormState, UseFormRegister } from 'react-hook-form'

import { ADMIN_LOCAL_CALLS_TRANSLATE } from '@/constants/admin-local-calls-translate.data'
import { TypeLocalCallFormState } from '@/types/local-call.types'

import { InputField } from '../../ui/InputField'

interface Props {
	language: 'ro' | 'ru' | 'en'
	register: UseFormRegister<TypeLocalCallFormState>
	formState: FormState<TypeLocalCallFormState>
}

export function LocalCallNameInput({ language, register, formState }: Props) {
	const hasError = formState.errors.name

	useEffect(() => {
		register('name.ro', { required: true })
		register('name.ru', { required: true })
		register('name.en', { required: true })
	}, [register])

	return (
		<div className='flex flex-col gap-[0.5rem]'>
			<label className='font-bold text-green-700 text-[1rem] leading-[1.125rem]'>
				{ADMIN_LOCAL_CALLS_TRANSLATE.nameInput[language].label}
			</label>
			<InputField
				key={`name-${language}`}
				hasError={!!hasError}
				placeholder={ADMIN_LOCAL_CALLS_TRANSLATE.nameInput[language].placeholder}
				{...register(`name.${language}`, { required: true })}
			/>
			<ErrorMessage
				errors={formState.errors}
				name='name'
				render={() => (
					<p className='text-error text-sm'>{ADMIN_LOCAL_CALLS_TRANSLATE.nameInput[language].error}</p>
				)}
			/>
		</div>
	)
}
