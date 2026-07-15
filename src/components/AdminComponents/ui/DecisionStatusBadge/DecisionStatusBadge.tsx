import { useTranslations } from 'next-intl'

import { DecisionStatusEnum } from '@/types/shared/decision-status.types'

interface Props {
	status: DecisionStatusEnum
}

const STATUS_COLOR: Record<DecisionStatusEnum, string> = {
	[DecisionStatusEnum.CLOSED]: 'bg-green-600',
	[DecisionStatusEnum.PENDING]: 'bg-gray-600'
}

const STATUS_LABEL_KEY: Record<DecisionStatusEnum, string> = {
	[DecisionStatusEnum.CLOSED]: 'status_closed',
	[DecisionStatusEnum.PENDING]: 'status_open'
}

// Falls back to PENDING for any value outside the current 2-state enum — e.g. a
// decision saved before the pending/approved/rejected → pending/closed migration,
// which would otherwise index these Records with `undefined` and crash next-intl's
// t() when it tries to split a non-string key.
function resolveStatus(status: DecisionStatusEnum): DecisionStatusEnum {
	return status in STATUS_COLOR ? status : DecisionStatusEnum.PENDING
}

export function DecisionStatusBadge({ status }: Props) {
	const t = useTranslations('Admin')
	const resolvedStatus = resolveStatus(status)

	return (
		<div
			className={`h-[1.5rem] w-fit rounded-[0.25rem] px-[0.5rem] flex items-center justify-center ${STATUS_COLOR[resolvedStatus]}`}
		>
			<p className='text-[0.75rem] leading-[0.875rem] font-[400] text-white whitespace-nowrap'>
				{t(STATUS_LABEL_KEY[resolvedStatus])}
			</p>
		</div>
	)
}
