import { AnimatePresence, motion } from 'motion/react'

interface Props {
	numberOfSkeletons?: number
}

export function SkeletonList({ numberOfSkeletons }: Props) {
	return (
		<div className='w-full mt-[1.5rem] flex justify-end'>
			<AnimatePresence mode='wait' initial={false}>
				<motion.div
					key='list'
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={{ duration: 0.5, ease: 'easeInOut' }}
					className='w-full sidebar-req:w-[calc(100vw-20.625rem)] fullhd-threshold:w-[calc(var(--breakpoint-fullhd-threshold)-20.625rem)] flex flex-col gap-[1rem]'
				>
					{Array.from({ length: numberOfSkeletons ?? 8 }).map((_, index) => (
						<div key={index} className='w-full min-h-22 bg-gray-400 animate-pulse rounded-[1rem]' />
					))}
				</motion.div>
			</AnimatePresence>
		</div>
	)
}
