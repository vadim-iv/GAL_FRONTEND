'use client'

import { Plus } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useEffect } from 'react'
import { Control, FormState, UseFormRegister, useFieldArray, useWatch } from 'react-hook-form'

import { ADMIN_DECISIONS_TRANSLATE } from '@/constants/admin-decisions-translate.data'
import { DecisionQuestionType, TypeDecisionFormState } from '@/types/decision.types'

import { InputField } from '../../ui/InputField'
import { SelectBox } from '../../ui/SelectBox/SelectBox'

interface Props {
	index: number
	language: 'ro' | 'ru' | 'en'
	register: UseFormRegister<TypeDecisionFormState>
	control: Control<TypeDecisionFormState>
	formState: FormState<TypeDecisionFormState>
	onRemove: () => void
}

const QUESTION_TYPE_LABEL_KEY: Record<DecisionQuestionType, string> = {
	[DecisionQuestionType.RADIO]: 'question_type_radio',
	[DecisionQuestionType.SELECT]: 'question_type_select',
	[DecisionQuestionType.TEXT]: 'question_type_text'
}

export function DecisionQuestionRow({ index, language, register, control, formState, onRemove }: Props) {
	const t = ADMIN_DECISIONS_TRANSLATE.questionsInput[language]
	const optionsT = ADMIN_DECISIONS_TRANSLATE.optionsInput[language]
	const tGeneric = useTranslations('Admin')

	const questionType = useWatch({ control, name: `questions.${index}.type` })

	// The options array itself (not just each option's fields) needs its own
	// validation — RADIO/SELECT questions must have at least one option, mirroring
	// the backend's validateQuestions() check. This has to go through useFieldArray's
	// own `rules` option, not a plain register() call on the same path — register()
	// gets silently superseded by useFieldArray's internal tracking of that exact
	// array path and never actually runs, letting invalid submissions through to the
	// backend's raw, untranslated error.
	const {
		fields: optionFields,
		append: appendOption,
		remove: removeOption,
		replace: replaceOptions
	} = useFieldArray({
		control,
		name: `questions.${index}.options`,
		rules: {
			validate: (value, formValues) => {
				const currentType = formValues.questions?.[index]?.type
				const needsOptions =
					currentType === DecisionQuestionType.RADIO || currentType === DecisionQuestionType.SELECT
				if (needsOptions && (!value || value.length === 0)) {
					return optionsT.error
				}
				return true
			}
		}
	})

	useEffect(() => {
		register(`questions.${index}.question.ro`, { required: true })
		register(`questions.${index}.question.ru`, { required: true })
		register(`questions.${index}.question.en`, { required: true })
	}, [register, index])

	// Every current option's label (all 3 languages) needs to be registered up
	// front, mirroring LocalCallQuestionsInput's established pattern — plain
	// register() fields don't auto-attach "required" validation to a language the
	// admin never visits, unlike useController-based fields.
	useEffect(() => {
		optionFields.forEach((_, optIndex) => {
			register(`questions.${index}.options.${optIndex}.label.ro`, { required: true })
			register(`questions.${index}.options.${optIndex}.label.ru`, { required: true })
			register(`questions.${index}.options.${optIndex}.label.en`, { required: true })
		})
	}, [register, index, optionFields])

	// Switching to TEXT clears any stray options via the field array's own replace()
	// (not setValue — mutating a useFieldArray-managed path directly would desync
	// its internal tracking from the actual form values).
	useEffect(() => {
		if (questionType === DecisionQuestionType.TEXT && optionFields.length > 0) {
			replaceOptions([])
		}
	}, [questionType, optionFields.length, replaceOptions])

	const showOptions = questionType === DecisionQuestionType.RADIO || questionType === DecisionQuestionType.SELECT
	// The field array's own rules.validate error lands on .root, not directly on
	// .options — reading .options alone is truthy (it still has a .root inside) but
	// .message is undefined, rendering an empty <p> (visible whitespace, no text).
	const optionsError = formState.errors.questions?.[index]?.options?.root

	return (
		<div className='flex flex-col gap-[1rem] border border-gray-500 rounded-[1rem] p-[1rem]'>
			<div className='flex items-end gap-[1rem]'>
				<div className='flex-1 flex flex-col gap-[0.5rem]'>
					<InputField
						key={`question-${index}-${language}`}
						hasError={!!formState.errors.questions?.[index]?.question}
						placeholder={t.questionPlaceholder}
						{...register(`questions.${index}.question.${language}`, { required: true })}
					/>
				</div>
				<div className='w-[12rem] flex flex-col gap-[0.5rem]'>
					<label className='text-[0.75rem] text-green-700'>{t.typeLabel}</label>
					<SelectBox
						options={Object.values(DecisionQuestionType).map(type => ({
							value: type,
							label: tGeneric(QUESTION_TYPE_LABEL_KEY[type])
						}))}
						// eslint-disable-next-line @typescript-eslint/no-explicit-any
						name={`questions.${index}.type` as any}
						control={control}
						placeholder={t.typePlaceholder}
						className='bg-gray-300'
					/>
				</div>
				<p
					onClick={onRemove}
					className='text-[0.875rem] text-error cursor-pointer hover:opacity-70 transition-opacity duration-300 mb-[0.75rem]'
				>
					{t.removeLabel}
				</p>
			</div>

			{showOptions && (
				<div
					className={`flex flex-col gap-[0.5rem] rounded-[0.75rem]`}
				>
					<label className='text-[0.75rem] text-green-700'>{optionsT.label}</label>

					{optionFields.map((optionField, optIndex) => (
						<div key={optionField.id} className='flex items-end gap-[0.75rem]'>
							<div className='flex-1 flex flex-col gap-[0.25rem]'>
								<InputField
									key={`option-label-${optionField.id}-${language}`}
									hasError={!!formState.errors.questions?.[index]?.options?.[optIndex]?.label}
									placeholder={optionsT.labelPlaceholder}
									{...register(`questions.${index}.options.${optIndex}.label.${language}`, {
										required: true
									})}
								/>
							</div>
							<p
								onClick={() => removeOption(optIndex)}
								className='text-[0.875rem] text-error cursor-pointer hover:opacity-70 transition-opacity duration-300 mb-[0.75rem]'
							>
								{optionsT.removeLabel}
							</p>
						</div>
					))}

					<button
						type='button'
						className='cursor-pointer hover:opacity-70 transition-opacity duration-300 w-full border border-dashed border-gray-500 bg-gray-400 rounded-[0.75rem] h-[3rem] flex items-center justify-center gap-[0.5rem]'
						onClick={() => appendOption({ value: crypto.randomUUID(), label: { ro: '', ru: '', en: '' } })}
					>
						<Plus className='text-green-700 size-[1rem]' />
						<span className='text-[0.875rem] text-green-700 font-[400]'>{optionsT.addButton}</span>
					</button>

					{optionsError && (
						<p className='text-error text-sm'>{optionsError.message as string}</p>
					)}
				</div>
			)}
		</div>
	)
}
