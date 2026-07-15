'use client'

import { useTranslations } from 'next-intl'

import { VoteWindowState, getVoteWindowState } from '@/lib/vote-window.utils'

interface Props {
	voteStart: string
	voteEnd: string
}

// Not a backend field — purely a frontend-computed read of the vote window's
// state, styled to match StatusBadge (fixed width, same color language —
// not_started reuses the pending gray). Shared by local calls and decisions,
// the two entities with a vote window but no equivalent field of their own.
const STATE_COLOR: Record<VoteWindowState, string> = {
	not_started: 'bg-gray-600',
	active: 'bg-green-600',
	ended: 'bg-error'
}

const STATE_LABEL_KEY: Record<VoteWindowState, string> = {
	not_started: 'local_call_status_not_started',
	active: 'local_call_status_active',
	ended: 'local_call_status_ended'
}

export function VoteWindowStatusBadge({ voteStart, voteEnd }: Props) {
	const t = useTranslations('Admin')
	const state = getVoteWindowState(voteStart, voteEnd)

	return (
		<div
			className={`h-[1.5rem] w-[8.5rem] rounded-[0.25rem] px-[0.5rem] flex items-center justify-center ${STATE_COLOR[state]}`}
		>
			<p className='text-[0.75rem] leading-[0.875rem] font-[400] text-white whitespace-nowrap'>
				{t(STATE_LABEL_KEY[state])}
			</p>
		</div>
	)
}
