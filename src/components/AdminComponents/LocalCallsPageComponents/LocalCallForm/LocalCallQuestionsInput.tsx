'use client'

import { Plus } from 'lucide-react'
import { useCallback, useEffect } from 'react'
import { Control, FormState, UseFormRegister, useFieldArray } from 'react-hook-form'

import { ADMIN_LOCAL_CALLS_TRANSLATE } from '@/constants/admin-local-calls-translate.data'
import { TypeLocalCallFormState } from '@/types/local-call.types'

import { InputField } from '../../ui/InputField'

interface Props {
	language: 'ro' | 'ru' | 'en'
	register: UseFormRegister<TypeLocalCallFormState>
	control: Control<TypeLocalCallFormState>
	formState: FormState<TypeLocalCallFormState>
}

export function LocalCallQuestionsInput({ language, register, control, formState }: Props) {
	const t = ADMIN_LOCAL_CALLS_TRANSLATE.questionsInput[language]

	const { fields, append, remove } = useFieldArray({ control, name: 'questions' })

	const addQuestion = useCallback(() => {
		append({ question: { ro: '', ru: '', en: '' }, maxScore: 10 }, { shouldFocus: false })
	}, [append])

	useEffect(() => {
		fields.forEach((_, index) => {
			register(`questions.${index}.question.ro`, { required: true })
			register(`questions.${index}.question.ru`, { required: true })
			register(`questions.${index}.question.en`, { required: true })
			register(`questions.${index}.maxScore`, { required: true, min: 1, max: 10 })
		})
	}, [register, fields])

	return (
		<div className='flex flex-col gap-[0.5rem]'>
			<label className='font-bold text-green-700 text-[1rem] leading-[1.125rem]'>{t.label}</label>

			<div className='flex flex-col gap-[1rem]'>
				{fields.map((field, index) => (
					<div
						key={field.id}
						className='flex items-end gap-[1rem] border border-gray-500 rounded-[1rem] p-[1rem]'
					>
						<div className='flex-1 flex flex-col gap-[0.5rem]'>
							<InputField
								key={`question-${field.id}-${language}`}
								hasError={!!formState.errors.questions?.[index]?.question}
								placeholder={t.questionPlaceholder}
								{...register(`questions.${index}.question.${language}`, { required: true })}
							/>
						</div>
						<div className='w-[8rem] flex flex-col gap-[0.5rem]'>
							<label className='text-[0.75rem] text-green-700'>{t.maxScoreLabel}</label>
							<InputField
								type='number'
								min={1}
								max={10}
								hasError={!!formState.errors.questions?.[index]?.maxScore}
								{...register(`questions.${index}.maxScore`, {
									required: true,
									min: 1,
									max: 10,
									valueAsNumber: true
								})}
							/>
						</div>
						<p
							onClick={() => remove(index)}
							className='text-[0.875rem] text-error cursor-pointer hover:opacity-70 transition-opacity duration-300 mb-[0.75rem]'
						>
							{t.removeLabel}
						</p>
					</div>
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
			{formState.errors.questions && (
				<p className='text-error text-sm'>{t.error}</p>
			)}
		</div>
	)
}
