'use client'

import { Plus } from 'lucide-react'

import { ADMIN_LOCAL_CALLS_TRANSLATE } from '@/constants/admin-local-calls-translate.data'
import { ADMIN_PAGES } from '@/config/admin-pages.config'
import { ILocalCallResponse } from '@/types/local-call.types'

import { Link } from '@/i18n/navigation'
import { Pathnames } from '@/i18n/routing'

import { LocalCallCard } from './LocalCallCard'

interface Props {
	localCalls: ILocalCallResponse[]
	language: 'ro' | 'ru' | 'en'
}

export function LocalCallsGrid({ localCalls, language }: Props) {
	return (
		<div className='w-full mt-[1.5rem] flex justify-end'>
			<div
				className='grid w-full sidebar-req:w-[calc(100vw-20.625rem)] fullhd-threshold:w-[calc(var(--breakpoint-fullhd-threshold)-20.625rem)] gap-[1.5rem] items-stretch'
				style={{ gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gridAutoRows: 'minmax(0, 1fr)' }}
			>
				<Link href={ADMIN_PAGES.CREATE_LOCAL_CALL as Pathnames}>
					<div className='bg-gray-300 h-full rounded-[1rem] flex items-center justify-center gap-[0.25rem] hover:opacity-70 transition-opacity duration-300 border border-dashed border-gray-500'>
						<Plus className='text-green-700 size-[1.125rem]' />
						<h2 className='text-[1rem] font-[500] text-green-700 text-center'>
							{ADMIN_LOCAL_CALLS_TRANSLATE.addButtonLabel[language]}
						</h2>
					</div>
				</Link>
				{localCalls.map(localCall => (
					<div key={localCall._id} className='w-full h-full'>
						<LocalCallCard localCall={localCall} language={language} />
					</div>
				))}
			</div>
		</div>
	)
}
