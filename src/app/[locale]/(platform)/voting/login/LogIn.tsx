'use client'

import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { SubmitHandler, useForm } from 'react-hook-form'

import { Button } from '@/components/AdminComponents/ui/Button'
import { InputField } from '@/components/AdminComponents/ui/InputField'

import { IMemberAuthForm } from '@/types/platform-auth.types'

import { PLATFORM_PAGES } from '@/config/platform-pages.config'

import { useMemberLogin } from '@/hooks/platform/useMemberLogin'

import { Link } from '@/i18n/navigation'
import { Pathnames } from '@/i18n/routing'

import '@/app/[locale]/(platform)/platform.styles.css'

export function LogIn() {
	const { register, handleSubmit, reset } = useForm<IMemberAuthForm>({
		mode: 'onSubmit'
	})

	const t = useTranslations('Platform')

	const router = useRouter()

	const { login, isLoginPending, isError } = useMemberLogin()

	const onSubmit: SubmitHandler<IMemberAuthForm> = data => {
		login(data, {
			onSuccess: () => {
				reset()
				router.push(PLATFORM_PAGES.LOCAL_CALLS)
			}
		})
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

				<form className='w-full mt-[2rem] flex flex-col' onSubmit={handleSubmit(onSubmit)}>
					<InputField
						hasError={isError}
						placeholder={`${t('email')}*`}
						{...register('email', {
							required: 'Email is required'
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
						disabled={isLoginPending}
					>
						{isLoginPending ? <div className='login-loader'></div> : t('login')}
					</Button>

					<Link
						href={PLATFORM_PAGES.FORGOT_PASSWORD as Pathnames}
						className='mt-[1.5rem] text-center text-green-700 text-[0.875rem] hover:opacity-70 transition-opacity duration-300'
					>
						{t('forgotPassword')}
					</Link>
				</form>
			</div>
		</div>
	)
}
