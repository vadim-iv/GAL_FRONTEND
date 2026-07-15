import { useTranslations } from 'next-intl'

import { GridModeIcon } from '../../Icons/GridModeIcon'
import { ListModeIcon } from '../../Icons/ListModeIcon'

interface Props {
	mode: 'list' | 'grid'
	setMode: (mode: 'list' | 'grid') => void
}

export function ViewModeToggle({ mode, setMode }: Props) {
	const t = useTranslations('Admin')

	return (
		<div className='flex justify-end w-full'>
			<div className='flex sidebar-req:w-[calc(100vw-20.625rem)] fullhd-threshold:w-[calc(var(--breakpoint-fullhd-threshold)-20.625rem)] w-full items-center justify-end gap-[1rem]'>
				<p className='font-bold text-[1rem] leading-[1.125rem] text-green-700'>{t('visualization_type')}</p>
				<div className='flex items-center gap-[0.25rem]'>
					<ListModeIcon isActive={mode === 'list'} onClick={() => setMode('list')} />
					<GridModeIcon isActive={mode === 'grid'} onClick={() => setMode('grid')} />
				</div>
			</div>
		</div>
	)
}
