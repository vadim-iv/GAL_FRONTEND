"use client"

import { useLocale } from 'next-intl'
import Image from 'next/image'
import { match } from 'path-to-regexp'

import type { IAdminSidebarSubsection } from '@/constants/admin-sidebar.constants'

import { Link, usePathname } from '@/i18n/navigation'
import { Pathnames } from '@/i18n/routing'

export function SidebarSubsection({ title, items }: IAdminSidebarSubsection) {
	const locale = useLocale() as 'ro' | 'ru' | 'en'

	const pathName = usePathname()

	return (
		<div>
			<h3 className='font-bold text-white/50 text-[0.75rem] leading-[0.875rem]'>{title[locale]}</h3>
			<div className={`flex flex-col mt-[0.5rem]`}>
				{items.map((item, index) => (
					<Link
						href={item.link as Pathnames}
						key={index}
						className={`${!!match(item.link)(pathName) ? ' bg-white/10 ' : ' hover:bg-white/10 '} h-[2.5rem] flex items-center rounded-[0.125rem] justify-between px-[0.5rem] group transition-colors duration-300 text-white text-[1rem] leading-[1.125rem] font-[400]`}
					>
						<p>{item.title[locale]}</p>
						<Image
							src='/admin_assets/arrow-right.svg'
							alt='arrow right'
							width={16}
							height={16}
							className={`${!!match(item.link)(pathName) ? ' opacity-100 ' : ' opacity-0 group-hover:opacity-100 '} size-[1rem] transition-opacity duration-300`}
						/>
					</Link>
				))}
			</div>
		</div>
	)
}
