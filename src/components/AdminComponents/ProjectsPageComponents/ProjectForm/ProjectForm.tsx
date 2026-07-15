'use client'

import { Control, FormState, UseFormRegister } from 'react-hook-form'

import { ImageToUpload } from '@/types/blog.types'
import { TypeProjectFormState } from '@/types/local-call.types'

import { Spinner } from '../../ui/Spinner/Spinner'

import { ProjectDescriptionInput } from './ProjectDescriptionInput'
import { ProjectImageInput } from './ProjectImageInput'
import { ProjectPdfInput } from './ProjectPdfInput'
import { ProjectStatusInput } from './ProjectStatusInput'
import { ProjectTitleInput } from './ProjectTitleInput'

interface Props {
	language: 'ro' | 'ru' | 'en'
	control: Control<TypeProjectFormState>
	formState: FormState<TypeProjectFormState>
	register: UseFormRegister<TypeProjectFormState>
	isPending: boolean
	setImagesToUpload: React.Dispatch<React.SetStateAction<ImageToUpload[]>>
	setImagesToDelete: React.Dispatch<React.SetStateAction<string[]>>
	setFilesToUpload: React.Dispatch<React.SetStateAction<{ file: File; uploadUrl: string }[]>>
	setFilesToDelete: React.Dispatch<React.SetStateAction<string[]>>
	// Status only makes sense once a project exists — new projects always start PENDING.
	isEditMode?: boolean
}

export function ProjectForm({
	language,
	control,
	formState,
	register,
	isPending,
	setImagesToUpload,
	setImagesToDelete,
	setFilesToUpload,
	setFilesToDelete,
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

	const addFileToUpload = (file: { file: File; uploadUrl: string }) => {
		setFilesToUpload(prev => (prev.find(f => f.uploadUrl === file.uploadUrl) ? prev : [...prev, file]))
	}

	const addFileToDelete = (fileUrl: string) => {
		setFilesToDelete(prev => (prev.includes(fileUrl) ? prev : [...prev, fileUrl]))
	}

	const removeFileFromUpload = (uploadUrl: string) => {
		setFilesToUpload(prev => prev.filter(f => f.uploadUrl !== uploadUrl))
	}

	return (
		<div className='mt-[3rem] flex flex-col gap-[1.5rem]'>
			{isPending && (
				<div className='fixed inset-0 flex justify-center items-center bg-black/10 z-100'>
					<Spinner />
				</div>
			)}

			{isEditMode && <ProjectStatusInput language={language} control={control} />}

			<ProjectTitleInput language={language} register={register} formState={formState} />
			<ProjectDescriptionInput language={language} register={register} control={control} formState={formState} />
			<ProjectPdfInput
				language={language}
				control={control}
				formState={formState}
				addFileToUpload={addFileToUpload}
				addFileToDelete={addFileToDelete}
				removeFileFromUpload={removeFileFromUpload}
			/>
			<ProjectImageInput
				language={language}
				control={control}
				formState={formState}
				addImageToUpload={addImageToUpload}
				addImageToDelete={addImageToDelete}
				removeImageFromUpload={removeImageFromUpload}
			/>
		</div>
	)
}
