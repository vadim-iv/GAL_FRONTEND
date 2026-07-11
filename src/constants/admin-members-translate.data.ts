export const ADMIN_MEMBERS_TRANSLATE = {
	columnLabels: {
		email: {
			ro: 'Email',
			en: 'Email',
			ru: 'Email'
		},
		name: {
			ro: 'Nume',
			en: 'Name',
			ru: 'Имя'
		},
		roles: {
			ro: 'Roluri',
			en: 'Roles',
			ru: 'Роли'
		},
		details: {
			ro: 'Detalii',
			en: 'Details',
			ru: 'Детали'
		}
	},

	// Short labels for the role badges/tags — distinct from `sectionTitles` (used for
	// page headings), since a tag needs a terser form (e.g. "Președinte" not "Președintele").
	roleTagLabel: {
		president: {
			ro: 'Președinte',
			en: 'President',
			ru: 'Президент'
		},
		executive: {
			ro: 'Organul Executiv',
			en: 'Executive Body',
			ru: 'Исполнительный орган'
		},
		administration: {
			ro: 'Administrația GAL',
			en: 'GAL Administration',
			ru: 'Администрация GAL'
		},
		committee: {
			ro: 'Comitetul de Selectare',
			en: 'Selection Committee',
			ru: 'Отборочный комитет'
		},
		censorship: {
			ro: 'Comisia de Cenzori',
			en: 'Censorship Committee',
			ru: 'Комиссия по цензуре'
		}
	},

	modifyLabel: {
		ro: 'Modifică',
		en: 'Edit',
		ru: 'Изменить'
	},

	sectionTitles: {
		president: {
			ro: 'Președintele',
			en: 'President',
			ru: 'Президент'
		},
		executive: {
			ro: 'Organul Executiv',
			en: 'Executive Body',
			ru: 'Исполнительный орган'
		},
		generalAssembly: {
			ro: 'Adunarea Generală',
			en: 'General Assembly',
			ru: 'Общее собрание'
		},
		administration: {
			ro: 'Administrația GAL',
			en: 'GAL Administration',
			ru: 'Администрация GAL'
		},
		committee: {
			ro: 'Comitetul de Selectare',
			en: 'Selection Committee',
			ru: 'Отборочный комитет'
		},
		censorship: {
			ro: 'Comisia de Cenzori',
			en: 'Censorship Committee',
			ru: 'Комиссия по цензуре'
		}
	},

	addButtonLabel: {
		president: {
			ro: 'Adaugă Președinte',
			en: 'Add President',
			ru: 'Добавить Президента'
		},
		executive: {
			ro: 'Adaugă membru',
			en: 'Add member',
			ru: 'Добавить участника'
		},
		administration: {
			ro: 'Adaugă membru',
			en: 'Add member',
			ru: 'Добавить участника'
		},
		committee: {
			ro: 'Adaugă membru',
			en: 'Add member',
			ru: 'Добавить участника'
		},
		censorship: {
			ro: 'Adaugă membru',
			en: 'Add member',
			ru: 'Добавить участника'
		}
	},

	addMemberTitle: {
		ro: 'Adaugă membru',
		en: 'Add member',
		ru: 'Добавить участника'
	},
	editMemberTitle: {
		ro: 'Editează membru',
		en: 'Edit member',
		ru: 'Редактировать участника'
	},

	emailInput: {
		ro: {
			label: 'Email',
			placeholder: 'Introduceți adresa de email',
			error: 'O adresă de email validă este obligatorie'
		},
		en: {
			label: 'Email',
			placeholder: 'Enter email address',
			error: 'A valid email address is required'
		},
		ru: {
			label: 'Email',
			placeholder: 'Введите адрес электронной почты',
			error: 'Требуется действительный адрес электронной почты'
		}
	},

	nameInput: {
		ro: {
			label: 'Nume',
			placeholder: 'Introduceți numele',
			error: 'Numele este obligatoriu'
		},
		en: {
			label: 'Name',
			placeholder: 'Enter name',
			error: 'Name is required'
		},
		ru: {
			label: 'Имя',
			placeholder: 'Введите имя',
			error: 'Имя обязательно'
		}
	},

	// Short blurb — always required, used as the <li> entry in every non-president section.
	shortDetailsInput: {
		ro: {
			label: 'Detalii scurte',
			placeholder: 'Introduceți detaliile scurte ale membrului',
			error: 'Detaliile scurte sunt obligatorii'
		},
		en: {
			label: 'Short details',
			placeholder: 'Enter member short details',
			error: 'Short details are required'
		},
		ru: {
			label: 'Краткие сведения',
			placeholder: 'Введите краткие сведения об участнике',
			error: 'Краткие сведения обязательны'
		}
	},

	// Long bio — only shown/required when the President role is checked.
	presidentBioInput: {
		ro: {
			label: 'Despre Președinte',
			placeholder: 'Introduceți informații despre Președinte',
			error: 'Informațiile despre Președinte sunt obligatorii'
		},
		en: {
			label: 'About the President',
			placeholder: 'Enter information about the President',
			error: 'Information about the President is required'
		},
		ru: {
			label: 'О Президенте',
			placeholder: 'Введите информацию о Президенте',
			error: 'Информация о Президенте обязательна'
		}
	},

	rolesInput: {
		ro: {
			label: 'Roluri',
			error: 'Trebuie selectat cel puțin un rol'
		},
		en: {
			label: 'Roles',
			error: 'At least one role must be selected'
		},
		ru: {
			label: 'Роли',
			error: 'Необходимо выбрать хотя бы одну роль'
		}
	},

	imageInput: {
		ro: {
			label: 'Imaginea Președintelui',
			placeholder: {
				main: 'Faceți clic pentru a încărca imaginea',
				subtext: 'Dimensiune maximă'
			},
			error: 'Imaginea este obligatorie'
		},
		en: {
			label: 'President Image',
			placeholder: {
				main: 'Click to upload image',
				subtext: 'Max size'
			},
			error: 'Image is required'
		},
		ru: {
			label: 'Изображение Президента',
			placeholder: {
				main: 'Нажмите, чтобы загрузить изображение',
				subtext: 'Макс. размер'
			},
			error: 'Изображение обязательно'
		}
	}
}
