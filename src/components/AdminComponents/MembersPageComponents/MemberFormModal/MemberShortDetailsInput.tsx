'use client'

import { ErrorMessage } from '@hookform/error-message'
import { Control, FormState } from 'react-hook-form'

import { ADMIN_MEMBERS_TRANSLATE } from '@/constants/admin-members-translate.data'
import { TypeMemberFormState } from '@/types/member.types'

import { isMultiLangComplete } from '@/lib/multi-lang.utils'

import { RichTextEditor } from '../../ui/RichTextEditor/RichTextEditor'

interface Props {
	language: 'ro' | 'ru' | 'en'
	control: Control<TypeMemberFormState>
	formState: FormState<TypeMemberFormState>
}

// Always rendered/required — this is the <li> entry used everywhere the member
// appears except their own President paragraph (which uses `details` instead).
// The rule is attached via RichTextEditor's own `rules` prop (forwarded to
// useController) — do NOT also register() this field path manually. Mixing
// register() and useController on the same name is a real RHF conflict: the
// manual registration can clobber the controller-tracked value, so the field
// can look filled in the UI yet still fail validation on submit.
//
// The rule validates ALL THREE languages together (not just this one) so that
// e.g. a completed Romanian tab still shows red while Russian/English are
// empty — the field is only truly complete once every language has content,
// so every language's editor should reflect that shared state, not just its
// own.
export function MemberShortDetailsInput({ language, control, formState }: Props) {
	const hasError = formState.errors.shortDetails

	return (
		<div className='flex flex-col gap-[0.5rem]'>
			<label className='font-bold text-green-700 text-[1rem] leading-[1.125rem]'>
				{ADMIN_MEMBERS_TRANSLATE.shortDetailsInput[language].label}
			</label>
			<RichTextEditor
				key={`member-short-details-${language}`}
				control={control}
				name={`shortDetails.${language}`}
				placeholder={ADMIN_MEMBERS_TRANSLATE.shortDetailsInput[language].placeholder}
				rules={{
					validate: (_value: string, formValues: TypeMemberFormState) =>
						isMultiLangComplete(formValues.shortDetails)
				}}
				className={`h-[11rem] ${hasError ? 'border-error text-error placeholder:text-error animate-shake' : ''}`}
			/>
			<ErrorMessage
				errors={formState.errors}
				name='shortDetails'
				render={() => (
					<p className='text-error text-sm'>{ADMIN_MEMBERS_TRANSLATE.shortDetailsInput[language].error}</p>
				)}
			/>
		</div>
	)
}
