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
		generalAssembly: {
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
			label: 'Email (opțional)',
			placeholder: 'Introduceți adresa de email',
			error: 'Introduceți o adresă de email validă'
		},
		en: {
			label: 'Email (optional)',
			placeholder: 'Enter email address',
			error: 'Please enter a valid email address'
		},
		ru: {
			label: 'Email (необязательно)',
			placeholder: 'Введите адрес электронной почты',
			error: 'Введите корректный адрес электронной почты'
		}
	},

	noEmailPlaceholder: {
		ro: 'Niciun email atașat încă',
		en: 'No email attached yet',
		ru: 'Email пока не привязан'
	},

	nameInput: {
		ro: {
			label: 'Nume',
			placeholder: 'Introduceți numele',
			error: 'Numele este obligatoriu în toate cele 3 limbi'
		},
		en: {
			label: 'Name',
			placeholder: 'Enter name',
			error: 'The name is required in all 3 languages'
		},
		ru: {
			label: 'Имя',
			placeholder: 'Введите имя',
			error: 'Имя должно быть заполнено на всех 3 языках'
		}
	},

	// Short blurb — always required, used as the <li> entry in every non-president section.
	shortDetailsInput: {
		ro: {
			label: 'Detalii scurte',
			placeholder: 'Introduceți detaliile scurte ale membrului',
			error: 'Detaliile scurte sunt obligatorii în toate cele 3 limbi'
		},
		en: {
			label: 'Short details',
			placeholder: 'Enter member short details',
			error: 'Short details are required in all 3 languages'
		},
		ru: {
			label: 'Краткие сведения',
			placeholder: 'Введите краткие сведения об участнике',
			error: 'Краткие сведения должны быть заполнены на всех 3 языках'
		}
	},

	// Long bio — only shown/required when the President role is checked.
	presidentBioInput: {
		ro: {
			label: 'Despre Președinte',
			placeholder: 'Introduceți informații despre Președinte',
			error: 'Informațiile despre Președinte sunt obligatorii în toate cele 3 limbi'
		},
		en: {
			label: 'About the President',
			placeholder: 'Enter information about the President',
			error: 'Information about the President is required in all 3 languages'
		},
		ru: {
			label: 'О Президенте',
			placeholder: 'Введите информацию о Президенте',
			error: 'Информация о Президенте должна быть заполнена на всех 3 языках'
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
