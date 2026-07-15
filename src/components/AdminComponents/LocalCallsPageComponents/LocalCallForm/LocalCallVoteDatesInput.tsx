'use client'

import { ErrorMessage } from '@hookform/error-message'
import { FormState, UseFormRegister } from 'react-hook-form'

import { ADMIN_LOCAL_CALLS_TRANSLATE } from '@/constants/admin-local-calls-translate.data'
import { TypeLocalCallFormState } from '@/types/local-call.types'

import { InputField } from '../../ui/InputField'

interface Props {
	language: 'ro' | 'ru' | 'en'
	register: UseFormRegister<TypeLocalCallFormState>
	formState: FormState<TypeLocalCallFormState>
}

export function LocalCallVoteDatesInput({ language, register, formState }: Props) {
	return (
		<div className='flex gap-[1.5rem]'>
			<div className='flex-1 flex flex-col gap-[0.5rem]'>
				<label className='font-bold text-green-700 text-[1rem] leading-[1.125rem]'>
					{ADMIN_LOCAL_CALLS_TRANSLATE.voteStartInput[language].label}
				</label>
				<InputField
					type='datetime-local'
					hasError={!!formState.errors.voteStart}
					{...register('voteStart', { required: true })}
				/>
				<ErrorMessage
					errors={formState.errors}
					name='voteStart'
					render={() => (
						<p className='text-error text-sm'>{ADMIN_LOCAL_CALLS_TRANSLATE.voteStartInput[language].error}</p>
					)}
				/>
			</div>

			<div className='flex-1 flex flex-col gap-[0.5rem]'>
				<label className='font-bold text-green-700 text-[1rem] leading-[1.125rem]'>
					{ADMIN_LOCAL_CALLS_TRANSLATE.voteEndInput[language].label}
				</label>
				<InputField
					type='datetime-local'
					hasError={!!formState.errors.voteEnd}
					{...register('voteEnd', { required: true })}
				/>
				<ErrorMessage
					errors={formState.errors}
					name='voteEnd'
					render={() => (
						<p className='text-error text-sm'>{ADMIN_LOCAL_CALLS_TRANSLATE.voteEndInput[language].error}</p>
					)}
				/>
			</div>
		</div>
	)
}
