'use client'

import { Plus } from 'lucide-react'
import { useCallback, useEffect } from 'react'
import { Control, FormState, UseFormRegister, useFieldArray, useWatch } from 'react-hook-form'

import { ADMIN_LOCAL_CALLS_TRANSLATE } from '@/constants/admin-local-calls-translate.data'
import { TypeLocalCallFormState } from '@/types/local-call.types'

import { isMultiLangComplete } from '@/lib/multi-lang.utils'

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
	// Watched (not read from formState.errors) so the red state always reflects the
	// LIVE value — each language is registered as its own separate path (.ro/.ru/.en)
	// sharing one cross-language validate rule, but RHF's onChange-triggered
	// revalidation only re-runs the rule for whichever path just fired, never its
	// siblings. So after typing Romanian, then Russian, then English, the Romanian
	// and Russian entries in formState.errors never get a chance to re-check
	// themselves against the now-complete data and can be left stuck red even though
	// the actual values are all filled in. useWatch doesn't have that staleness
	// problem — it reflects the live value on every keystroke regardless of which tab
	// is focused. Watched once for the whole array (not per-row) since calling
	// useWatch inside .map() would violate the rules of hooks as questions are added/removed.
	const questionsValue = useWatch({ control, name: 'questions' })

	const addQuestion = useCallback(() => {
		append({ question: { ro: '', ru: '', en: '' }, maxScore: 10 }, { shouldFocus: false })
	}, [append])

	useEffect(() => {
		fields.forEach((_, index) => {
			// Validates ALL THREE languages together (not just the field's own value) so
			// e.g. a completed Romanian tab still shows red while Russian/English are empty.
			const questionTextValidate = (_value: string, formValues: TypeLocalCallFormState) =>
				isMultiLangComplete(formValues.questions?.[index]?.question)
			register(`questions.${index}.question.ro`, { validate: questionTextValidate })
			register(`questions.${index}.question.ru`, { validate: questionTextValidate })
			register(`questions.${index}.question.en`, { validate: questionTextValidate })
			register(`questions.${index}.maxScore`, { required: true, min: 1, max: 10 })
		})
	}, [register, fields])

	return (
		<div className='flex flex-col gap-[0.5rem]'>
			<label className='font-bold text-green-700 text-[1rem] leading-[1.125rem]'>{t.label}</label>

			<div className='flex flex-col gap-[1rem]'>
				{fields.map((field, index) => {
					const questionTextValidate = (_value: string, formValues: TypeLocalCallFormState) =>
						isMultiLangComplete(formValues.questions?.[index]?.question)
					const questionHasError =
						formState.isSubmitted && !isMultiLangComplete(questionsValue?.[index]?.question)

					return (
						<div
							key={field.id}
							className='flex flex-col gap-[0.5rem] border border-gray-500 rounded-[1rem] p-[1rem]'
						>
							{/* The error text below deliberately sits OUTSIDE this items-end row, not
							inside the input's own column — nesting it there would grow just that
							column's height, and items-end re-anchors every column to the new (taller)
							bottom, visibly shifting the max-score field / remove button down relative
							to the input. */}
							<div className='flex items-end gap-[1rem]'>
								<div className='flex-1'>
									<InputField
										key={`question-${field.id}-${language}`}
										hasError={questionHasError}
										placeholder={t.questionPlaceholder}
										{...register(`questions.${index}.question.${language}`, { validate: questionTextValidate })}
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
							{questionHasError && <p className='text-error text-sm'>{t.textError}</p>}
						</div>
					)
				})}
			</div>

			<button
				type='button'
				className='cursor-pointer hover:opacity-70 transition-opacity duration-300 w-full mt-[0.5rem] border border-dashed border-gray-500 bg-gray-400 rounded-[1rem] h-[6rem] flex items-center justify-center gap-[0.5rem]'
				onClick={addQuestion}
			>
				<Plus className='text-green-700 size-[1.25rem]' />
				<span className='text-[1rem] leading-[1.125rem] text-green-700 font-[400]'>{t.addButton}</span>
			</button>
		</div>
	)
}
