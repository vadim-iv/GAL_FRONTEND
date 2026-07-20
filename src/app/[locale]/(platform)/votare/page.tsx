import { redirect } from '@/i18n/navigation'
import { PLATFORM_PAGES } from '@/config/platform-pages.config'
import { Pathnames } from '@/i18n/routing'

interface Props {
	params: Promise<{ locale: string }>
}

export default async function VotingPage({ params }: Props) {
	const { locale } = await params
	redirect({ href: PLATFORM_PAGES.LOCAL_CALLS as Pathnames, locale })
}
