'use client'

import { useTranslations } from 'next-intl'
import { useSearchParams } from 'next/navigation'

import { Button } from '@/components/AdminComponents/ui/Button'

import { PLATFORM_PAGES } from '@/config/platform-pages.config'

import { useConfirmPasswordReset } from '@/hooks/platform/useConfirmPasswordReset'

import { Link } from '@/i18n/navigation'
import { Pathnames } from '@/i18n/routing'

import '@/app/[locale]/(platform)/platform.styles.css'

export function ResetPassword() {
	const t = useTranslations('Platform')
	const searchParams = useSearchParams()
	const token = searchParams.get('token') || ''

	const { confirmPasswordReset, isConfirmPending, isSuccess, isError, errorMessage } =
		useConfirmPasswordReset()

	return (
		<div className='bg-green-600 w-screen h-screen flex items-center justify-center'>
			<div className='bg-white max-w-[29.125rem] w-full px-[4rem] pt-[2rem] pb-[3rem] rounded-[1rem] flex flex-col items-center'>
				<h1 className='text-green-700 text-[1.25rem] font-bold text-center'>{t('resetPasswordTitle')}</h1>

				{!token ? (
					<p className='mt-[1.5rem] text-center text-error text-[1rem]'>{t('resetPasswordInvalidLink')}</p>
				) : isSuccess ? (
					<p className='mt-[1.5rem] text-center text-green-700 text-[1rem]'>
						{t('resetPasswordSuccessMessage')}
					</p>
				) : (
					<>
						<p className='mt-[1.5rem] text-center text-gray-600 text-[0.875rem]'>
							{t('resetPasswordInstructions')}
						</p>
						{isError && <p className='mt-[1rem] text-center text-error text-[0.875rem]'>{errorMessage}</p>}
						<Button
							type='button'
							className='mt-[2rem] flex items-center justify-center'
							disabled={isConfirmPending}
							onClick={() => confirmPasswordReset(token)}
						>
							{isConfirmPending ? <div className='login-loader'></div> : t('confirmResetPassword')}
						</Button>
					</>
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
