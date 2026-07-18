'use client'

import { useLocale, useTranslations } from 'next-intl'
import { useState } from 'react'
import { toast } from 'sonner'

import { Button } from '@/components/AdminComponents/ui/Button'
import { StatusBadge } from '@/components/AdminComponents/ui/StatusBadge/StatusBadge'
import { VoteWindowBanner } from '@/components/PlatformComponents/VoteWindowBanner'

import { useCurrentMember } from '@/hooks/platform/useCurrentMember'
import { useGetLocalCallById } from '@/hooks/local-call/useGetLocalCallById'
import { useSubmitProjectVote } from '@/hooks/platform/useSubmitProjectVote'

import { answerMemberId, hasVotedOnProject } from '@/lib/vote-answers.utils'
import { getVoteWindowState } from '@/lib/vote-window.utils'

import { ScoreQuestionCard } from './ScoreQuestionCard'

interface Props {
	localCallId: string
	projectId: string
}

export function ProjectScoreForm({ localCallId, projectId }: Props) {
	const locale = useLocale() as 'ro' | 'ru' | 'en'
	const t = useTranslations('Platform')
	const { member } = useCurrentMember()

	const { localCall, isLoading } = useGetLocalCallById(localCallId)
	const { submitProjectVote, isSubmitPending } = useSubmitProjectVote(localCallId)

	const [scores, setScores] = useState<Record<string, number>>({})

	if (isLoading || !member) {
		return <p className='text-green-700 text-center mt-[3rem]'>{t('loading')}</p>
	}

	if (!localCall) {
		return <p className='text-green-700 text-center mt-[3rem]'>{t('dataLoadFailed')}</p>
	}

	const project = localCall.projects.find(p => p._id === projectId)

	if (!project) {
		return <p className='text-green-700 text-center mt-[3rem]'>{t('dataLoadFailed')}</p>
	}

	const voted = hasVotedOnProject(project.answers, member._id)
	const voteWindowState = getVoteWindowState(localCall.voteStart, localCall.voteEnd)
	const canVote = voteWindowState === 'active' && !voted

	const getSubmittedScore = (questionId: string) => {
		const answer = project.answers.find(a => a.questionId === questionId && answerMemberId(a.memberId) === member._id)
		return answer?.answer ?? null
	}

	const handleSubmit = () => {
		const answers = localCall.questions.map(question => ({
			questionId: question._id,
			answer: scores[question._id],
			memberId: member._id
		}))

		if (answers.some(a => a.answer === undefined || a.answer === null)) {
			toast.error(t('answerAllQuestions'))
			return
		}

		submitProjectVote({ localCallId, projectId, answers })
	}

	return (
		<div className='max-w-[48rem] mx-auto flex flex-col gap-[1.5rem]'>
			<div className='bg-white rounded-[1rem] border border-gray-500 p-[1.5rem] flex flex-col gap-[1rem]'>
				<div className='flex items-center gap-[0.75rem] flex-wrap'>
					<h1 className='font-bold text-green-700 text-[1.5rem]'>{project.title[locale]}</h1>
					<StatusBadge status={project.status} />
				</div>
				<div
					className='text-green-700 text-[1rem] leading-[1.5rem]'
					dangerouslySetInnerHTML={{ __html: project.description[locale] }}
				/>
				{project.pdfUrl && (
					<a
						href={project.pdfUrl}
						target='_blank'
						rel='noopener noreferrer'
						className='text-green-700 underline text-[0.875rem] w-fit'
					>
						{t('seeDocumentation')}
					</a>
				)}
				<VoteWindowBanner voteStart={localCall.voteStart} voteEnd={localCall.voteEnd} voted={voted} />
			</div>

			{localCall.questions.map(question => (
				<ScoreQuestionCard
					key={question._id}
					question={question.question[locale]}
					maxScore={question.maxScore}
					value={voted ? getSubmittedScore(question._id) : (scores[question._id] ?? null)}
					disabled={!canVote}
					onChange={value => setScores(prev => ({ ...prev, [question._id]: value }))}
				/>
			))}

			{canVote && (
				<Button
					type='button'
					onClick={handleSubmit}
					disabled={isSubmitPending}
					className='w-fit self-center px-[2rem]'
				>
					{isSubmitPending ? t('submitting') : t('submitVote')}
				</Button>
			)}
		</div>
	)
}
