'use client'

import { ErrorMessage } from '@hookform/error-message'
import { useEffect } from 'react'
import { FormState, UseFormRegister } from 'react-hook-form'

import { ADMIN_MEMBERS_TRANSLATE } from '@/constants/admin-members-translate.data'
import { TypeMemberFormState } from '@/types/member.types'

import { isMultiLangComplete } from '@/lib/multi-lang.utils'

import { InputField } from '../../ui/InputField'

interface Props {
	language: 'ro' | 'ru' | 'en'
	register: UseFormRegister<TypeMemberFormState>
	formState: FormState<TypeMemberFormState>
}

// Unlike shortDetails/details, all 3 languages here are always registered
// (not conditionally mounted per tab) — but the rule still validates ALL
// THREE together, not just the field's own value, so e.g. a completed
// Romanian tab still shows red while Russian/English are empty. This must
// stay a `validate` rule (not `required`), and this component must remain
// the only place these fields are registered — a duplicate manual
// setError('name', ...) elsewhere would overwrite this nested per-language
// error state with a flat one that revalidation can never clear again.
const nameValidate = (_value: string, formValues: TypeMemberFormState) => isMultiLangComplete(formValues.name)

export function MemberNameInput({ language, register, formState }: Props) {
	const hasError = formState.errors.name

	useEffect(() => {
		register('name.ro', { validate: nameValidate })
		register('name.ru', { validate: nameValidate })
		register('name.en', { validate: nameValidate })
	}, [register])

	return (
		<div className='flex flex-col gap-[0.5rem]'>
			<label className='font-bold text-green-700 text-[1rem] leading-[1.125rem]'>
				{ADMIN_MEMBERS_TRANSLATE.nameInput[language].label}
			</label>
			<InputField
				hasError={!!hasError}
				placeholder={ADMIN_MEMBERS_TRANSLATE.nameInput[language].placeholder}
				{...register(`name.${language}`, { validate: nameValidate })}
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
