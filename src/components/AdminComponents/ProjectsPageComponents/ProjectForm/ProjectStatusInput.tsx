'use client'

import { Control } from 'react-hook-form'
import { useTranslations } from 'next-intl'

import { ADMIN_PROJECTS_TRANSLATE } from '@/constants/admin-projects-translate.data'
import { ApprovalStatusEnum, TypeProjectFormState } from '@/types/local-call.types'

import { SelectBox } from '../../ui/SelectBox/SelectBox'

interface Props {
	language: 'ro' | 'ru' | 'en'
	control: Control<TypeProjectFormState>
}

const STATUS_LABEL_KEY: Record<ApprovalStatusEnum, string> = {
	[ApprovalStatusEnum.PENDING]: 'status_pending',
	[ApprovalStatusEnum.APPROVED]: 'status_approved',
	[ApprovalStatusEnum.REJECTED]: 'status_rejected'
}

export function ProjectStatusInput({ language, control }: Props) {
	const t = useTranslations('Admin')

	const options = Object.values(ApprovalStatusEnum).map(status => ({
		value: status,
		label: t(STATUS_LABEL_KEY[status])
	}))

	return (
		<div className='flex flex-col gap-[0.5rem]'>
			<label className='font-bold text-green-700 text-[1rem] leading-[1.125rem]'>
				{ADMIN_PROJECTS_TRANSLATE.statusInput[language].label}
			</label>
			<SelectBox
				options={options}
				name='status'
				control={control}
				placeholder={ADMIN_PROJECTS_TRANSLATE.statusInput[language].label}
				className='bg-gray-300 max-w-[20rem]'
			/>
		</div>
	)
}
