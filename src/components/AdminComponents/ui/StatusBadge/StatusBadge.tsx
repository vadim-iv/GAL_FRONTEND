import { useTranslations } from 'next-intl'

import { ApprovalStatusEnum } from '@/types/local-call.types'

interface Props {
	status: ApprovalStatusEnum
}

const STATUS_COLOR: Record<ApprovalStatusEnum, string> = {
	[ApprovalStatusEnum.APPROVED]: 'bg-green-600',
	[ApprovalStatusEnum.REJECTED]: 'bg-error',
	[ApprovalStatusEnum.PENDING]: 'bg-gray-600'
}

const STATUS_LABEL_KEY: Record<ApprovalStatusEnum, string> = {
	[ApprovalStatusEnum.APPROVED]: 'status_approved',
	[ApprovalStatusEnum.REJECTED]: 'status_rejected',
	[ApprovalStatusEnum.PENDING]: 'status_pending'
}

export function StatusBadge({ status }: Props) {
	const t = useTranslations('Admin')

	return (
		<div
			className={`h-[1.5rem] w-fit rounded-[0.25rem] px-[0.5rem] flex items-center justify-center ${STATUS_COLOR[status]}`}
		>
			<p className='text-[0.75rem] leading-[0.875rem] font-[400] text-white whitespace-nowrap'>
				{t(STATUS_LABEL_KEY[status])}
			</p>
		</div>
	)
}
