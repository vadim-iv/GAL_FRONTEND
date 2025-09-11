'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'

interface ParalaxImageProps {
	source?: string
	altText: string
	heightClass?: string
}

const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect

function useIsMobile(breakpoint = 640) {
	const [isMobile, setIsMobile] = useState(() =>
		typeof window !== 'undefined' ? window.innerWidth < breakpoint : false
	)

	useIsomorphicLayoutEffect(() => {
		const check = () => setIsMobile(window.innerWidth < breakpoint)
		check()
		window.addEventListener('resize', check)
		return () => window.removeEventListener('resize', check)
	}, [breakpoint])

	return isMobile
}

const ParalaxImage: React.FC<ParalaxImageProps> = ({
	source,
	altText,
	// heightClass = 'h-[640px]'
}) => {
	const ref = useRef<HTMLDivElement>(null)
	const [ready, setReady] = useState(false)

	const { scrollYProgress } = useScroll({
		target: ref,
		offset: ['start end', 'end start']
	})

	useEffect(() => {
		const unsub = scrollYProgress.on('change', () => setReady(true))
		return () => unsub()
	}, [scrollYProgress])

	const isMobile = useIsMobile()
	const base = useTransform(scrollYProgress, [0, 1], [-10, 10])
	const multiplier = isMobile ? 1.1 : 1
	const y = useTransform(base, v => `${v * multiplier}%`)

	return (
		<div
			ref={ref}
			className={`relative w-full overflow-hidden rounded-2xl h-full`}
		>
			<motion.img
				src={source}
				alt={altText}
				draggable={false}
				className='absolute w-full h-[120%] object-cover -top-[10%]'
				style={{ y, willChange: 'transform', visibility: ready ? 'visible' : 'hidden' }}
				initial={false}
			/>
		</div>
	)
}

export default ParalaxImage
