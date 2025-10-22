import { useQuery } from '@tanstack/react-query'
import { AnimatePresence, motion, useAnimation } from 'framer-motion'
import { useTranslations } from 'next-intl'
import Head from 'next/head'
import React, { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

import AnimatedLink from '../CommonComponents/AnimatedLink'
import LinkWithArrow from '../CommonComponents/LinkWithArrow'
import Logo from '../CommonComponents/Logo'

import ArrowDown from './ArrowDown'
import LanguageSwitcher from './LanguageSwitcher'
import Search from './Search'
import { useScrollLock } from './useScrollLock'
import { Link } from '@/i18n/navigation'
import { documentsService } from '@/services/documents.service'
import { managementService } from '@/services/management.service'

interface Props {
	arrowColor?: string
}

const NavContent: React.FC<Props> = ({ arrowColor = '#FFFEFD' }) => {
	const controls = useAnimation()
	const [mounted, setMounted] = useState(false)
	const [realHovered, setRealHovered] = useState(false)
	const [hoveredMenu, setHoveredMenu] = useState<null | 'despre' | 'autentic'>(null)
	const [hoveredSubMenu, setHoveredSubMenu] = useState<
		| null
		| 'despre_noi'
		| 'conducerea_gal'
		| 'documente_oficiale'
		| 'produse_locale'
		| 'servicii_din_comunitate'
		| 'atractii_turistice'
		| 'oameni_si_valori'
	>(null)
	const closeTimer = useRef<NodeJS.Timeout | null>(null)
	const tNav = useTranslations('index.NavBar')
	const { lock, unlock } = useScrollLock()

	useEffect(() => {
		if (hoveredMenu) {
			lock()
			return unlock
		}
	}, [hoveredMenu, lock, unlock])

	useEffect(() => {
		setMounted(true)
		return () => {
			if (closeTimer.current) clearTimeout(closeTimer.current)
		}
	}, [])

	const handleMouseEnter = (menu: 'despre' | 'autentic') => {
		if (closeTimer.current) {
			clearTimeout(closeTimer.current)
			closeTimer.current = null
		}
		setHoveredMenu(menu)
		controls.start('hover')
	}

	const handleMouseLeave = () => {
		setRealHovered(false)
		closeTimer.current = setTimeout(() => {
			setHoveredMenu(null)
			setHoveredSubMenu(null)
			controls.start('initial')
		}, 800)
	}

	const closeMenu = () => {
		setHoveredMenu(null)
		setHoveredSubMenu(null)
		controls.start('initial')
	}

	const handleScrollToBottom = () => {
		window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' })
	}

	const boxVariants = {
		initial: { height: 0, transition: { duration: 1, ease: [0.23, 1, 0.32, 1] } },
		hover: { height: '420%', transition: { duration: 1, ease: [0.23, 1, 0.32, 1] } }
	}

	const textVariants = {
		initial: { color: arrowColor, transition: { duration: 0.4 } },
		hover: { color: '#11200B', transition: { duration: 0.4 } }
	}

	const lineVariants = {
		initial: { background: '#FFFEFD', transition: { duration: 0.4 } },
		hover: { background: '#BFBFBE', transition: { duration: 0.4 } }
	}

	const dropDownVariants = {
		initial: { opacity: 0, transition: { duration: 0.1 } },
		hover: {
			opacity: 1,
			transition: { duration: 0.5, staggerChildren: 0.15, when: 'beforeChildren' }
		}
	}

	const linkItemVariants = {
		initial: { opacity: 0, y: 10 },
		hover: { opacity: 1, y: 0, transition: { duration: 0.3 } }
	}

	const imageFadeVariants = {
		initial: { opacity: 0 },
		animate: { opacity: 1, transition: { duration: 0.5 } },
		exit: { opacity: 0, transition: { duration: 0.5 } }
	}

	const { data: mgmtResp } = useQuery({
		queryKey: ['management'],
		queryFn: () => managementService.getManagement(),
		staleTime: 300_000
	})

	const { data: docsResp } = useQuery({
		queryKey: ['documents'],
		queryFn: () => documentsService.getDocuments(),
		staleTime: 300_000
	})

	useEffect(() => {
		const urls = [mgmtResp?.data?.main_image, docsResp?.data?.main_image].filter(
			Boolean
		) as string[]

		const imgs = urls.map(src => {
			const img = new Image()
			;(img as any).fetchPriority = 'low'
			img.decoding = 'async'
			img.loading = 'eager'
			img.src = src
			return img
		})

		return () => {
			imgs.forEach(img => (img.src = ''))
		}
	}, [mgmtResp?.data?.main_image, docsResp?.data?.main_image])

	const imageBySubMenu: Record<NonNullable<typeof hoveredSubMenu>, { src: string; alt: string }> = {
		despre_noi: { src: '/news_image.png', alt: 'News image' },
		conducerea_gal: {
			src: mgmtResp?.data?.main_image ?? '/administration_image.png',
			alt: 'Administration image'
		},
		documente_oficiale: {
			src: docsResp?.data?.main_image ?? '/documents_image.png',
			alt: 'Documents image'
		},
		produse_locale: { src: '/localProducts_image.png', alt: 'Local products image' },
		servicii_din_comunitate: { src: '/services_image.png', alt: 'Community services image' },
		atractii_turistice: { src: '/touristAttractions_image.png', alt: 'Tourist attractions image' },
		oameni_si_valori: { src: '/peopleAndValue_image.png', alt: 'People and values image' }
	}

	return (
		<>
			<Head>
				<link
					rel='preload'
					as='image'
					href='/news_image.png'
				/>
				<link
					rel='preload'
					as='image'
					href='/administration_image.png'
				/>
				<link
					rel='preload'
					as='image'
					href='/documents_image.png'
				/>
				<link
					rel='preload'
					as='image'
					href='/localProducts_image.png'
				/>
				<link
					rel='preload'
					as='image'
					href='/services_image.png'
				/>
				<link
					rel='preload'
					as='image'
					href='/touristAttractions_image.png'
				/>
				<link
					rel='preload'
					as='image'
					href='/peopleAndValue_image.png'
				/>
			</Head>
			<motion.div
				variants={boxVariants}
				animate={hoveredMenu ? 'hover' : 'initial'}
				initial='initial'
				className='bg-sand-50 origin-top absolute -left-[100%] top-0 w-[400%] -z-10'
			/>

			{mounted &&
				createPortal(
					<motion.div
						variants={{
							initial: { opacity: 0, transition: { duration: 0.3 } },
							hover: { opacity: 1, transition: { delay: 0.3, duration: 0.5 } }
						}}
						animate={hoveredMenu ? 'hover' : 'initial'}
						initial='initial'
						className='fixed top-0 -left-[50%] z-10 h-screen w-[200%] bg-black/35 backdrop-blur-xs pointer-events-none'
					/>,
					document.body
				)}

			<AnimatePresence>
				{hoveredMenu && (
					<motion.div
						className='absolute left-0 top-[120%] grid h-[300%] w-full grid-cols-full'
						onMouseEnter={() => handleMouseEnter(hoveredMenu)}
						onMouseLeave={handleMouseLeave}
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
					>
						{hoveredMenu === 'despre' && (
							<motion.div
								variants={dropDownVariants}
								initial='initial'
								animate='hover'
								exit='initial'
								className='despregal col-start-3 col-span-3'
							>
								<motion.div variants={linkItemVariants}>
									<LinkWithArrow
										onClick={() => closeMenu()}
										onMouseEnter={() => {
											setHoveredSubMenu('despre_noi')
											setRealHovered(true)
										}}
										text={tNav('about.about_us')}
										href='/aboutUs'
										arrowProps='group-hover/link:rotate-0 group-hover/link:fill-sand-50 -rotate-45 fill-forest-900 w-3 h-3'
										customStyle='w-full flex items-center justify-between [&>div]:rounded-full [&>div:nth-child(2)]:p-2 [&>div:nth-child(2)]:group-hover/link:bg-forest-700 [&>div:nth-child(1)]:px-2 [&>div:nth-child(1)]:py-2.5'
									/>
									<div className='h-[1px] w-full bg-stone-400' />
								</motion.div>
								<motion.div variants={linkItemVariants}>
									<LinkWithArrow
										onClick={() => closeMenu()}
										onMouseEnter={() => {
											setHoveredSubMenu('conducerea_gal')
											setRealHovered(true)
										}}
										text={tNav('about.management')}
										href='/administration'
										arrowProps='group-hover/link:rotate-0 group-hover/link:fill-sand-50 -rotate-45 fill-forest-900 w-3 h-3'
										customStyle='w-full flex items-center justify-between [&>div]:rounded-full [&>div:nth-child(2)]:p-2 [&>div:nth-child(2)]:group-hover/link:bg-forest-700 [&>div:nth-child(1)]:px-2 [&>div:nth-child(1)]:py-2.5'
									/>
									<div className='h-[1px] w-full bg-stone-400' />
								</motion.div>
								<motion.div variants={linkItemVariants}>
									<LinkWithArrow
										onClick={() => closeMenu()}
										onMouseEnter={() => {
											setHoveredSubMenu('documente_oficiale')
											setRealHovered(true)
										}}
										text={tNav('about.documents')}
										href='/documents'
										arrowProps='group-hover/link:rotate-0 group-hover/link:fill-sand-50 -rotate-45 fill-forest-900 w-3 h-3'
										customStyle='w-full flex items-center justify-between [&>div]:rounded-full [&>div:nth-child(2)]:p-2 [&>div:nth-child(2)]:group-hover/link:bg-forest-700 [&>div:nth-child(1)]:px-2 [&>div:nth-child(1)]:py-2.5'
									/>
								</motion.div>
							</motion.div>
						)}

						{hoveredMenu === 'autentic' && (
							<motion.div
								variants={dropDownVariants}
								initial='initial'
								animate='hover'
								exit='initial'
								className='autenticlocal col-start-3 col-span-3'
							>
								<motion.div variants={linkItemVariants}>
									<LinkWithArrow
										onClick={() => closeMenu()}
										onMouseEnter={() => {
											setHoveredSubMenu('produse_locale')
											setRealHovered(true)
										}}
										text={tNav('authentic_local.local_products')}
										href='/authentic-local/local-products'
										arrowProps='group-hover/link:rotate-0 group-hover/link:fill-sand-50 -rotate-45 fill-forest-900 w-3 h-3'
										customStyle='w-full flex items-center justify-between [&>div]:rounded-full [&>div:nth-child(2)]:p-2 [&>div:nth-child(2)]:group-hover/link:bg-forest-700 [&>div:nth-child(1)]:px-2 [&>div:nth-child(1)]:py-2.5'
									/>
									<div className='h-[1px] w-full bg-stone-400' />
								</motion.div>
								<motion.div variants={linkItemVariants}>
									<LinkWithArrow
										onClick={() => closeMenu()}
										onMouseEnter={() => {
											setHoveredSubMenu('servicii_din_comunitate')
											setRealHovered(true)
										}}
										text={tNav('authentic_local.community_services')}
										href='/authentic-local/services'
										arrowProps='group-hover/link:rotate-0 group-hover/link:fill-sand-50 -rotate-45 fill-forest-900 w-3 h-3'
										customStyle='w-full flex items-center justify-between [&>div]:rounded-full [&>div:nth-child(2)]:p-2 [&>div:nth-child(2)]:group-hover/link:bg-forest-700 [&>div:nth-child(1)]:px-2 [&>div:nth-child(1)]:py-2.5'
									/>
									<div className='h-[1px] w-full bg-stone-400' />
								</motion.div>
								<motion.div variants={linkItemVariants}>
									<LinkWithArrow
										onClick={() => closeMenu()}
										onMouseEnter={() => {
											setHoveredSubMenu('atractii_turistice')
											setRealHovered(true)
										}}
										text={tNav('authentic_local.tourist_attractions')}
										href='/authentic-local/tourist-attractions'
										arrowProps='group-hover/link:rotate-0 group-hover/link:fill-sand-50 -rotate-45 fill-forest-900 w-3 h-3'
										customStyle='w-full flex items-center justify-between [&>div]:rounded-full [&>div:nth-child(2)]:p-2 [&>div:nth-child(2)]:group-hover/link:bg-forest-700 [&>div:nth-child(1)]:px-2 [&>div:nth-child(1)]:py-2.5'
									/>
									<div className='h-[1px] w-full bg-stone-400' />
								</motion.div>
								<motion.div variants={linkItemVariants}>
									<LinkWithArrow
										onClick={() => closeMenu()}
										onMouseEnter={() => {
											setHoveredSubMenu('oameni_si_valori')
											setRealHovered(true)
										}}
										text={tNav('authentic_local.people_and_values')}
										href='/authentic-local/people-and-values'
										arrowProps='group-hover/link:rotate-0 group-hover/link:fill-sand-50 -rotate-45 fill-forest-900 w-3 h-3'
										customStyle='w-full flex items-center justify-between [&>div]:rounded-full [&>div:nth-child(2)]:p-2 [&>div:nth-child(2)]:group-hover/link:bg-forest-700 [&>div:nth-child(1)]:px-2 [&>div:nth-child(1)]:py-2.5'
									/>
								</motion.div>
							</motion.div>
						)}

						<motion.div className='relative col-start-8 col-span-4 mb-6'>
							<AnimatePresence>
								{hoveredSubMenu && (
									<motion.img
										key={hoveredSubMenu}
										src={imageBySubMenu[hoveredSubMenu].src}
										alt={imageBySubMenu[hoveredSubMenu].alt}
										className='absolute inset-0 h-full w-full rounded-lg object-cover'
										variants={imageFadeVariants}
										initial='initial'
										animate={realHovered ? 'animate' : 'exit'}
										exit='exit'
									/>
								)}
							</AnimatePresence>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>

			<Link href='/'>
				<Logo color='#254119' />
			</Link>

			<motion.div
				variants={textVariants}
				initial='initial'
				animate={controls}
				className='xl:col-start-3 lg:col-start-2 col-start-3 col-span-7 xl:col-span-6 flex items-center gap-8'
			>
				<Link
					href='/'
					onClick={() => closeMenu()}
				>
					<AnimatedLink text={tNav('home')} />
				</Link>

				<motion.div
					onMouseEnter={() => handleMouseEnter('despre')}
					onMouseLeave={handleMouseLeave}
					className='flex cursor-pointer items-center gap-1'
				>
					<Link
						href='/aboutUs'
						onClick={() => closeMenu()}
					>
						<AnimatedLink text={tNav('about.about_btn')} />
					</Link>
					<ArrowDown
						arrowColor={
							hoveredMenu === 'despre' || hoveredMenu === 'autentic' ? '#11200B' : arrowColor
						}
						direction={hoveredMenu === 'despre' ? 'rotate-180' : ''}
					/>
				</motion.div>

				<Link
					href='/news'
					onClick={() => closeMenu()}
				>
					<AnimatedLink text={tNav('news')} />
				</Link>
				<Link
					href='/projects'
					onClick={() => closeMenu()}
				>
					<AnimatedLink text={tNav('projects')} />
				</Link>

				<motion.div
					onMouseEnter={() => handleMouseEnter('autentic')}
					onMouseLeave={handleMouseLeave}
					className='flex cursor-pointer items-center gap-1'
				>
					<Link
						href='/authentic-local'
						onClick={() => closeMenu()}
					>
						<AnimatedLink text={tNav('authentic_local.authentic_btn')} />
					</Link>
					<ArrowDown
						arrowColor={
							hoveredMenu === 'despre' || hoveredMenu === 'autentic' ? '#11200B' : arrowColor
						}
						direction={hoveredMenu === 'autentic' ? 'rotate-180' : ''}
					/>
				</motion.div>

				<button
					onClick={handleScrollToBottom}
					className='cursor-pointer'
				>
					<AnimatedLink text={tNav('contacts')} />
				</button>
			</motion.div>

			<div className='col-start-12 lg:col-start-9 2xl:col-start-10 col-span-4 2xl:col-span-3 flex items-center gap-6'>
				<LanguageSwitcher
					arrowColor={
						hoveredMenu === 'despre' || hoveredMenu === 'autentic' ? '#11200B' : arrowColor
					}
				/>
				<Search
					hoveredMenu={hoveredMenu}
					handleHoverEnd={handleMouseLeave}
				/>
				<LinkWithArrow
					text={tNav('resource_map')}
					href='/map'
					arrowProps='-rotate-45 fill-sand-50 group-hover/link:rotate-0'
					customStyle='lg:flex hidden w-full items-center gap-1 [&>div]:rounded-full [&>div:nth-child(1)]:px-4 [&>div:nth-child(1)]:py-2.5 [&>div]:bg-forest-800 [&>div]:text-sand-50 [&>div]:group-hover/link:bg-forest-700 [&>div:nth-child(2)]:p-3.5'
				/>
			</div>

			<motion.div
				variants={lineVariants}
				animate={hoveredMenu ? 'hover' : 'initial'}
				initial='initial'
				className='pointer-events-none absolute bottom-0 left-1/2 h-px w-screen -translate-x-1/2 bg-sand-50'
			/>
		</>
	)
}

export default NavContent
