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

// Always rendered/required — this is the <li> entry used everywhere the member
// appears except their own President paragraph (which uses `details` instead).
export function MemberShortDetailsInput({ language, register, control, formState }: Props) {
	const hasError = formState.errors.shortDetails

	useEffect(() => {
		register('shortDetails.ro', { required: true })
		register('shortDetails.ru', { required: true })
		register('shortDetails.en', { required: true })
	}, [register])

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
				rules={{ required: true }}
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
