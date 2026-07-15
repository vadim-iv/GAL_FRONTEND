interface Props extends React.HTMLAttributes<HTMLDivElement> {
	isActive?: boolean
}

export function ListModeIcon({ isActive, ...props }: Props) {
	return (
		<div
			className={`cursor-pointer flex items-center justify-center rounded-full transition-colors duration-300  ${isActive ? 'bg-green-600' : 'bg-gray-300'} size-[2.5rem]`}
			style={{ boxShadow: '1px 1px 2px 0px rgba(0, 0, 0, 0.1)' }}
			{...props}
		>
			<svg
				className='size-[1rem]'
				width='16'
				height='16'
				viewBox='0 0 16 16'
				fill='none'
				xmlns='http://www.w3.org/2000/svg'
			>
				<rect
					x='0'
					y='1'
					width='16'
					height='3.2'
					rx='0.8'
					fill={isActive ? '#FFFEFD' : '#325721'}
					className='transition-colors duration-300'
				/>
				<rect
					x='0'
					y='6.4'
					width='16'
					height='3.2'
					rx='0.8'
					fill={isActive ? '#FFFEFD' : '#325721'}
					className='transition-colors duration-300'
				/>
				<rect
					x='0'
					y='11.8'
					width='16'
					height='3.2'
					rx='0.8'
					fill={isActive ? '#FFFEFD' : '#325721'}
					className='transition-colors duration-300'
				/>
			</svg>
		</div>
	)
}
