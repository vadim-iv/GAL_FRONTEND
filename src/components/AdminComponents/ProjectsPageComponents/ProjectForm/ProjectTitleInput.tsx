'use client'

import { ErrorMessage } from '@hookform/error-message'
import { useEffect } from 'react'
import { FormState, UseFormRegister } from 'react-hook-form'

import { ADMIN_PROJECTS_TRANSLATE } from '@/constants/admin-projects-translate.data'
import { TypeProjectFormState } from '@/types/local-call.types'

import { InputField } from '../../ui/InputField'

interface Props {
	language: 'ro' | 'ru' | 'en'
	register: UseFormRegister<TypeProjectFormState>
	formState: FormState<TypeProjectFormState>
}

export function ProjectTitleInput({ language, register, formState }: Props) {
	const hasError = formState.errors.title

	useEffect(() => {
		register('title.ro', { required: true })
		register('title.ru', { required: true })
		register('title.en', { required: true })
	}, [register])

	return (
		<div className='flex flex-col gap-[0.5rem]'>
			<label className='font-bold text-green-700 text-[1rem] leading-[1.125rem]'>
				{ADMIN_PROJECTS_TRANSLATE.titleInput[language].label}
			</label>
			<InputField
				key={`title-${language}`}
				hasError={!!hasError}
				placeholder={ADMIN_PROJECTS_TRANSLATE.titleInput[language].placeholder}
				{...register(`title.${language}`, { required: true })}
			/>
			<ErrorMessage
				errors={formState.errors}
				name='title'
				render={() => (
					<p className='text-error text-sm'>{ADMIN_PROJECTS_TRANSLATE.titleInput[language].error}</p>
				)}
			/>
		</div>
	)
}
