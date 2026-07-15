'use client'

import { useTranslations } from 'next-intl'

import { PLATFORM_PAGES } from '@/config/platform-pages.config'

import { Link, usePathname } from '@/i18n/navigation'
import { Pathnames } from '@/i18n/routing'

export function PlatformTabSwitcher() {
	const t = useTranslations('Platform')
	const pathname = usePathname()

	const isLocalCalls = pathname.startsWith(PLATFORM_PAGES.LOCAL_CALLS)
	const isDecisions = pathname.startsWith(PLATFORM_PAGES.DECISIONS)

	return (
		<div className='flex items-center gap-[0.5rem]'>
			<Link
				href={PLATFORM_PAGES.LOCAL_CALLS as Pathnames}
				className={`text-center px-[1.5rem] h-[2.5rem] rounded-[1.25rem] flex items-center justify-center text-[1rem] font-[500] whitespace-nowrap transition-colors duration-300 ${
					isLocalCalls ? 'bg-green-600 text-white' : 'bg-gray-300 text-green-700 hover:bg-gray-400'
				}`}
			>
				{t('tabLocalCalls')}
			</Link>
			<Link
				href={PLATFORM_PAGES.DECISIONS as Pathnames}
				className={`text-center px-[1.5rem] h-[2.5rem] rounded-[1.25rem] flex items-center justify-center text-[1rem] font-[500] whitespace-nowrap transition-colors duration-300 ${
					isDecisions ? 'bg-green-600 text-white' : 'bg-gray-300 text-green-700 hover:bg-gray-400'
				}`}
			>
				{t('tabDecisions')}
			</Link>
		</div>
	)
}
