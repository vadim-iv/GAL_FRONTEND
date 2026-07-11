'use client'

import { ErrorMessage } from '@hookform/error-message'
import { useCallback } from 'react'
import { Control, FormState } from 'react-hook-form'

import { ADMIN_DOCUMENTS_TRANSLATE } from '@/constants/admin-documents-translate.data'

import { ImageToUpload } from '@/types/blog.types'
import { IFileToUpload, TypeDocumentsFormState } from '@/types/documents.types'

import { Tag } from '../ui/Tag/Tag'
import { Spinner } from '../ui/Spinner/Spinner'

import { DocumentsMainImageUpload } from './DocumentsMainImageUpload'
import { DocumentsSection } from './DocumentsSection'
import { DOCUMENT_GROUPS } from './documents.data'

interface Props {
	language: 'ro' | 'ru' | 'en'
	control: Control<TypeDocumentsFormState>
	formState: FormState<TypeDocumentsFormState>
	isPending: boolean

	setFilesToUpload: React.Dispatch<React.SetStateAction<IFileToUpload[]>>
	setFilesToDelete: React.Dispatch<React.SetStateAction<string[]>>

	setImagesToUpload: React.Dispatch<React.SetStateAction<ImageToUpload[]>>
	setImagesToDelete: React.Dispatch<React.SetStateAction<string[]>>
}

export function DocumentsForm({
	language,
	control,
	formState,
	isPending,
	setImagesToUpload,
	setImagesToDelete,
	setFilesToUpload,
	setFilesToDelete
}: Props) {
	const addFileToUpload = useCallback(
		(file: IFileToUpload) => {
			setFilesToUpload(prev => {
				if (!prev.find(f => f.uploadUrl === file.uploadUrl)) {
					return [...prev, file]
				}
				return prev
			})
		},
		[setFilesToUpload]
	)

	const addFileToDelete = useCallback(
		(fileUrl: string) => {
			setFilesToDelete(prev => {
				if (!prev.includes(fileUrl)) {
					return [...prev, fileUrl]
				}
				return prev
			})
		},
		[setFilesToDelete]
	)

	const removeFileFromUpload = useCallback(
		(uploadUrl: string) => {
			setFilesToUpload(prev => prev.filter(file => file.uploadUrl !== uploadUrl))
		},
		[setFilesToUpload]
	)

	const addImageToUpload = useCallback(
		(image: ImageToUpload) => {
			setImagesToUpload(prev => {
				if (!prev.find(img => img.uploadUrl === image.uploadUrl)) {
					return [...prev, image]
				}
				return prev
			})
		},
		[setImagesToUpload]
	)

	const addImageToDelete = useCallback(
		(imageUrl: string) => {
			setImagesToDelete(prev => {
				if (!prev.includes(imageUrl)) {
					return [...prev, imageUrl]
				}
				return prev
			})
		},
		[setImagesToDelete]
	)

	const removeImageFromUpload = useCallback(
		(uploadUrl: string) => {
			setImagesToUpload(prev => prev.filter(img => img.uploadUrl !== uploadUrl))
		},
		[setImagesToUpload]
	)

	return (
		<div className='mt-[3rem]'>
			{isPending && (
				<div className='fixed inset-0 flex justify-center items-center bg-black/10 z-100'>
					<Spinner />
				</div>
			)}

			<div className='flex gap-[0.5rem]'>
				{DOCUMENT_GROUPS.map((group, index) => (
					<Tag
						key={`documents-group-${index}`}
						text={group.text[language]}
						color={group.color}
					/>
				))}
			</div>

			<h1 className='text-[3rem] font-[700] leading-[3.25rem] text-green-700 mt-[1rem]'>
				{ADMIN_DOCUMENTS_TRANSLATE.pageTitle[language]}
			</h1>

			<DocumentsMainImageUpload
				language={language}
				control={control}
				addImageToUpload={addImageToUpload}
				addImageToDelete={addImageToDelete}
				removeImageFromUpload={removeImageFromUpload}
			/>

			<ErrorMessage
				errors={formState.errors}
				name='main_image'
				render={() => (
					<p className='mt-1 text-error text-sm'>
						{ADMIN_DOCUMENTS_TRANSLATE.mainImageInput[language].error}
					</p>
				)}
			/>
			<div className='mt-[16.875rem]'>
				{DOCUMENT_GROUPS.map((group, index) => (
					<DocumentsSection
						key={`documents-section-${index}`}
						name={group.name}
						title={group.text[language]}
						control={control}
						formState={formState}
						language={language}
						addFileToUpload={addFileToUpload}
						addFileToDelete={addFileToDelete}
						removeFileFromUpload={removeFileFromUpload}
					/>
				))}
			</div>
		</div>
	)
}
