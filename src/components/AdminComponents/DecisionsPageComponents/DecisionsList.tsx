'use client'

import { Plus } from 'lucide-react'

import { ADMIN_DECISIONS_TRANSLATE } from '@/constants/admin-decisions-translate.data'
import { ADMIN_PAGES } from '@/config/admin-pages.config'
import { IDecisionResponse } from '@/types/decision.types'

import { Link } from '@/i18n/navigation'
import { Pathnames } from '@/i18n/routing'

import { DecisionRow } from './DecisionRow'
import { DecisionRowHeader } from './DecisionRowHeader'

interface Props {
	decisions: IDecisionResponse[]
	language: 'ro' | 'ru' | 'en'
}

export function DecisionsList({ decisions, language }: Props) {
	return (
		<div className='w-full mt-[1.5rem] flex justify-end'>
			<div className='w-full sidebar-req:w-[calc(100vw-20.625rem)] fullhd-threshold:w-[calc(var(--breakpoint-fullhd-threshold)-20.625rem)]'>
				<DecisionRowHeader language={language} />

				<div className='mt-[0.5rem] flex flex-col gap-[1rem]'>
					{decisions.map(decision => (
						<DecisionRow key={decision._id} decision={decision} language={language} />
					))}
				</div>

				<Link href={ADMIN_PAGES.CREATE_DECISION as Pathnames}>
					<div className='cursor-pointer hover:opacity-70 transition-opacity duration-300 w-full mt-[1rem] border border-dashed border-gray-500 bg-gray-400 rounded-[1rem] h-[6rem] flex items-center justify-center gap-[0.5rem]'>
						<Plus className='text-green-700 size-[1.25rem]' />
						<span className='text-[1rem] leading-[1.125rem] text-green-700 font-[400]'>
							{ADMIN_DECISIONS_TRANSLATE.addButtonLabel[language]}
						</span>
					</div>
				</Link>
			</div>
		</div>
	)
}
