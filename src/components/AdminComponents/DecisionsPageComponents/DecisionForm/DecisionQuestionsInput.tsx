'use client'

import { Plus } from 'lucide-react'
import { useCallback } from 'react'
import { Control, FormState, UseFormRegister, useFieldArray } from 'react-hook-form'

import { ADMIN_DECISIONS_TRANSLATE } from '@/constants/admin-decisions-translate.data'
import { DecisionQuestionType, TypeDecisionFormState } from '@/types/decision.types'

import { DecisionQuestionRow } from './DecisionQuestionRow'

interface Props {
	language: 'ro' | 'ru' | 'en'
	register: UseFormRegister<TypeDecisionFormState>
	control: Control<TypeDecisionFormState>
	formState: FormState<TypeDecisionFormState>
}

export function DecisionQuestionsInput({ language, register, control, formState }: Props) {
	const t = ADMIN_DECISIONS_TRANSLATE.questionsInput[language]

	// rules.validate on the array itself creates a root-level error (errors.questions.root),
	// distinct from each question's own nested errors (errors.questions[i].*) — this is
	// what lets the "add question" error below fire only for a genuinely empty list,
	// instead of lighting up whenever any single question has an unrelated problem.
	const { fields, append, remove } = useFieldArray({
		control,
		name: 'questions',
		rules: {
			validate: value => (value && value.length > 0) || t.error
		}
	})

	const addQuestion = useCallback(() => {
		append(
			{ question: { ro: '', ru: '', en: '' }, type: DecisionQuestionType.TEXT, options: [] },
			{ shouldFocus: false }
		)
	}, [append])

	return (
		<div className='flex flex-col gap-[0.5rem]'>
			<label className='font-bold text-green-700 text-[1rem] leading-[1.125rem]'>{t.label}</label>

			<div className='flex flex-col gap-[1rem]'>
				{fields.map((field, index) => (
					<DecisionQuestionRow
						key={field.id}
						index={index}
						language={language}
						register={register}
						control={control}
						formState={formState}
						onRemove={() => remove(index)}
					/>
				))}
			</div>

			<button
				type='button'
				className='cursor-pointer hover:opacity-70 transition-opacity duration-300 w-full mt-[0.5rem] border border-dashed border-gray-500 bg-gray-400 rounded-[1rem] h-[6rem] flex items-center justify-center gap-[0.5rem]'
				onClick={addQuestion}
			>
				<Plus className='text-green-700 size-[1.25rem]' />
				<span className='text-[1rem] leading-[1.125rem] text-green-700 font-[400]'>{t.addButton}</span>
			</button>
			{formState.errors.questions?.root && <p className='text-error text-sm'>{t.error}</p>}
		</div>
	)
}
