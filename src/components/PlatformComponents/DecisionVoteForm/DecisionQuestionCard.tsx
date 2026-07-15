'use client'

import { useTranslations } from 'next-intl'

import { SelectBoxBase } from '@/components/AdminComponents/ui/SelectBox/SelectBoxBase'

import { DecisionQuestionType, IDecisionOption } from '@/types/decision.types'

interface Props {
	questionId: string
	question: string
	type: DecisionQuestionType
	options?: IDecisionOption[]
	language: 'ro' | 'ru' | 'en'
	value: string
	onChange: (value: string) => void
	disabled?: boolean
}

export function DecisionQuestionCard({
	questionId,
	question,
	type,
	options,
	language,
	value,
	onChange,
	disabled
}: Props) {
	const t = useTranslations('Platform')

	return (
		<div className='bg-white rounded-[1rem] border border-gray-500 p-[1.5rem] flex flex-col gap-[1rem]'>
			<p className='text-green-700 text-[1rem] font-[500]'>{question}</p>

			{type === DecisionQuestionType.RADIO && (
				<div className='flex flex-col gap-[0.75rem]'>
					{options?.map(option => (
						<label
							key={option.value}
							className={`flex items-center gap-[0.75rem] ${disabled ? 'cursor-not-allowed opacity-70' : 'cursor-pointer'}`}
						>
							<input
								type='radio'
								name={questionId}
								checked={value === option.value}
								disabled={disabled}
								onChange={() => onChange(option.value)}
								className='size-[1.125rem] accent-green-600'
							/>
							<span className='text-green-700 text-[0.875rem]'>{option.label[language]}</span>
						</label>
					))}
				</div>
			)}

			{type === DecisionQuestionType.SELECT && (
				<SelectBoxBase
					options={(options ?? []).map(option => ({ value: option.value, label: option.label[language] }))}
					value={value}
					onChange={onChange}
					placeholder={t('selectPlaceholder')}
					disabled={disabled}
					className='max-w-[20rem]'
				/>
			)}

			{type === DecisionQuestionType.TEXT && (
				<textarea
					value={value}
					disabled={disabled}
					onChange={e => onChange(e.target.value)}
					rows={3}
					className='w-full px-[1rem] py-[0.75rem] border border-gray-500 rounded-[0.5rem] text-green-700 outline-none disabled:opacity-70 disabled:cursor-not-allowed resize-none'
				/>
			)}
		</div>
	)
}
