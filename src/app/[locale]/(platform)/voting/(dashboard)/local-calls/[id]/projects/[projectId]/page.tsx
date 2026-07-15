import type { Metadata } from 'next'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'

import { ProjectScoreForm } from '@/components/PlatformComponents/ProjectScoreForm/ProjectScoreForm'

export const metadata: Metadata = {
	title: 'Votează proiectul',
	...NO_INDEX_PAGE
}

interface Props {
	params: Promise<{ id: string; projectId: string }>
}

export default async function ProjectVotePage({ params }: Props) {
	const { id, projectId } = await params

	return <ProjectScoreForm localCallId={id} projectId={projectId} />
}
