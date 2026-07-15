import { Select, SelectArrow, SelectItem, SelectItemCheck, SelectPopover, SelectProvider } from '@ariakit/react'

import { cn } from '@/lib/utils'

interface Props {
	options: { value: string; label: string }[]
	value: string
	onChange: (value: string) => void
	placeholder: string
	className?: string
	error?: boolean
	disabled?: boolean
}

export function SelectBoxBase({ options, value, onChange, placeholder, className, error, disabled }: Props) {
	const getLabelForValue = (selectedValue: string) => {
		const option = options.find(opt => opt.value === selectedValue)
		return option ? option.label : selectedValue
	}

	return (
		<SelectProvider value={value} setValue={onChange}>
			<Select
				disabled={disabled}
				className={cn(
					`flex justify-between cursor-pointer items-center font-roboto transition-colors duration-300 h-[3rem] w-full px-[1.5rem] outline-none border border-gray-500 rounded-[0.5rem] text-[1rem] leading-[1.125rem] text-green-700 [&>span>svg]:transition-transform [&>span>svg]:duration-300 aria-expanded:[&>span>svg]:rotate-180 placeholder:text-green-700 disabled:opacity-70 disabled:cursor-not-allowed ${error ? 'border-red-500 text-red-500 placeholder:text-red-500 animate-shake' : ''}`,
					className
				)}
			>
				{value === '' ? (
					<span
						className={`text-green-700 opacity-70 ${error ? 'border-red-500 text-red-500 placeholder:text-red-500 animate-shake' : ''}`}
					>
						{placeholder}
					</span>
				) : (
					<span className='text-green-700'>{getLabelForValue(value)}</span>
				)}
				<SelectArrow />
			</Select>
			<SelectPopover
				gutter={4}
				sameWidth
				className='bg-gray-300 z-10 border border-gray-500 rounded-[0.25rem] overflow-hidden scale-y-0 data-[enter]:scale-y-100 origin-top transition-all duration-300'
			>
				{options.map(option => (
					<SelectItem
						key={option.value}
						value={option.value}
						className='text-green-700 flex justify-between items-center data-[active-item]:bg-gray-400 rounded-[0.25rem] h-[3rem] px-[0.5rem] transition-colors duration-300 cursor-pointer'
					>
						{option.label}
						<SelectItemCheck />
					</SelectItem>
				))}
			</SelectPopover>
		</SelectProvider>
	)
}
