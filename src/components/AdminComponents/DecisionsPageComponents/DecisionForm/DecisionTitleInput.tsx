'use client'

import { ErrorMessage } from '@hookform/error-message'
import { useEffect } from 'react'
import { FormState, UseFormRegister } from 'react-hook-form'

import { ADMIN_DECISIONS_TRANSLATE } from '@/constants/admin-decisions-translate.data'
import { TypeDecisionFormState } from '@/types/decision.types'

import { isMultiLangComplete } from '@/lib/multi-lang.utils'

import { InputField } from '../../ui/InputField'

interface Props {
	language: 'ro' | 'ru' | 'en'
	register: UseFormRegister<TypeDecisionFormState>
	formState: FormState<TypeDecisionFormState>
}

// All 3 languages are always registered (not conditionally mounted per tab) —
// the rule still validates ALL THREE together, not just the field's own
// value, so e.g. a completed Romanian tab still shows red while
// Russian/English are empty.
const titleValidate = (_value: string, formValues: TypeDecisionFormState) => isMultiLangComplete(formValues.title)

export function DecisionTitleInput({ language, register, formState }: Props) {
	const hasError = formState.errors.title

	useEffect(() => {
		register('title.ro', { validate: titleValidate })
		register('title.ru', { validate: titleValidate })
		register('title.en', { validate: titleValidate })
	}, [register])

	return (
		<div className='flex flex-col gap-[0.5rem]'>
			<label className='font-bold text-green-700 text-[1rem] leading-[1.125rem]'>
				{ADMIN_DECISIONS_TRANSLATE.titleInput[language].label}
			</label>
			<InputField
				key={`title-${language}`}
				hasError={!!hasError}
				placeholder={ADMIN_DECISIONS_TRANSLATE.titleInput[language].placeholder}
				{...register(`title.${language}`, { validate: titleValidate })}
			/>
			<ErrorMessage
				errors={formState.errors}
				name='title'
				render={() => (
					<p className='text-error text-sm'>{ADMIN_DECISIONS_TRANSLATE.titleInput[language].error}</p>
				)}
			/>
		</div>
	)
}
