import type { Metadata } from 'next'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'

import { PageContent } from './PageContent'

export const metadata: Metadata = {
	title: 'Edit Project',
	...NO_INDEX_PAGE
}

interface Props {
	params: Promise<{ id: string; projectId: string }>
}

export default async function EditProjectPage({ params }: Props) {
	const { id, projectId } = await params

	return <PageContent localCallId={id} projectId={projectId} />
}
