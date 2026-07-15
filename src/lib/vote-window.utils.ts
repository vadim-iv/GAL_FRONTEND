export type VoteWindowState = 'not_started' | 'active' | 'ended'

export function getVoteWindowState(voteStart: string, voteEnd: string): VoteWindowState {
	const now = new Date()
	const start = new Date(voteStart)
	const end = new Date(voteEnd)

	if (now < start) return 'not_started'
	if (now > end) return 'ended'
	return 'active'
}
