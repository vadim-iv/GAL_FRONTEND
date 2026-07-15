import { SquarePen, X } from 'lucide-react'

import { ADMIN_LOCAL_CALLS_TRANSLATE } from '@/constants/admin-local-calls-translate.data'

interface Props {
	language: 'ro' | 'ru' | 'en'
}

export function LocalCallRowHeader({ language }: Props) {
	return (
		<div className='flex items-center gap-[2rem] px-[1rem]'>
			<p className='w-[14rem] shrink-0 text-[0.875rem] font-bold text-green-700'>
				{ADMIN_LOCAL_CALLS_TRANSLATE.columnLabels.title[language]}
			</p>
			<p className='flex-1 min-w-0 text-[0.875rem] font-bold text-green-700'>
				{ADMIN_LOCAL_CALLS_TRANSLATE.columnLabels.description[language]}
			</p>
			<p className='w-[10rem] shrink-0 text-[0.875rem] font-bold text-green-700'>
				{ADMIN_LOCAL_CALLS_TRANSLATE.columnLabels.voteStart[language]}
			</p>
			<p className='w-[10rem] shrink-0 text-[0.875rem] font-bold text-green-700'>
				{ADMIN_LOCAL_CALLS_TRANSLATE.columnLabels.voteEnd[language]}
			</p>
			<p className='w-[10rem] shrink-0 text-[0.875rem] font-bold text-green-700'>
				{ADMIN_LOCAL_CALLS_TRANSLATE.columnLabels.status[language]}
			</p>

			{/* Invisible mirror of the row's modify/delete cluster — those columns have no
			    header label, but reserving the same width here keeps the description column
			    aligned between the header and the rows below it. */}
			<div className='ml-auto flex items-center gap-[1.5rem] shrink-0 invisible' aria-hidden>
				<div className='flex items-center gap-[0.5rem]'>
					<p className='text-[0.875rem] whitespace-nowrap'>{ADMIN_LOCAL_CALLS_TRANSLATE.modifyLabel[language]}</p>
					<SquarePen className='size-[1.25rem]' />
				</div>
				<X className='size-[1.25rem] shrink-0' />
			</div>
		</div>
	)
}
