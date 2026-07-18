'use client'

import { useTranslations } from 'next-intl'
import Image from 'next/image'

import { IDecisionResponse } from '@/types/decision.types'

import { PLATFORM_PAGES } from '@/config/platform-pages.config'

import { ArrowIcon } from '@/components/AdminComponents/Icons/ArrowIcon'
import { Button } from '@/components/AdminComponents/ui/Button'
import { DecisionStatusBadge } from '@/components/AdminComponents/ui/DecisionStatusBadge/DecisionStatusBadge'

import { useCurrentMember } from '@/hooks/platform/useCurrentMember'

import { hasVotedOnDecision } from '@/lib/vote-answers.utils'

import { Link } from '@/i18n/navigation'
import { Pathnames } from '@/i18n/routing'

import { ImageFallback } from './ImageFallback'
import { PlatformVoteWindowBadge } from './PlatformVoteWindowBadge'
import { VotedBadge } from './VotedBadge'

interface Props {
	decision: IDecisionResponse
	language: 'ro' | 'ru' | 'en'
}

export function VotableDecisionCard({ decision, language }: Props) {
	const t = useTranslations('Platform')
	const { member } = useCurrentMember()

	const voted = member ? hasVotedOnDecision(decision.questions, member._id) : false

	return (
		<Link href={PLATFORM_PAGES.getDecisionVotePage(decision._id) as Pathnames} className='w-full h-full'>
			<div
				className='cursor-pointer w-full h-full flex flex-col bg-white rounded-[1rem] overflow-hidden group border border-gray-500'
				style={{ boxShadow: '1px 1px 2px 0px rgba(0, 0, 0, 0.1)' }}
			>
				<div className='w-full relative h-[16.5rem] max-h-[16.5rem] shrink-0 bg-gray-400'>
					<div className='absolute top-[1rem] left-[1rem] z-10 flex flex-col gap-[0.5rem]'>
						<DecisionStatusBadge status={decision.status} />
						{voted && <VotedBadge />}
					</div>
					<div className='absolute top-[1rem] right-[1rem] z-10'>
						<PlatformVoteWindowBadge voteStart={decision.voteStart} voteEnd={decision.voteEnd} />
					</div>
					{decision.imageUrl ? (
						<Image
							src={decision.imageUrl}
							alt='decision image'
							width={700}
							height={400}
							className='object-cover w-full h-full'
							draggable={false}
						/>
					) : (
						<ImageFallback />
					)}
				</div>

				<div className='p-[1.5rem] flex flex-col justify-between h-full'>
					<div>
						<h2 className='line-clamp-2 font-bold text-green-700 text-[1.25rem] leading-[1.5rem]'>
							{decision.title[language]}
						</h2>
						<div
							className='line-clamp-3 text-green-700 font-[400] text-[1rem] leading-[1.125rem] mt-[1rem]'
							dangerouslySetInnerHTML={{ __html: decision.description[language] }}
						/>
					</div>

					<div className='flex items-center gap-[0.25rem] mt-[2rem] justify-between'>
						<Button className='w-fit font-[400] hover:bg-white h-[2.5rem] px-[1rem] bg-green-500 group-hover:bg-white text-white group-hover:text-green-700 transition-colors duration-300'>
							{voted ? t('viewYourVote') : t('vote')}
						</Button>
						<ArrowIcon className='bg-green-500 group-hover:rotate-0 -rotate-45 group-hover:bg-white [&>svg>path]:fill-white group-hover:[&>svg>path]:fill-green-500 transition-[colors_transform] duration-300' />
					</div>
				</div>
			</div>
		</Link>
	)
}
