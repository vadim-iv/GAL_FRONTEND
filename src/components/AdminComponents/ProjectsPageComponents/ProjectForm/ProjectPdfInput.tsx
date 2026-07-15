'use client'

import { ErrorMessage } from '@hookform/error-message'
import { Control, FormState } from 'react-hook-form'

import { ADMIN_PROJECTS_TRANSLATE } from '@/constants/admin-projects-translate.data'
import { TypeProjectFormState } from '@/types/local-call.types'

import { ProjectPdfUpload } from '../ProjectPdfUpload'

interface Props {
	language: 'ro' | 'ru' | 'en'
	control: Control<TypeProjectFormState>
	formState: FormState<TypeProjectFormState>
	addFileToUpload: (file: { file: File; uploadUrl: string }) => void
	addFileToDelete: (fileUrl: string) => void
	removeFileFromUpload: (uploadUrl: string) => void
}

export function ProjectPdfInput({
	language,
	control,
	formState,
	addFileToUpload,
	addFileToDelete,
	removeFileFromUpload
}: Props) {
	return (
		<div className='flex flex-col gap-[0.5rem]'>
			<ProjectPdfUpload
				control={control}
				name='pdfUrl'
				rules={{ required: true }}
				language={language}
				label={ADMIN_PROJECTS_TRANSLATE.pdfInput[language].label}
				placeholderMain={ADMIN_PROJECTS_TRANSLATE.pdfInput[language].placeholder.main}
				placeholderSubtext={ADMIN_PROJECTS_TRANSLATE.pdfInput[language].placeholder.subtext}
				addFileToUpload={addFileToUpload}
				addFileToDelete={addFileToDelete}
				removeFileFromUpload={removeFileFromUpload}
			/>
			<ErrorMessage
				errors={formState.errors}
				name='pdfUrl'
				render={() => <p className='text-error text-sm'>{ADMIN_PROJECTS_TRANSLATE.pdfInput[language].error}</p>}
			/>
		</div>
	)
}
