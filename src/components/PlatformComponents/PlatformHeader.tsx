'use client'

import { useTranslations } from 'next-intl'

import Logo from '@/components/CommonComponents/Logo'
import { Button } from '@/components/AdminComponents/ui/Button'
import { LangSelectBox } from '@/components/AdminComponents/ui/SelectBox/LangSelectBox'

import { PLATFORM_PAGES } from '@/config/platform-pages.config'

import { useMemberLogout } from '@/hooks/platform/useMemberLogout'

import { useRouter } from '@/i18n/navigation'
import { Pathnames } from '@/i18n/routing'

import { PlatformTabSwitcher } from './PlatformTabSwitcher'

import '@/app/[locale]/(platform)/platform.styles.css'

export function PlatformHeader() {
	const router = useRouter()
	const t = useTranslations('Platform')
	const { logout, isLogoutPending } = useMemberLogout()

	const handleLogout = () => {
		logout(undefined, {
			onSuccess: () => {
				router.push(PLATFORM_PAGES.LOGIN as Pathnames)
			}
		})
	}

	return (
		<header className='w-full bg-white border-b border-gray-500 px-[1.5rem] py-[1rem]'>
			<div className='flex items-center justify-between flex-wrap gap-[1rem]'>
				<div className='flex items-center gap-[2rem] flex-wrap'>
					<Logo color='#254119' />
					<PlatformTabSwitcher />
				</div>

				<div className='flex items-center gap-[1rem]'>
					<LangSelectBox />
					<Button
						onClick={handleLogout}
						className='h-[2.5rem] relative w-fit flex items-center justify-center cursor-pointer px-[1rem] text-[1rem] font-[400]'
					>
						{isLogoutPending && (
							<div className='login-loader absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2' />
						)}
						<p className={isLogoutPending ? 'invisible' : 'visible'}>{t('logout')}</p>
					</Button>
				</div>
			</div>
		</header>
	)
}
