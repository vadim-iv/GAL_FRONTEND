'use client'

import { ErrorMessage } from '@hookform/error-message'
import { Control, FormState } from 'react-hook-form'

import { ADMIN_DECISIONS_TRANSLATE } from '@/constants/admin-decisions-translate.data'
import { TypeDecisionFormState } from '@/types/decision.types'

import { isMultiLangComplete } from '@/lib/multi-lang.utils'

import { RichTextEditor } from '../../ui/RichTextEditor/RichTextEditor'

interface Props {
	language: 'ro' | 'ru' | 'en'
	control: Control<TypeDecisionFormState>
	formState: FormState<TypeDecisionFormState>
}

// The rule is attached via RichTextEditor's own `rules` prop (forwarded to
// useController) — do NOT also register() this field path manually. Mixing
// register() and useController on the same name is a real RHF conflict: the
// manual registration can clobber the controller-tracked value, so the field
// can look filled in the UI yet still fail validation on submit.
//
// The rule validates ALL THREE languages together (not just this one) so that
// e.g. a completed Romanian tab still shows red while Russian/English are
// empty.
export function DecisionDescriptionInput({ language, control, formState }: Props) {
	const hasError = formState.errors.description

	return (
		<div className='flex flex-col gap-[0.5rem]'>
			<label className='font-bold text-green-700 text-[1rem] leading-[1.125rem]'>
				{ADMIN_DECISIONS_TRANSLATE.descriptionInput[language].label}
			</label>
			<RichTextEditor
				key={`decision-description-${language}`}
				control={control}
				name={`description.${language}`}
				placeholder={ADMIN_DECISIONS_TRANSLATE.descriptionInput[language].placeholder}
				rules={{
					validate: (_value: string, formValues: TypeDecisionFormState) =>
						isMultiLangComplete(formValues.description)
				}}
				className={hasError ? 'border-error text-error placeholder:text-error animate-shake' : ''}
			/>
			<ErrorMessage
				errors={formState.errors}
				name='description'
				render={() => (
					<p className='text-error text-sm'>{ADMIN_DECISIONS_TRANSLATE.descriptionInput[language].error}</p>
				)}
			/>
		</div>
	)
}
