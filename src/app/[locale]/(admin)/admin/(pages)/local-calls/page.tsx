import type { Metadata } from 'next'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'

import { PageContent } from './PageContent'

export const metadata: Metadata = {
	title: 'Local Calls',
	...NO_INDEX_PAGE
}

export default function LocalCallsPage() {
	return <PageContent />
}
