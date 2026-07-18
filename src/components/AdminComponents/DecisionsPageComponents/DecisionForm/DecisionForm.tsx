'use client'

import { Control, FormState, UseFormRegister } from 'react-hook-form'

import { ImageToUpload } from '@/types/blog.types'
import { TypeDecisionFormState } from '@/types/decision.types'

import { Spinner } from '../../ui/Spinner/Spinner'

import { DecisionDescriptionInput } from './DecisionDescriptionInput'
import { DecisionImageInput } from './DecisionImageInput'
import { DecisionQuestionsInput } from './DecisionQuestionsInput'
import { DecisionStatusInput } from './DecisionStatusInput'
import { DecisionTitleInput } from './DecisionTitleInput'
import { DecisionVoteDatesInput } from './DecisionVoteDatesInput'

interface Props {
	language: 'ro' | 'ru' | 'en'
	control: Control<TypeDecisionFormState>
	formState: FormState<TypeDecisionFormState>
	register: UseFormRegister<TypeDecisionFormState>
	isPending: boolean
	setImagesToUpload: React.Dispatch<React.SetStateAction<ImageToUpload[]>>
	setImagesToDelete: React.Dispatch<React.SetStateAction<string[]>>
	// Status only makes sense once a decision exists — new decisions always start PENDING.
	isEditMode?: boolean
}

export function DecisionForm({
	language,
	control,
	formState,
	register,
	isPending,
	setImagesToUpload,
	setImagesToDelete,
	isEditMode
}: Props) {
	const addImageToUpload = (image: ImageToUpload) => {
		setImagesToUpload(prev => (prev.find(img => img.uploadUrl === image.uploadUrl) ? prev : [...prev, image]))
	}

	const addImageToDelete = (imageUrl: string) => {
		setImagesToDelete(prev => (prev.includes(imageUrl) ? prev : [...prev, imageUrl]))
	}

	const removeImageFromUpload = (uploadUrl: string) => {
		setImagesToUpload(prev => prev.filter(img => img.uploadUrl !== uploadUrl))
	}

	return (
		<div className='mt-[3rem] flex flex-col gap-[1.5rem]'>
			{isPending && (
				<div className='fixed inset-0 flex justify-center items-center bg-black/10 z-100'>
					<Spinner />
				</div>
			)}

			{isEditMode && <DecisionStatusInput language={language} control={control} />}

			<DecisionTitleInput language={language} register={register} formState={formState} />
			<DecisionDescriptionInput language={language} control={control} formState={formState} />
			<DecisionImageInput
				language={language}
				control={control}
				formState={formState}
				addImageToUpload={addImageToUpload}
				addImageToDelete={addImageToDelete}
				removeImageFromUpload={removeImageFromUpload}
			/>
			<DecisionQuestionsInput language={language} register={register} control={control} formState={formState} />
			<DecisionVoteDatesInput language={language} register={register} formState={formState} />
		</div>
	)
}
