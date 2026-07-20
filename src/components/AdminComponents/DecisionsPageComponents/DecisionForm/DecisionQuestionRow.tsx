'use client'

import { Plus } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useEffect } from 'react'
import { Control, FormState, UseFormRegister, useFieldArray, useWatch } from 'react-hook-form'

import { ADMIN_DECISIONS_TRANSLATE } from '@/constants/admin-decisions-translate.data'
import { DecisionQuestionType, TypeDecisionFormState } from '@/types/decision.types'

import { isMultiLangComplete } from '@/lib/multi-lang.utils'

import { InputField } from '../../ui/InputField'
import { RichTextEditor } from '../../ui/RichTextEditor/RichTextEditor'
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
	[DecisionQuestionType.CHECKBOX]: 'question_type_checkbox',
	[DecisionQuestionType.TEXT]: 'question_type_text'
}

export function DecisionQuestionRow({ index, language, register, control, formState, onRemove }: Props) {
	const t = ADMIN_DECISIONS_TRANSLATE.questionsInput[language]
	const optionsT = ADMIN_DECISIONS_TRANSLATE.optionsInput[language]
	const tGeneric = useTranslations('Admin')

	const questionType = useWatch({ control, name: `questions.${index}.type` })
	// Watched (not read from formState.errors) so the red state always reflects the
	// LIVE value — see the note above questionTextValidate for why formState.errors
	// itself can go stale here.
	const questionValue = useWatch({ control, name: `questions.${index}.question` })
	const optionsValue = useWatch({ control, name: `questions.${index}.options` })

	// The options array itself (not just each option's fields) needs its own
	// validation — RADIO/CHECKBOX questions must have at least one option, mirroring
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
					currentType === DecisionQuestionType.RADIO || currentType === DecisionQuestionType.CHECKBOX
				if (needsOptions && (!value || value.length === 0)) {
					return optionsT.error
				}
				return true
			}
		}
	})

	// Validates ALL THREE languages together (not just the field's own value) so
	// e.g. a completed Romanian tab still shows red while Russian/English are empty.
	// This still correctly BLOCKS submission when incomplete (RHF revalidates every
	// registered field fresh on every submit attempt) — but it does NOT drive the
	// visual red state below. Each language is registered as its own separate path
	// (.ro/.ru/.en), and RHF's onChange-triggered revalidation only re-runs the rule
	// for whichever path just fired — never its siblings. So after typing Romanian,
	// then Russian, then English, the Romanian and Russian entries in
	// formState.errors never get a chance to re-check themselves against the now-
	// complete data and can be left stuck red even though the actual values are all
	// filled in. useWatch (above) doesn't have that staleness problem — it reflects
	// the live value on every keystroke regardless of which tab is focused — so the
	// visual hasError/error-message below is derived from that instead.
	// Attached via RichTextEditor's own `rules` prop below (forwarded to
	// useController) — do NOT also register() this field path manually. Mixing
	// register() and useController on the same name is a real RHF conflict: the
	// manual registration can clobber the controller-tracked value, so the field
	// can look filled in the UI yet still fail validation on submit.
	const questionTextValidate = (_value: string, formValues: TypeDecisionFormState) =>
		isMultiLangComplete(formValues.questions?.[index]?.question)

	// Every current option's label (all 3 languages) needs to be registered up
	// front, mirroring LocalCallQuestionsInput's established pattern — plain
	// register() fields don't auto-attach validation to a language the admin
	// never visits, unlike useController-based fields.
	useEffect(() => {
		optionFields.forEach((_, optIndex) => {
			const optionLabelValidate = (_value: string, formValues: TypeDecisionFormState) =>
				isMultiLangComplete(formValues.questions?.[index]?.options?.[optIndex]?.label)
			register(`questions.${index}.options.${optIndex}.label.ro`, { validate: optionLabelValidate })
			register(`questions.${index}.options.${optIndex}.label.ru`, { validate: optionLabelValidate })
			register(`questions.${index}.options.${optIndex}.label.en`, { validate: optionLabelValidate })
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

	const showOptions = questionType === DecisionQuestionType.RADIO || questionType === DecisionQuestionType.CHECKBOX
	// The field array's own rules.validate error lands on .root, not directly on
	// .options — reading .options alone is truthy (it still has a .root inside) but
	// .message is undefined, rendering an empty <p> (visible whitespace, no text).
	const optionsError = formState.errors.questions?.[index]?.options?.root
	const questionHasError = formState.isSubmitted && !isMultiLangComplete(questionValue)

	return (
		<div className='flex flex-col gap-[1rem] border border-gray-500 rounded-[1rem] p-[1rem]'>
			<div className='flex flex-col gap-[0.5rem]'>
				<div className='flex items-start gap-[1rem]'>
					<div className='flex-1'>
						<RichTextEditor
							key={`question-${index}-${language}`}
							control={control}
							name={`questions.${index}.question.${language}`}
							placeholder={t.questionPlaceholder}
							rules={{ validate: questionTextValidate }}
							className={`h-[8rem] ${questionHasError ? 'border-error text-error placeholder:text-error animate-shake' : ''}`}
						/>
					</div>
					<p
						onClick={onRemove}
						className='mt-[0.625rem] text-[0.875rem] text-error cursor-pointer hover:opacity-70 transition-opacity duration-300'
					>
						{t.removeLabel}
					</p>
				</div>
				{questionHasError && <p className='text-error text-sm'>{t.textError}</p>}

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
			</div>

			{showOptions && (
				<div
					className={`flex flex-col gap-[0.5rem] rounded-[0.75rem]`}
				>
					<label className='text-[0.75rem] text-green-700'>{optionsT.label}</label>

					{optionFields.map((optionField, optIndex) => {
						const optionLabelValidate = (_value: string, formValues: TypeDecisionFormState) =>
							isMultiLangComplete(formValues.questions?.[index]?.options?.[optIndex]?.label)
						// Same staleness concern as questionHasError above — derived from the
						// live watched array, not formState.errors.
						const optionLabelHasError =
							formState.isSubmitted && !isMultiLangComplete(optionsValue?.[optIndex]?.label)

						return (
							<div key={optionField.id} className='flex flex-col gap-[0.25rem]'>
								<div className='flex items-end gap-[0.75rem]'>
									<div className='flex-1'>
										<InputField
											key={`option-label-${optionField.id}-${language}`}
											hasError={optionLabelHasError}
											placeholder={optionsT.labelPlaceholder}
											{...register(`questions.${index}.options.${optIndex}.label.${language}`, {
												validate: optionLabelValidate
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
								{optionLabelHasError && <p className='text-error text-sm'>{optionsT.labelError}</p>}
							</div>
						)
					})}

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
