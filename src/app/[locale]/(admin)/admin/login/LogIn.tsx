'use client'

import { useMutation } from '@tanstack/react-query'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { Button } from '@/components/AdminComponents/ui/Button'
import { InputField } from '@/components/AdminComponents/ui/InputField'

import { IAuthForm } from '@/types/auth.types'

import { ADMIN_PAGES } from '@/config/admin-pages.config'

import { authService } from '@/services/auth.service'

import '@/app/[locale]/(admin)/admin.styles.css'

export function LogIn() {
	const { register, handleSubmit, reset } = useForm<IAuthForm>({
		mode: 'onSubmit'
	})

	const t = useTranslations('Admin')
	const toast_t = useTranslations('Admin.ToastMessages')

	const router = useRouter()

	const { mutate, isError, isPending } = useMutation({
		mutationKey: ['login'],
		mutationFn: (data: IAuthForm) => authService.main('login', data),
		onSuccess: () => {
			toast.success(toast_t('loginSuccess'))
			reset()
			router.push(ADMIN_PAGES.NEWS)
		},
		onError: () => {
			toast.error(toast_t('loginError'))
		}
	})

	const onSubmit: SubmitHandler<IAuthForm> = data => {
		mutate(data)
	}

	return (
		<div className='bg-green-600 w-screen h-screen flex items-center justify-center'>
			<div className='bg-white max-w-[29.125rem] w-full px-[4rem] pt-[2rem] pb-[3rem] rounded-[1rem] flex flex-col items-center'>
				<Image
					src='/admin_assets/logo-gal-green.svg'
					alt='Logo'
					width={64}
					height={64}
					className='size-[4rem]'
				/>

				<p className='mt-[0.75rem] text-green-700 text-[0.875rem] font-[500]'>{t('loginSubtitle')}</p>

				<form
					className='w-full mt-[1rem] flex flex-col'
					onSubmit={handleSubmit(onSubmit)}
				>
					<InputField
						hasError={isError}
						placeholder={`${t('username')}*`}
						{...register('username', {
							required: 'Username is required'
						})}
					/>
					<InputField
						hasError={isError}
						type='password'
						placeholder={`${t('password')}*`}
						className='mt-[1rem]'
						{...register('password', {
							required: 'Password is required'
						})}
					/>

					<Button
						type='submit'
						className='mt-[2rem] flex items-center justify-center'
						disabled={isPending}
					>
						{isPending ? <div className='login-loader'></div> : `${t('login')}`}
					</Button>
				</form>
			</div>
		</div>
	)
}
