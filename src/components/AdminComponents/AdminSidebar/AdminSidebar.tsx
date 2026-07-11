'use client'

import { ADMIN_SIDEBAR_ITEMS } from '@/constants/admin-sidebar.constants'
import { Link } from '@/i18n/navigation'
import Image from 'next/image'
import { useState } from 'react'
import { SidebarSubsection } from './SidebarSubsection'

export function AdminSidebar() {
	const [open, setOpen] = useState(false)

	const handleOpen = () => {
		setOpen(prev => !prev)
	}

	return (
		<div className={`${ open ? 'translate-x-0' : '-translate-x-full' } sidebar-req:hidden transition-transform duration-300 fixed top-0 left-0 h-screen border-r border-r-gray-500 bg-green-600 max-w-[16.625rem] w-full z-1000`}>
			
			<div
				onClick={handleOpen}
				className='cursor-pointer absolute w-[1.5rem] h-[6rem] border-y border-r border-gray-500 rounded-r-[0.5rem] bg-green-600 right-0 top-1/2 -translate-y-1/2 translate-x-[100%] flex items-center justify-center'
			>
				<Image
					src='/admin_assets/angle-right-icon.svg'
					alt='open / close'
					width={8}
					height={16}
					className={`${open ? 'rotate-180' : 'rotate-0'} size-[1rem]`}
				/>
			</div>

			<div className='w-full h-full flex flex-col p-[1.5rem]'>
                <Link href='/admin'>
                    <Image
                        src='/admin_assets/logo-gal-white.svg'
                        alt='logo'
                        width={64}
                        height={64}
                        className='size-[2.5rem]'
                    />
                </Link>

				<div className='flex flex-col gap-[1.5rem] mt-[2rem]'>
					{
						ADMIN_SIDEBAR_ITEMS.map((subsection, index) => (
							<SidebarSubsection key={index} {...subsection} />
						))
					}
				</div>
			</div>
		</div>
	)
}
