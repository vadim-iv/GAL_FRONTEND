import type { Metadata } from 'next'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'

import { PageContent } from './PageContent'

export const metadata: Metadata = {
	title: 'Create Project',
	...NO_INDEX_PAGE
}

interface Props {
	params: Promise<{ id: string }>
}

export default async function CreateProjectPage({ params }: Props) {
	const { id } = await params

	return <PageContent localCallId={id} />
}
