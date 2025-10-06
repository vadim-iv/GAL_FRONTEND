'use client'

import { useTranslations } from 'next-intl'
import Image from 'next/image'
import React from 'react'

import AnimatedLine from '../CommonComponents/AnimatedLine'
import AnimatedLink from '../CommonComponents/AnimatedLink'
import Logo from '../CommonComponents/Logo'

import ContactForm from './ContactForm'
import Socials from './Socials'
import { Link } from '@/i18n/navigation'

const partnerLogos = [
	{ src: '/programul_leader.png', alt: 'Programul LEADER', w: 262, h: 64 },
	{
		src: '/ministerul_agriculturii_si_industriei_alimentare_al_republicii_moldova.png',
		alt: 'Ministerul Agriculturii și Industriei Alimentare al Republicii Moldova',
		w: 202,
		h: 129
	},
	{ src: '/aipa.png', alt: 'AIPA', w: 200, h: 64 },
	{ src: '/eu4moldova.png', alt: 'EU4MOLDOVA', w: 127, h: 129 },
	{
		src: '/solidarity_fund_pl_in_moldova.png',
		alt: 'Solidarity Fund PL in Moldova',
		w: 152,
		h: 129
	}
]

const Footer = () => {
	const t = useTranslations('index.Footer')

	return (
		<footer
			id='footer'
			className='w-full flex flex-col py-8 bg-forest-600 text-sand-50
                 sm:fixed sm:h-screen bottom-0 -z-10'
		>
			<div className='grid grid-cols-full auto-rows-min w-full flex-none mb-2'>
				<AnimatedLine customStyles='sm:hidden my-12 col-span-full opacity-25' />

				<div className='col-span-full sm:col-span-5 flex flex-col'>
					<Logo color='#FFFEFD' />
					<h4 className='mt-6 sm:mt-8 sm:mb-0 mb-12 leading-4.5'>
						{t('useful_information.under_logo_text')}
					</h4>
				</div>

				<div className='flex flex-col gap-2 sm:col-start-1 col-span-full sm:col-span-3 sm:row-start-2 sm:mt-24'>
					<h4 className='mb-4 font-bold'>{t('useful_information.details_for_contact')}</h4>
					<p className='mb-4'>{t('useful_information.adress')}</p>
					<a href='tel:37362026342'>
						<AnimatedLink text='Tel: 062 026 342' />
					</a>
					<a
						href='mailto:info@galstejaruldacilor.md'
						className='mt-4'
					>
						<AnimatedLink text='Email: info@galstejaruldacilor.md' />
					</a>
				</div>

				<div className='flex flex-col gap-2 sm:col-start-4 col-span-full sm:col-span-2 sm:row-start-2 sm:mt-24'>
					<h4 className='mb-4 font-bold sm:mt-0 mt-6'>
						{t('useful_information.navigation_links')}
					</h4>
					<Link href='/'>
						<AnimatedLink text={t('useful_information.home_link')} />
					</Link>
					<Link href='/aboutUs'>
						<AnimatedLink text={t('useful_information.about_us_link')} />
					</Link>
					<Link href='/news'>
						<AnimatedLink text={t('useful_information.announcements_link')} />
					</Link>
					<Link href='/projects'>
						<AnimatedLink text={t('useful_information.projects_link')} />
					</Link>
					<Link href='/authentic-local'>
						<AnimatedLink text={t('useful_information.authentic_local')} />
					</Link>
				</div>

				<div className='sm:col-start-7 col-span-full sm:col-span-6 row-start-1 sm:row-end-4 relative grid sm:grid-cols-6 sm:gap-x-6'>
					<ContactForm />
				</div>
			</div>

			<div className='flex-1 min-h-0 flex flex-col w-full max-w-[390px] sm:max-w-[1512px] sm:px-7 px-4 mx-auto'>
				<div className='sm:hidden block col-span-full mt-6'>
					<Socials />
				</div>

				<AnimatedLine customStyles='opacity-25 col-span-full mt-12 sm:mt-auto mb-2' />

				<h4 className='sm:mb-0 mb-2 sm:px-0'>{t('useful_information.our_partners')}</h4>

				<div
					className='min-h-0 hidden sm:flex flex-wrap items-center justify-between
                     gap-4 sm:gap-6 px-4 sm:px-0'
				>
					{partnerLogos.map(({ src, alt, w, h }) => (
						<div
							key={src}
							className='flex-none flex justify-center items-center
               h-full max-h-[var(--h)] max-w-[var(--w)]'
							style={{ '--w': `${w}px`, '--h': `${h}px` } as React.CSSProperties}
						>
							<Image
								src={src}
								alt={alt}
								width={w}
								height={h}
								className='object-contain w-full h-full max-w-[var(--w)] max-h-[var(--h)]'
								sizes='(max-width:640px) 40vw, 12vw'
								quality={100}
								priority
							/>
						</div>
					))}
				</div>
				<div className='grid sm:hidden justify-between relative items-center [&>*]:cursor-pointer row-start-2 min-h-0 flex-1'>
					<Image
						src='/programul_leader.png'
						alt='Programul Leader'
						width={262}
						height={64}
						className='w-[148px] h-[36px] sm:w-[262px] sm:h-[64px] col-span-4'
						style={{ height: 'auto' }}
						quality={100}
					/>
					<Image
						src='/ministerul_agriculturii_si_industriei_alimentare_al_republicii_moldova.png'
						alt='Ministerul agriculturii și industriei alimentare al Republicii Moldova'
						width={202}
						height={129}
						className='w-[114px] h-[72px] sm:w-[202px] sm:h-[129px] col-span-4 col-start-5'
						style={{ height: 'auto' }}
						quality={100}
					/>
					<Image
						src='/aipa.png'
						alt='Aipa'
						width={200}
						height={64}
						className='w-[112px] h-[36px] sm:w-[200px] sm:h-[64px] col-span-4'
						style={{ height: 'auto' }}
						quality={100}
					/>
					<Image
						src='/eu4moldova.png'
						alt='EU4MOLDOVA'
						width={127}
						height={129}
						className='w-[72px] h-[72px] sm:w-[127px] sm:h-[129px] col-span-4 col-start-5 my-4 sm:my-0'
						style={{ height: 'auto' }}
						quality={100}
					/>
					<Image
						src='/solidarity_fund_pl_in_moldova.png'
						alt='Solidarity Fund PL in Moldova'
						width={152}
						height={129}
						className='w-[82px] h-[72px] sm:w-[152px] sm:h-[129px] col-span-4'
						style={{ height: 'auto' }}
						quality={100}
					/>
				</div>
			</div>

			<div
				className='flex-none mt-12 sm:mt-[4vh] flex flex-col sm:flex-row
                   items-center sm:items-baseline justify-between w-full max-w-[390px] sm:max-w-[1512px] sm:px-7 px-4 mx-auto'
			>
				<h4 className='text-center w-full sm:w-fit sm:text-left'>
					{t('useful_information.copyright')}
				</h4>

				<div className='hidden sm:block'>
					<Socials />
				</div>

				<div
					className='flex flex-col sm:flex-row gap-2 sm:gap-8 items-center
                        mt-2 sm:mt-0 mb-12 sm:mb-0'
				>
					<Link href='/terms-and-conditions'>{t('useful_information.terms_and_conditions')}</Link>
					<Link
						href='/'
						className='flex gap-1 items-center group'
					>
						Site by Studio Modvis
						<svg
							width='10'
							height='10'
							className='group-hover:animate-spin transition ease-in'
							style={{ animationTimingFunction: 'ease-in-out', animationDuration: '0.7s' }}
							viewBox='0 0 10 10'
							fill='none'
							xmlns='http://www.w3.org/2000/svg'
						>
							<path
								d='M10 4.99968C10 7.76126 7.76203 10 4.99998 10C2.23797 10 0 7.76189 0 4.99968C0 4.66771 0.0333576 4.34457 0.0950909 4.03151C2.55162 4.93293 4.97292 2.56128 4.10303 0.0800076C4.3928 0.0302512 4.69323 0 4.99935 0C7.76076 0 9.99936 2.24002 9.99936 5.00032L10 4.99968Z'
								fill='#FAFAFA'
							/>
						</svg>
					</Link>
				</div>
			</div>
		</footer>
	)
}

export default Footer
