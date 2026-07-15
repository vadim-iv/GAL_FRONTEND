'use client'

import { Control } from 'react-hook-form'
import { useTranslations } from 'next-intl'

import { ADMIN_DECISIONS_TRANSLATE } from '@/constants/admin-decisions-translate.data'
import { DecisionStatusEnum } from '@/types/shared/decision-status.types'
import { TypeDecisionFormState } from '@/types/decision.types'

import { SelectBox } from '../../ui/SelectBox/SelectBox'

interface Props {
	language: 'ro' | 'ru' | 'en'
	control: Control<TypeDecisionFormState>
}

const STATUS_LABEL_KEY: Record<DecisionStatusEnum, string> = {
	[DecisionStatusEnum.PENDING]: 'status_open',
	[DecisionStatusEnum.CLOSED]: 'status_closed'
}

// Status is a regular form field — it's only saved when the admin clicks Save on
// the rest of the decision form, not on change (matching the corrected
// ProjectStatusInput pattern, not the original buggy immediate-PATCH one).
export function DecisionStatusInput({ language, control }: Props) {
	const t = useTranslations('Admin')

	const options = Object.values(DecisionStatusEnum).map(status => ({
		value: status,
		label: t(STATUS_LABEL_KEY[status])
	}))

	return (
		<div className='flex flex-col gap-[0.5rem]'>
			<label className='font-bold text-green-700 text-[1rem] leading-[1.125rem]'>
				{ADMIN_DECISIONS_TRANSLATE.statusInput[language].label}
			</label>
			<SelectBox
				options={options}
				name='status'
				control={control}
				placeholder={ADMIN_DECISIONS_TRANSLATE.statusInput[language].label}
				className='bg-gray-300 max-w-[20rem]'
			/>
		</div>
	)
}
