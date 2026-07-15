import type { Metadata } from 'next'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'

import { PageContent } from './PageContent'

export const metadata: Metadata = {
	title: 'Create Decision',
	...NO_INDEX_PAGE
}

export default function CreateDecisionPage() {
	return <PageContent />
}
