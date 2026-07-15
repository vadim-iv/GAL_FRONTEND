import type { Metadata } from 'next'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'

import { DecisionVoteForm } from '@/components/PlatformComponents/DecisionVoteForm/DecisionVoteForm'

export const metadata: Metadata = {
	title: 'Votează decizia',
	...NO_INDEX_PAGE
}

interface Props {
	params: Promise<{ id: string }>
}

export default async function DecisionVotePage({ params }: Props) {
	const { id } = await params

	return <DecisionVoteForm decisionId={id} />
}
