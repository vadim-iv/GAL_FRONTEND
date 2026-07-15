'use client'

import { Check } from 'lucide-react'
import { useTranslations } from 'next-intl'

export function VotedBadge() {
	const t = useTranslations('Platform')

	return (
		<div className='h-[1.5rem] w-fit rounded-[0.25rem] px-[0.75rem] flex items-center gap-[0.25rem] bg-green-600'>
			<Check className='size-[0.875rem] text-white shrink-0' />
			<p className='text-[0.75rem] leading-[0.875rem] font-[400] text-white whitespace-nowrap'>
				{t('votedBadge')}
			</p>
		</div>
	)
}
