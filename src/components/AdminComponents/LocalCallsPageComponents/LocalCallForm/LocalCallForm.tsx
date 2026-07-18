'use client'

import { Control, FormState, UseFormRegister } from 'react-hook-form'

import { ImageToUpload } from '@/types/blog.types'
import { TypeLocalCallFormState } from '@/types/local-call.types'

import { Spinner } from '../../ui/Spinner/Spinner'

import { LocalCallDescriptionInput } from './LocalCallDescriptionInput'
import { LocalCallImageInput } from './LocalCallImageInput'
import { LocalCallNameInput } from './LocalCallNameInput'
import { LocalCallQuestionsInput } from './LocalCallQuestionsInput'
import { LocalCallVoteDatesInput } from './LocalCallVoteDatesInput'

interface Props {
	language: 'ro' | 'ru' | 'en'
	control: Control<TypeLocalCallFormState>
	formState: FormState<TypeLocalCallFormState>
	register: UseFormRegister<TypeLocalCallFormState>
	isPending: boolean
	setImagesToUpload: React.Dispatch<React.SetStateAction<ImageToUpload[]>>
	setImagesToDelete: React.Dispatch<React.SetStateAction<string[]>>
}

export function LocalCallForm({
	language,
	control,
	formState,
	register,
	isPending,
	setImagesToUpload,
	setImagesToDelete
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

			<LocalCallNameInput language={language} register={register} formState={formState} />
			<LocalCallDescriptionInput language={language} control={control} formState={formState} />
			<LocalCallImageInput
				language={language}
				control={control}
				formState={formState}
				addImageToUpload={addImageToUpload}
				addImageToDelete={addImageToDelete}
				removeImageFromUpload={removeImageFromUpload}
			/>
			<LocalCallQuestionsInput language={language} register={register} control={control} formState={formState} />
			<LocalCallVoteDatesInput language={language} register={register} formState={formState} />
		</div>
	)
}
