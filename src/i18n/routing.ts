import { defineRouting } from 'next-intl/routing'

export const routing = defineRouting({
	// A list of all locales that are supported
	locales: ['ro', 'en', 'ru'],
	localeDetection: false,

	pathnames: {
		'/': '/',
		'/news': { ro: '/stiri', en: '/news', ru: '/новости' },
		'/news/[news_id]': { ro: '/stiri/[news_id]', en: '/news/[news_id]', ru: '/новости/[news_id]' },

		'/projects': { ro: '/proiecte', en: '/projects', ru: '/проекты' },
		'/projects/[projects_id]': {
			ro: '/proiecte/[projects_id]',
			en: '/projects/[projects_id]',
			ru: '/проекты/[projects_id]'
		},
		'/projects/[projects_name]': {
			ro: '/proiecte/[projects_name]',
			en: '/projects/[projects_name]',
			ru: '/проекты/[projects_name]'
		},

		'/authentic-local': { ro: '/local-autentic', en: '/authentic-local', ru: '/подлинное-местное' },
		'/authentic-local/[authentic_local_id]': {
			ro: '/local-autentic/[authentic_local_id]',
			en: '/authentic-local/[authentic_local_id]',
			ru: '/подлинное-местное/[authentic_local_id]'
		},

		'/authentic-local/local-products': {
			ro: '/local-autentic/produse-locale',
			en: '/authentic-local/local-products',
			ru: '/подлинное-местное/местные-продукты'
		},
		'/authentic-local/local-products/[local_products_id]': {
			ro: '/local-autentic/produse-locale/[local_products_id]',
			en: '/authentic-local/local-products/[local_products_id]',
			ru: '/подлинное-местное/местные-продукты/[local_products_id]'
		},

		'/authentic-local/services': {
			ro: '/local-autentic/servicii',
			en: '/authentic-local/services',
			ru: '/подлинное-местное/услуги'
		},
		'/authentic-local/services/[services_id]': {
			ro: '/local-autentic/servicii/[services_id]',
			en: '/authentic-local/services/[services_id]',
			ru: '/подлинное-местное/услуги/[services_id]'
		},

		'/authentic-local/tourist-attractions': {
			ro: '/local-autentic/atractii-turistice',
			en: '/authentic-local/tourist-attractions',
			ru: '/подлинное-местное/достопримечательности'
		},
		'/authentic-local/tourist-attractions/[tourist_attractions_id]': {
			ro: '/local-autentic/atractii-turistice/[tourist_attractions_id]',
			en: '/authentic-local/tourist-attractions/[tourist_attractions_id]',
			ru: '/подлинное-местное/достопримечательности/[tourist_attractions_id]'
		},

		'/authentic-local/people-and-values': {
			ro: '/local-autentic/oameni-si-valori',
			en: '/authentic-local/people-and-values',
			ru: '/подлинное-местное/люди-и-ценности'
		},
		'/authentic-local/people-and-values/[people_and_values_id]': {
			ro: '/local-autentic/oameni-si-valori/[people_and_values_id]',
			en: '/authentic-local/people-and-values/[people_and_values_id]',
			ru: '/подлинное-местное/люди-и-ценности/[people_and_values_id]'
		},

		'/community-services': {
			ro: '/servicii-comunitare',
			en: '/community-services',
			ru: '/общественные-услуги'
		},
		'/community-services/[community_services_id]': {
			ro: '/servicii-comunitare/[community_services_id]',
			en: '/community-services/[community_services_id]',
			ru: '/общественные-услуги/[community_services_id]'
		},

		'/terms-and-conditions': {
			ro: '/termeni-si-conditii',
			en: '/terms-and-conditions',
			ru: '/правила-и-условия'
		},

		'/map': {
			ro: '/mapa',
			en: '/map',
			ru: '/карта'
		},

		'/contacts': { ro: '/contacte', en: '/contacts', ru: '/контакты' },
		'/aboutUs': { ro: '/despreNoi', en: '/aboutUs', ru: '/о-нас' },
		'/administration': { ro: '/administratie', en: '/administration', ru: '/администрация' },
		'/documents': { ro: '/documente', en: '/documents', ru: '/документы' },
		'/invalid-path': { ro: '/cale-invalida', en: '/invalid-path', ru: '/неверный-путь' },

		// Admin routes
		'/admin': '/admin',
		'/admin/news': '/admin/news',
		'/admin/projects': '/admin/projects',
		'/admin/login': '/admin/login',
		'/admin/community-services': '/admin/community-services',
		'/admin/local-products': '/admin/local-products',
		'/admin/people-and-values': '/admin/people-and-values',
		'/admin/tourist-attractions': '/admin/tourist-attractions',

		'/admin/create-blog': '/admin/create-blog',
		'/admin/edit-blog/[id]': '/admin/edit-blog/[id]',

		'/admin/local-calls': '/admin/local-calls',
		'/admin/create-local-call': '/admin/create-local-call',
		'/admin/edit-local-call/[id]': '/admin/edit-local-call/[id]',
		'/admin/local-calls/[id]/projects': '/admin/local-calls/[id]/projects',
		'/admin/local-calls/[id]/projects/create': '/admin/local-calls/[id]/projects/create',
		'/admin/local-calls/[id]/projects/edit/[projectId]':
			'/admin/local-calls/[id]/projects/edit/[projectId]',

		'/admin/decisions': '/admin/decisions',
		'/admin/create-decision': '/admin/create-decision',
		'/admin/edit-decision/[id]': '/admin/edit-decision/[id]',

		// Member voting platform routes
		'/votare': '/votare',
		'/votare/login': '/votare/login',
		'/votare/forgot-password': '/votare/forgot-password',
		'/votare/reset-password': '/votare/reset-password',
		'/votare/local-calls': '/votare/local-calls',
		'/votare/local-calls/[id]': '/votare/local-calls/[id]',
		'/votare/local-calls/[id]/projects/[projectId]': '/votare/local-calls/[id]/projects/[projectId]',
		'/votare/decisions': '/votare/decisions',
		'/votare/decisions/[id]': '/votare/decisions/[id]'
	},

	// Used when no locale matches
	defaultLocale: 'ro'
})

export type Pathnames = '/'
