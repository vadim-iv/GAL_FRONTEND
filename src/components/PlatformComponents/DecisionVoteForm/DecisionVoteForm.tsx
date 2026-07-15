'use client'

import { useLocale, useTranslations } from 'next-intl'
import { useState } from 'react'
import { toast } from 'sonner'

import { Button } from '@/components/AdminComponents/ui/Button'
import { DecisionStatusBadge } from '@/components/AdminComponents/ui/DecisionStatusBadge/DecisionStatusBadge'
import { VoteWindowBanner } from '@/components/PlatformComponents/VoteWindowBanner'

import { useGetDecisionById } from '@/hooks/decision/useGetDecisionById'
import { useCurrentMember } from '@/hooks/platform/useCurrentMember'
import { useSubmitDecisionVote } from '@/hooks/platform/useSubmitDecisionVote'

import { hasVotedOnDecision } from '@/lib/vote-answers.utils'
import { getVoteWindowState } from '@/lib/vote-window.utils'

import { DecisionQuestionCard } from './DecisionQuestionCard'

interface Props {
	decisionId: string
}

export function DecisionVoteForm({ decisionId }: Props) {
	const locale = useLocale() as 'ro' | 'ru' | 'en'
	const t = useTranslations('Platform')
	const { member } = useCurrentMember()

	const { decision, isLoading } = useGetDecisionById(decisionId)
	const { submitDecisionVote, isSubmitPending } = useSubmitDecisionVote(decisionId)

	const [answers, setAnswers] = useState<Record<string, string>>({})

	if (isLoading || !member) {
		return <p className='text-green-700 text-center mt-[3rem]'>{t('loading')}</p>
	}

	if (!decision) {
		return <p className='text-green-700 text-center mt-[3rem]'>{t('dataLoadFailed')}</p>
	}

	const voted = hasVotedOnDecision(decision.questions, member._id)
	const voteWindowState = getVoteWindowState(decision.voteStart, decision.voteEnd)
	const canVote = voteWindowState === 'active' && !voted

	const getSubmittedAnswer = (questionId: string) => {
		const question = decision.questions.find(q => q._id === questionId)
		const answer = question?.answers.find(a => {
			const memberId = typeof a.memberId === 'string' ? a.memberId : a.memberId._id
			return memberId === member._id
		})
		return answer?.value ?? ''
	}

	const handleSubmit = () => {
		const payloadAnswers = decision.questions.map(question => ({
			questionId: question._id,
			value: answers[question._id],
			memberId: member._id
		}))

		if (payloadAnswers.some(a => !a.value || a.value.trim().length === 0)) {
			toast.error(t('answerAllQuestions'))
			return
		}

		submitDecisionVote({ decisionId, answers: payloadAnswers })
	}

	return (
		<div className='max-w-[48rem] mx-auto flex flex-col gap-[1.5rem]'>
			<div className='bg-white rounded-[1rem] border border-gray-500 p-[1.5rem] flex flex-col gap-[1rem]'>
				<div className='flex items-center gap-[0.75rem] flex-wrap'>
					<h1 className='font-bold text-green-700 text-[1.5rem]'>{decision.title[locale]}</h1>
					<DecisionStatusBadge status={decision.status} />
				</div>
				<div
					className='text-green-700 text-[1rem] leading-[1.5rem]'
					dangerouslySetInnerHTML={{ __html: decision.description[locale] }}
				/>
				<VoteWindowBanner voteStart={decision.voteStart} voteEnd={decision.voteEnd} />
			</div>

			{voted && <p className='text-green-700 text-[0.875rem] text-center'>{t('alreadyVotedMessage')}</p>}

			{decision.questions.map(question => (
				<DecisionQuestionCard
					key={question._id}
					questionId={question._id}
					question={question.question[locale]}
					type={question.type}
					options={question.options}
					language={locale}
					value={voted ? getSubmittedAnswer(question._id) : (answers[question._id] ?? '')}
					disabled={!canVote}
					onChange={value => setAnswers(prev => ({ ...prev, [question._id]: value }))}
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
