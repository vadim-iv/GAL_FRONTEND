'use client'

import { useLocale, useTranslations } from 'next-intl'
import { useState } from 'react'
import { FieldErrors, useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { ProjectForm } from '@/components/AdminComponents/ProjectsPageComponents/ProjectForm/ProjectForm'
import { ProjectPageNav } from '@/components/AdminComponents/ProjectsPageComponents/ProjectPageNav'

import { ImageToUpload } from '@/types/blog.types'
import { TypeProjectFormState } from '@/types/local-call.types'

import { ADMIN_PAGES } from '@/config/admin-pages.config'

import { useAddProject } from '@/hooks/local-call/useAddProject'
import { useUploadLocalCallFiles } from '@/hooks/local-call/useUploadLocalCallFiles'

import { useRouter } from '@/i18n/navigation'
import { Pathnames } from '@/i18n/routing'

interface Props {
	localCallId: string
}

export function PageContent({ localCallId }: Props) {
	const router = useRouter()
	const locale = useLocale() as 'ro' | 'ru' | 'en'
	const [language, setLanguage] = useState<'ro' | 'ru' | 'en'>(locale)

	// The PDF and the cover image both just go through the same presigned-URL upload
	// flow, so one combined queue covers both fields.
	const [filesToUpload, setFilesToUpload] = useState<ImageToUpload[]>([])
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [filesToDelete, setFilesToDelete] = useState<string[]>([])

	const { uploadFiles, isFilesUploadPending } = useUploadLocalCallFiles()
	const { addProject, isCreatePending } = useAddProject(localCallId)

	const { register, handleSubmit, control, formState } = useForm<TypeProjectFormState>({
		mode: 'onSubmit',
		reValidateMode: 'onChange'
	})

	const onSubmit = (data: TypeProjectFormState) => {
		addProject(data, {
			onSuccess: () => {
				if (filesToUpload.length > 0) {
					uploadFiles(filesToUpload, {
						onSuccess: () => {
							setFilesToUpload([])
							router.push(ADMIN_PAGES.getLocalCallProjectsPage(localCallId) as Pathnames)
						}
					})
				} else {
					router.push(ADMIN_PAGES.getLocalCallProjectsPage(localCallId) as Pathnames)
				}
			}
		})
	}

	const t = useTranslations('Admin.ToastMessages')

	const onInvalid = (errors: FieldErrors<TypeProjectFormState>) => {
		if (Object.keys(errors).length > 0) {
			toast.error(t('please_fill_in_all_required_fields_correctly'))
		}
	}

	const isPending = isFilesUploadPending || isCreatePending

	return (
		<div className='flex justify-end w-full'>
			<form
				className='mt-[1.5rem] sidebar-req:w-[calc(100vw-20.625rem)] fullhd-threshold:w-[calc(var(--breakpoint-fullhd-threshold)-20.625rem)] w-full'
				onSubmit={handleSubmit(onSubmit, onInvalid)}
			>
				<ProjectPageNav isPending={isPending} language={language} setLanguage={setLanguage} isCreate />

				<ProjectForm
					isPending={isPending}
					formState={formState}
					control={control}
					register={register}
					language={language}
					setImagesToUpload={setFilesToUpload}
					setImagesToDelete={setFilesToDelete}
					setFilesToUpload={setFilesToUpload}
					setFilesToDelete={setFilesToDelete}
				/>
			</form>
		</div>
	)
}
