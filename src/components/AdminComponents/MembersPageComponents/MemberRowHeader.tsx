import { ADMIN_MEMBERS_TRANSLATE } from '@/constants/admin-members-translate.data'

interface Props {
	language: 'ro' | 'ru' | 'en'
	showImage?: boolean
	readOnly?: boolean
}

export function MemberRowHeader({ language, showImage, readOnly }: Props) {
	return (
		<div className='flex items-center gap-[2rem] px-[1rem]'>
			{showImage && <div className='w-[3.5rem] shrink-0' />}

			<p className='w-[14rem] shrink-0 text-[0.875rem] font-bold text-green-700'>
				{ADMIN_MEMBERS_TRANSLATE.columnLabels.email[language]}
			</p>
			<p className='w-[10rem] shrink-0 text-[0.875rem] font-bold text-green-700'>
				{ADMIN_MEMBERS_TRANSLATE.columnLabels.name[language]}
			</p>
			<p className='w-[25rem] shrink-0 text-[0.875rem] font-bold text-green-700'>
				{ADMIN_MEMBERS_TRANSLATE.columnLabels.roles[language]}
			</p>
			<p className='flex-1 min-w-0 text-[0.875rem] font-bold text-green-700'>
				{ADMIN_MEMBERS_TRANSLATE.columnLabels.details[language]}
			</p>

			{!readOnly && <div className='w-[6.5rem] shrink-0' />}
		</div>
	)
}
