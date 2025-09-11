import { getTranslations, setRequestLocale } from 'next-intl/server'

import InfoSection, { Breadcrumb } from '@/components/CommonComponents/InfoSection'
import Visualization from '@/components/CommonComponents/Visualization'
import Donation from '@/components/Donation/Donation'

export async function generateMetadata() {
	const t = await getTranslations('index.meta.projects')

	return {
		title: t('title'),
		description: t('description'),
		openGraph: {
			title: t('title'),
			description: t('description'),
			images: [{ url: '/projects_image.png' }]
		},
		twitter: {
			card: 'summary_large_image',
			title: t('title'),
			description: t('description'),
			images: ['/projects_image.png']
		}
	}
}

export default async function Projects({ params }: { params: Promise<{ locale: string }> }) {
	const { locale } = await params
	setRequestLocale(locale)
	const t = await getTranslations('index.Projects')
	const tCategories = await getTranslations('BlogCategories')

	const tagKey = [
		'PROJECTS',
		'CALLS',
		'EVENTS',
		'AGRICULTURE',
		'TOURISM',
		'ENTREPRENEURSHIP',
		'YOUTH',
		'CULTURE',
		'PUBLIC',
		'ECOLOGY',
		'PARTNERSHIPS'
	]

	const tags: string[] = Array.isArray(tagKey)
		? tagKey.map(k => tCategories(k))
		: [tCategories(tagKey)]

	const locRaw = t.raw('location') as Record<string, string>

	const location: Breadcrumb[] = [
		{ text: locRaw['0'] ?? 'Home', link: '/' },
		{ text: locRaw['1'] ?? 'Project', link: '/projects' }
	]

	return (
		<>
			<main className='relative w-full h-fit mb-12 sm:mb-[100vh] bg-sand-50'>
				<InfoSection
					tags={tags}
					headerText={t('title')}
					location={location}
					imageSrc='/projects_image.jpg'
					imageAlt='Projects Image'
				/>
				<Visualization
					header={t('visualization_header')}
					description={t('visualization_text')}
					type='PROJECT'
				/>
				<Donation />
			</main>
		</>
	)
}
