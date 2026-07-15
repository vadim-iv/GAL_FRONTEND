'use client'

import { useTranslations } from 'next-intl'

import { VoteWindowState, getVoteWindowState } from '@/lib/vote-window.utils'

interface Props {
	voteStart: string
	voteEnd: string
}

const STATE_STYLE: Record<VoteWindowState, string> = {
	not_started: 'bg-gray-300 text-gray-600 border-gray-500',
	active: 'bg-green-300/40 text-green-700 border-green-600',
	ended: 'bg-error/10 text-error border-error'
}

const STATE_MESSAGE_KEY: Record<VoteWindowState, string> = {
	not_started: 'voteWindowNotStartedMessage',
	active: 'voteWindowActiveMessage',
	ended: 'voteWindowEndedMessage'
}

export function VoteWindowBanner({ voteStart, voteEnd }: Props) {
	const t = useTranslations('Platform')
	const state = getVoteWindowState(voteStart, voteEnd)

	return (
		<div className={`w-full rounded-[1rem] border px-[1.5rem] py-[1rem] text-[0.875rem] ${STATE_STYLE[state]}`}>
			{t(STATE_MESSAGE_KEY[state])}
		</div>
	)
}
