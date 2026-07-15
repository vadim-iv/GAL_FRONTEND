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

import { useDeleteLocalCallFiles } from '@/hooks/local-call/useDeleteLocalCallFiles'
import { useDeleteProject } from '@/hooks/local-call/useDeleteProject'
import { useInitialProjectData } from '@/hooks/local-call/useInitialProjectData'
import { useUpdateProject } from '@/hooks/local-call/useUpdateProject'
import { useUploadLocalCallFiles } from '@/hooks/local-call/useUploadLocalCallFiles'

import { useRouter } from '@/i18n/navigation'
import { Pathnames } from '@/i18n/routing'

interface Props {
	localCallId: string
	projectId: string
}

export function PageContent({ localCallId, projectId }: Props) {
	const router = useRouter()
	const locale = useLocale() as 'ro' | 'ru' | 'en'
	const [language, setLanguage] = useState<'ro' | 'ru' | 'en'>(locale)

	const [filesToUpload, setFilesToUpload] = useState<ImageToUpload[]>([])
	const [filesToDelete, setFilesToDelete] = useState<string[]>([])

	const { uploadFiles, isFilesUploadPending } = useUploadLocalCallFiles()
	const { deleteFiles, isDeletePending } = useDeleteLocalCallFiles()
	const { updateProject, isUpdatePending } = useUpdateProject(localCallId, projectId)
	const { deleteProject, isDeletePending: isProjectDeletePending } = useDeleteProject(localCallId)

	const { reset, register, handleSubmit, control, formState } = useForm<TypeProjectFormState>({
		mode: 'onSubmit',
		reValidateMode: 'onChange'
	})

	const { isLoading } = useInitialProjectData(localCallId, projectId, reset)

	const onSubmit = (data: TypeProjectFormState) => {
		updateProject(data, {
			onSuccess: () => {
				if (filesToUpload.length > 0) {
					uploadFiles(filesToUpload, {
						onSuccess: () => {
							setFilesToUpload([])
							if (filesToDelete.length > 0) {
								deleteFiles(filesToDelete, { onSuccess: () => setFilesToDelete([]) })
							}
						}
					})
				} else if (filesToDelete.length > 0) {
					deleteFiles(filesToDelete, { onSuccess: () => setFilesToDelete([]) })
				}
			}
		})
	}

	const handleDeleteProject = () => {
		deleteProject(projectId, {
			onSuccess: () => {
				router.push(ADMIN_PAGES.getLocalCallProjectsPage(localCallId) as Pathnames)
			}
		})
	}

	const t = useTranslations('Admin.ToastMessages')

	const onInvalid = (errors: FieldErrors<TypeProjectFormState>) => {
		if (Object.keys(errors).length > 0) {
			toast.error(t('please_fill_in_all_required_fields_correctly'))
		}
	}

	const isPending =
		isFilesUploadPending || isDeletePending || isUpdatePending || isProjectDeletePending || isLoading

	return (
		<div className='flex justify-end w-full'>
			<form
				className='mt-[3rem] sidebar-req:w-[calc(100vw-20.625rem)] fullhd-threshold:w-[calc(var(--breakpoint-fullhd-threshold)-20.625rem)] w-full'
				onSubmit={handleSubmit(onSubmit, onInvalid)}
			>
				<ProjectPageNav
					onDeleteProject={handleDeleteProject}
					isPending={isPending}
					language={language}
					setLanguage={setLanguage}
				/>

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
					isEditMode
				/>
			</form>
		</div>
	)
}
