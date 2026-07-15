'use client'

import { ErrorMessage } from '@hookform/error-message'
import { useEffect } from 'react'
import { Control, FormState, UseFormRegister } from 'react-hook-form'

import { ADMIN_LOCAL_CALLS_TRANSLATE } from '@/constants/admin-local-calls-translate.data'
import { TypeLocalCallFormState } from '@/types/local-call.types'

import { RichTextEditor } from '../../ui/RichTextEditor/RichTextEditor'

interface Props {
	language: 'ro' | 'ru' | 'en'
	register: UseFormRegister<TypeLocalCallFormState>
	control: Control<TypeLocalCallFormState>
	formState: FormState<TypeLocalCallFormState>
}

export function LocalCallDescriptionInput({ language, register, control, formState }: Props) {
	const hasError = formState.errors.description

	useEffect(() => {
		register('description.ro', { required: true })
		register('description.ru', { required: true })
		register('description.en', { required: true })
	}, [register])

	return (
		<div className='flex flex-col gap-[0.5rem]'>
			<label className='font-bold text-green-700 text-[1rem] leading-[1.125rem]'>
				{ADMIN_LOCAL_CALLS_TRANSLATE.descriptionInput[language].label}
			</label>
			<RichTextEditor
				key={`local-call-description-${language}`}
				control={control}
				name={`description.${language}`}
				placeholder={ADMIN_LOCAL_CALLS_TRANSLATE.descriptionInput[language].placeholder}
				rules={{ required: true }}
				className={hasError ? 'border-error text-error placeholder:text-error animate-shake' : ''}
			/>
			<ErrorMessage
				errors={formState.errors}
				name='description'
				render={() => (
					<p className='text-error text-sm'>{ADMIN_LOCAL_CALLS_TRANSLATE.descriptionInput[language].error}</p>
				)}
			/>
		</div>
	)
}
