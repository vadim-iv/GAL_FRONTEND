import { IMultiLangText } from '@/types/shared/text.types'

import { ADMIN_PAGES } from '@/config/admin-pages.config'

export interface IMultiLanguageText {
	ro: string
	ru: string
	en: string
}

export interface ISidebarItem {
	title: IMultiLanguageText
	link: string
}

export interface IAdminSidebarSubsection {
	title: IMultiLangText
	items: ISidebarItem[]
}

export const ADMIN_SIDEBAR_ITEMS: IAdminSidebarSubsection[] = [
	{
		title: {
			ro: 'Activități',
			ru: 'Деятельность',
			en: 'Activities'
		},
		items: [
			{
				title: {
					ro: 'Noutăți',
					ru: 'Новости',
					en: 'News'
				},
				link: ADMIN_PAGES.NEWS
			},
			{
				title: {
					ro: 'Proiecte',
					ru: 'Проекты',
					en: 'Projects'
				},
				link: ADMIN_PAGES.PROJECTS
			}
		]
	},
	{
		title: {
			ro: 'Despre GAL',
			ru: 'О GAL',
			en: 'About GAL'
		},
		items: [
			{
				title: {
					ro: 'Conducerea GAL',
					ru: 'Руководство GAL',
					en: 'GAL Management'
				},
				link: ADMIN_PAGES.ADMINISTRATION
			},
			{
				title: {
					ro: 'Documente Oficiale',
					ru: 'Документы',
					en: 'Official Documents'
				},
				link: ADMIN_PAGES.DOCUMENTS
			},
			{
				title: {
					ro: 'Conținut Dinamic',
					ru: 'Динамическое',
					en: 'Dynamic Content'
				},
				link: ADMIN_PAGES.STATISTICS
			}
		]
	},
	{
		title: {
			ro: 'Autentic Local',
			ru: 'Аутентичный локальный',
			en: 'Authentic Local'
		},
		items: [
			{
				title: {
					ro: 'Produse Locale',
					ru: 'Местные Продукты',
					en: 'Local Products'
				},
				link: ADMIN_PAGES.LOCAL_PRODUCTS
			},
			{
				title: {
					ro: 'Servicii din Comunitate',
					ru: 'Услуги сообщества',
					en: 'Community Services'
				},
				link: ADMIN_PAGES.COMMUNITY_SERVICES
			},
			{
				title: {
					ro: 'Atracții Turistice',
					ru: 'Достопримечательности',
					en: 'Tourist Attractions'
				},
				link: ADMIN_PAGES.TOURIST_ATTRACTIONS
			},
			{
				title: {
					ro: 'Oameni și Valori',
					ru: 'Люди и Ценности',
					en: 'People and Values'
				},
				link: ADMIN_PAGES.PEOPLE_AND_VALUES
			}
		]
	},
	{
		title: {
			ro: 'Activități',
			ru: 'Деятельность',
			en: 'Activities'
		},
		items: [
			{
				title: {
					ro: 'Decizii',
					ru: 'Решения',
					en: 'Decisions'
				},
				link: ADMIN_PAGES.DECISIONS
			},
			{
				title: {
					ro: 'Apeluri locale',
					ru: 'Местные вызовы',
					en: 'Local Calls'
				},
				link: ADMIN_PAGES.LOCAL_CALLS
			}
		]
	}
]

export const ADMIN_PAGE_HEADERS = {
	newsPage: {
		title: {
			ro: 'Noutăți',
			en: 'News',
			ru: 'Новости'
		},
		slug: ''
	},
	projectsPage: {
		title: {
			ro: 'Proiecte',
			en: 'Projects',
			ru: 'Проекты'
		},
		slug: ''
	},
	administrationPage: {
		title: {
			ro: 'Despre GAL',
			en: 'About GAL',
			ru: 'O GAL'
		},
		slug: {
			ro: 'Conducerea GAL',
			en: 'GAL Management',
			ru: 'Руководство GAL'
		}
	},
	documentsPage: {
		title: {
			ro: 'Despre GAL',
			en: 'About GAL',
			ru: 'O GAL'
		},
		slug: {
			ro: 'Documente Oficiale',
			en: 'Official Documents',
			ru: 'Документы'
		}
	},
	localProductsPage: {
		title: {
			ro: 'Produse Locale',
			en: 'Local Products',
			ru: 'Местные Продукты'
		},
		slug: ''
	},
	communityServicesPage: {
		title: {
			ro: 'Servicii din Comunitate',
			en: 'Community Services',
			ru: 'Услуги сообщества'
		},
		slug: ''
	},
	touristAttractionsPage: {
		title: {
			ro: 'Atracții Turistice',
			en: 'Tourist Attractions',
			ru: 'Достопримечательности'
		},
		slug: ''
	},
	peopleAndValuesPage: {
		title: {
			ro: 'Oameni și Valori',
			en: 'People and Values',
			ru: 'Люди и Ценности'
		},
		slug: ''
	},
	createBlogPage: {
		title: {
			ro: 'Creare Blog',
			en: 'Create Blog',
			ru: 'Создать Блог'
		},
		slug: ''
	},
	editBlogPage: {
		title: {
			ro: 'Editare Blog',
			en: 'Edit Blog',
			ru: 'Редактировать Блог'
		},
		slug: ''
	},
	statisticsPage: {
		title: {
			ro: 'Despre GAL',
			en: 'About GAL',
			ru: 'O GAL'
		},
		slug: {
			ro: 'Conținut Dinamic',
			en: 'Dynamic Content',
			ru: 'Динамическое'
		}
	}
} as const
