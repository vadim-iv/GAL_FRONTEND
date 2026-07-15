'use client'

import { useTranslations } from 'next-intl'
import Image from 'next/image'

import { ILocalCallResponse } from '@/types/local-call.types'

import { PLATFORM_PAGES } from '@/config/platform-pages.config'

import { ArrowIcon } from '@/components/AdminComponents/Icons/ArrowIcon'
import { Button } from '@/components/AdminComponents/ui/Button'

import { Link } from '@/i18n/navigation'
import { Pathnames } from '@/i18n/routing'

import { PlatformVoteWindowBadge } from './PlatformVoteWindowBadge'

interface Props {
	localCall: ILocalCallResponse
	language: 'ro' | 'ru' | 'en'
}

// Local calls have no approval status of their own (only their embedded
// projects do) — this card only ever shows the vote-window state.
export function VotableLocalCallCard({ localCall, language }: Props) {
	const t = useTranslations('Platform')

	return (
		<Link href={PLATFORM_PAGES.getLocalCallDetailPage(localCall._id) as Pathnames} className='w-full h-full'>
			<div
				className='cursor-pointer w-full h-full flex flex-col bg-white rounded-[1rem] overflow-hidden group border border-gray-500'
				style={{ boxShadow: '1px 1px 2px 0px rgba(0, 0, 0, 0.1)' }}
			>
				<div className='w-full relative h-[16.5rem] max-h-[16.5rem] shrink-0 bg-gray-400'>
					<div className='absolute top-[1rem] right-[1rem] z-10'>
						<PlatformVoteWindowBadge voteStart={localCall.voteStart} voteEnd={localCall.voteEnd} />
					</div>
					{localCall.imageUrl && (
						<Image
							src={localCall.imageUrl}
							alt='local call image'
							width={700}
							height={400}
							className='object-cover w-full h-full'
							draggable={false}
						/>
					)}
				</div>

				<div className='p-[1.5rem] flex flex-col justify-between h-full'>
					<div>
						<h2 className='line-clamp-2 font-bold text-green-700 text-[1.25rem] leading-[1.5rem]'>
							{localCall.name[language]}
						</h2>
						<div
							className='line-clamp-3 text-green-700 font-[400] text-[1rem] leading-[1.125rem] mt-[1rem]'
							dangerouslySetInnerHTML={{ __html: localCall.description[language] }}
						/>
					</div>

					<div className='flex items-center gap-[0.25rem] mt-[2rem] justify-between'>
						<Button className='w-fit font-[400] hover:bg-white h-[2.5rem] px-[1rem] bg-green-500 group-hover:bg-white text-white group-hover:text-green-700 transition-colors duration-300'>
							{t('seeProjects')}
						</Button>
						<ArrowIcon className='bg-green-500 group-hover:rotate-0 -rotate-45 group-hover:bg-white [&>svg>path]:fill-white group-hover:[&>svg>path]:fill-green-500 transition-[colors_transform] duration-300' />
					</div>
				</div>
			</div>
		</Link>
	)
}
