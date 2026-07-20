'use client'

import { useTranslations } from 'next-intl'
import { SubmitHandler, useForm } from 'react-hook-form'

import { Button } from '@/components/AdminComponents/ui/Button'
import { InputField } from '@/components/AdminComponents/ui/InputField'

import { IForgotPasswordForm } from '@/types/platform-auth.types'

import { PLATFORM_PAGES } from '@/config/platform-pages.config'

import { useForgotPassword } from '@/hooks/platform/useForgotPassword'

import { Link } from '@/i18n/navigation'
import { Pathnames } from '@/i18n/routing'

import '@/app/[locale]/(platform)/platform.styles.css'

export function ForgotPassword() {
	const { register, handleSubmit } = useForm<IForgotPasswordForm>({
		mode: 'onSubmit'
	})

	const t = useTranslations('Platform')

	const { forgotPassword, isForgotPasswordPending, isSuccess } = useForgotPassword()

	const onSubmit: SubmitHandler<IForgotPasswordForm> = data => {
		forgotPassword(data.email)
	}

	return (
		<div className='bg-green-600 w-screen h-screen flex items-center justify-center'>
			<div className='bg-white max-w-[29.125rem] w-full px-[4rem] pt-[2rem] pb-[3rem] rounded-[1rem] flex flex-col items-center'>
				<h1 className='text-green-700 text-[1.25rem] font-bold text-center'>{t('forgotPasswordTitle')}</h1>

				{isSuccess ? (
					<p className='mt-[1.5rem] text-center text-green-700 text-[1rem]'>
						{t('forgotPasswordSuccessMessage')}
					</p>
				) : (
					<form className='w-full mt-[2rem] flex flex-col' onSubmit={handleSubmit(onSubmit)}>
						<p className='text-center text-gray-600 text-[0.875rem] mb-[1.5rem]'>
							{t('forgotPasswordInstructions')}
						</p>
						<InputField
							type='email'
							placeholder={`${t('email')}*`}
							{...register('email', { required: 'Email is required' })}
						/>

						<Button
							type='submit'
							className='mt-[2rem] flex items-center justify-center'
							disabled={isForgotPasswordPending}
						>
							{isForgotPasswordPending ? <div className='login-loader'></div> : t('sendResetLink')}
						</Button>
					</form>
				)}

				<Link
					href={PLATFORM_PAGES.LOGIN as Pathnames}
					className='mt-[1.5rem] text-center text-green-700 text-[0.875rem] hover:opacity-70 transition-opacity duration-300'
				>
					{t('backToLogin')}
				</Link>
			</div>
		</div>
	)
}
