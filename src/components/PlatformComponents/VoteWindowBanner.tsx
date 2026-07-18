'use client'

import { useTranslations } from 'next-intl'

import { VoteWindowState, getVoteWindowState } from '@/lib/vote-window.utils'

interface Props {
	voteStart: string
	voteEnd: string
	// While voting is still open, a member who already voted sees a confirmation
	// message here instead of the "voting is open" prompt — irrelevant once the
	// window isn't active, since not_started/ended already imply no vote is possible.
	voted?: boolean
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

export function VoteWindowBanner({ voteStart, voteEnd, voted }: Props) {
	const t = useTranslations('Platform')
	const state = getVoteWindowState(voteStart, voteEnd)
	const messageKey = state === 'active' && voted ? 'alreadyVotedMessage' : STATE_MESSAGE_KEY[state]

	return (
		<div className={`w-full rounded-[1rem] border px-[1.5rem] py-[1rem] text-[0.875rem] ${STATE_STYLE[state]}`}>
			{t(messageKey)}
		</div>
	)
}
