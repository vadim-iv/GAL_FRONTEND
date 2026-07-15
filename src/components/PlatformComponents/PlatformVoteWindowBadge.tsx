'use client'

import { format } from 'date-fns'
import { useTranslations } from 'next-intl'

import { VoteWindowState, getVoteWindowState } from '@/lib/vote-window.utils'

interface Props {
	voteStart: string
	voteEnd: string
}

const STATE_COLOR: Record<VoteWindowState, string> = {
	not_started: 'bg-gray-600',
	active: 'bg-green-600',
	ended: 'bg-error'
}

const STATE_LABEL_KEY: Record<VoteWindowState, string> = {
	not_started: 'voteNotStarted',
	active: 'voteActive',
	ended: 'voteEnded'
}

export function PlatformVoteWindowBadge({ voteStart, voteEnd }: Props) {
	const t = useTranslations('Platform')
	const state = getVoteWindowState(voteStart, voteEnd)
	// not_started announces when voting opens (voteStart); active/ended both
	// communicate relative to voteEnd (until it closes / when it closed).
	const date = format(new Date(state === 'not_started' ? voteStart : voteEnd), 'dd.MM.yyyy')

	return (
		<div
			className={`h-[1.5rem] w-fit rounded-[0.25rem] px-[0.5rem] flex items-center justify-center ${STATE_COLOR[state]}`}
		>
			<p className='text-[0.75rem] leading-[0.875rem] font-[400] text-white whitespace-nowrap'>
				{t(STATE_LABEL_KEY[state], { date })}
			</p>
		</div>
	)
}
