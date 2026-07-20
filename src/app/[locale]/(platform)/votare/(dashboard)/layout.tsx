'use client'

import { useEffect } from 'react'
import type { PropsWithChildren } from 'react'

import { PlatformHeader } from '@/components/PlatformComponents/PlatformHeader'

import { PLATFORM_PAGES } from '@/config/platform-pages.config'

import { useCurrentMember } from '@/hooks/platform/useCurrentMember'

import { useRouter } from '@/i18n/navigation'
import { Pathnames } from '@/i18n/routing'

// Defense-in-depth alongside the middleware's cookie check — if this ever
// renders without a stored member profile (e.g. storage was cleared), bounce
// to login instead of showing a broken "Hello, undefined" header.
export default function DashboardLayout({ children }: PropsWithChildren<unknown>) {
	const router = useRouter()
	const { member, isLoading } = useCurrentMember()

	useEffect(() => {
		if (!isLoading && !member) {
			router.push(PLATFORM_PAGES.LOGIN as Pathnames)
		}
	}, [isLoading, member, router])

	if (isLoading || !member) return null

	return (
		<div className='min-h-screen bg-gray-100'>
			<PlatformHeader />
			<main className='px-[1.5rem] py-[2rem]'>{children}</main>
		</div>
	)
}
