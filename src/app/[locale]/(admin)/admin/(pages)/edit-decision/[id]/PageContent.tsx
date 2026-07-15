'use client'

import { useLocale, useTranslations } from 'next-intl'
import { useState } from 'react'
import { FieldErrors, useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { DecisionForm } from '@/components/AdminComponents/DecisionsPageComponents/DecisionForm/DecisionForm'
import { DecisionPageNav } from '@/components/AdminComponents/DecisionsPageComponents/DecisionPageNav'

import { ImageToUpload } from '@/types/blog.types'
import { TypeDecisionFormState } from '@/types/decision.types'

import { ADMIN_PAGES } from '@/config/admin-pages.config'

import { useDeleteDecision } from '@/hooks/decision/useDeleteDecision'
import { useDeleteDecisionFiles } from '@/hooks/decision/useDeleteDecisionFiles'
import { useInitialDecisionData } from '@/hooks/decision/useInitialDecisionData'
import { useUpdateDecision } from '@/hooks/decision/useUpdateDecision'
import { useUploadDecisionFiles } from '@/hooks/decision/useUploadDecisionFiles'

import { useRouter } from '@/i18n/navigation'
import { Pathnames } from '@/i18n/routing'

interface Props {
	decisionId: string
}

export function PageContent({ decisionId }: Props) {
	const router = useRouter()
	const locale = useLocale() as 'ro' | 'ru' | 'en'
	const [language, setLanguage] = useState<'ro' | 'ru' | 'en'>(locale)

	const [imagesToUpload, setImagesToUpload] = useState<ImageToUpload[]>([])
	const [imagesToDelete, setImagesToDelete] = useState<string[]>([])

	const { uploadFiles, isFilesUploadPending } = useUploadDecisionFiles()
	const { deleteFiles, isDeletePending } = useDeleteDecisionFiles()
	const { updateDecision, isUpdatePending } = useUpdateDecision(decisionId)
	const { deleteDecision, isDeletePending: isDecisionDeletePending } = useDeleteDecision()

	const { reset, register, handleSubmit, control, formState } = useForm<TypeDecisionFormState>({
		mode: 'onSubmit',
		reValidateMode: 'onChange'
	})

	const { isLoading } = useInitialDecisionData(decisionId, reset)

	const t = useTranslations('Admin.ToastMessages')

	const onSubmit = (data: TypeDecisionFormState) => {
		updateDecision(data, {
			onSuccess: () => {
				if (imagesToUpload.length > 0) {
					uploadFiles(imagesToUpload, {
						onSuccess: () => {
							setImagesToUpload([])
							if (imagesToDelete.length > 0) {
								deleteFiles(imagesToDelete, {
									onSuccess: () => setImagesToDelete([])
								})
							}
						}
					})
				} else if (imagesToDelete.length > 0) {
					deleteFiles(imagesToDelete, {
						onSuccess: () => setImagesToDelete([])
					})
				}
			}
		})
	}

	const handleDeleteDecision = () => {
		deleteDecision(decisionId, {
			onSuccess: () => {
				router.push(ADMIN_PAGES.DECISIONS as Pathnames)
			}
		})
	}

	const onInvalid = (errors: FieldErrors<TypeDecisionFormState>) => {
		if (Object.keys(errors).length === 0) return

		if (errors.questions?.root) {
			toast.error(t('decision_needs_at_least_one_question'))
			return
		}

		const hasOptionsError = Array.isArray(errors.questions) && errors.questions.some(question => question?.options)
		if (hasOptionsError) {
			toast.error(t('decision_question_needs_options'))
			return
		}

		toast.error(t('please_fill_in_all_required_fields_correctly'))
	}

	const isPending = isFilesUploadPending || isDeletePending || isUpdatePending || isDecisionDeletePending || isLoading

	return (
		<div className='flex justify-end w-full'>
			<form
				className='mt-[3rem] sidebar-req:w-[calc(100vw-20.625rem)] fullhd-threshold:w-[calc(var(--breakpoint-fullhd-threshold)-20.625rem)] w-full'
				onSubmit={handleSubmit(onSubmit, onInvalid)}
			>
				<DecisionPageNav
					onDeleteDecision={handleDeleteDecision}
					isPending={isPending}
					language={language}
					setLanguage={setLanguage}
				/>

				<DecisionForm
					isPending={isPending}
					formState={formState}
					control={control}
					register={register}
					language={language}
					setImagesToUpload={setImagesToUpload}
					setImagesToDelete={setImagesToDelete}
					isEditMode
				/>
			</form>
		</div>
	)
}
