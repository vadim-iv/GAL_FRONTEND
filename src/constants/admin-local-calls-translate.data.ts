export const ADMIN_LOCAL_CALLS_TRANSLATE = {
	columnLabels: {
		title: {
			ro: 'Titlu',
			en: 'Title',
			ru: 'Название'
		},
		description: {
			ro: 'Descriere',
			en: 'Description',
			ru: 'Описание'
		},
		voteStart: {
			ro: 'Începutul votării',
			en: 'Vote Start',
			ru: 'Начало голосования'
		},
		voteEnd: {
			ro: 'Sfârșitul votării',
			en: 'Vote End',
			ru: 'Окончание голосования'
		},
		status: {
			ro: 'Stare',
			en: 'Status',
			ru: 'Статус'
		}
	},

	modifyLabel: {
		ro: 'Modifică',
		en: 'Edit',
		ru: 'Изменить'
	},

	addButtonLabel: {
		ro: 'Adaugă apel local',
		en: 'Add local call',
		ru: 'Добавить местный вызов'
	},

	addMemberTitle: {
		ro: 'Adaugă apel local',
		en: 'Add local call',
		ru: 'Добавить местный вызов'
	},
	editMemberTitle: {
		ro: 'Editează apelul local',
		en: 'Edit local call',
		ru: 'Редактировать местный вызов'
	},

	nameInput: {
		ro: {
			label: 'Nume',
			placeholder: 'Introduceți numele apelului local',
			error: 'Numele este obligatoriu în toate cele 3 limbi'
		},
		en: {
			label: 'Name',
			placeholder: 'Enter the local call name',
			error: 'The name is required in all 3 languages'
		},
		ru: {
			label: 'Название',
			placeholder: 'Введите название местного вызова',
			error: 'Название должно быть заполнено на всех 3 языках'
		}
	},

	descriptionInput: {
		ro: {
			label: 'Descriere',
			placeholder: 'Introduceți descrierea',
			error: 'Descrierea este obligatorie în toate cele 3 limbi'
		},
		en: {
			label: 'Description',
			placeholder: 'Enter the description',
			error: 'The description is required in all 3 languages'
		},
		ru: {
			label: 'Описание',
			placeholder: 'Введите описание',
			error: 'Описание должно быть заполнено на всех 3 языках'
		}
	},

	imageInput: {
		ro: {
			label: 'Imagine',
			placeholder: {
				main: 'Faceți clic pentru a încărca imaginea',
				subtext: 'Dimensiune maximă'
			},
			error: 'Imaginea este obligatorie'
		},
		en: {
			label: 'Image',
			placeholder: {
				main: 'Click to upload image',
				subtext: 'Max size'
			},
			error: 'Image is required'
		},
		ru: {
			label: 'Изображение',
			placeholder: {
				main: 'Нажмите, чтобы загрузить изображение',
				subtext: 'Макс. размер'
			},
			error: 'Изображение обязательно'
		}
	},

	questionsInput: {
		ro: {
			label: 'Întrebări',
			addButton: 'Adaugă întrebare',
			questionPlaceholder: 'Introduceți întrebarea',
			maxScoreLabel: 'Scor maxim',
			error: 'Este necesară cel puțin o întrebare',
			// Per-question text completeness (distinct from `error`).
			textError: 'Întrebarea este obligatorie în toate cele 3 limbi',
			removeLabel: 'Elimină'
		},
		en: {
			label: 'Questions',
			addButton: 'Add question',
			questionPlaceholder: 'Enter the question',
			maxScoreLabel: 'Max score',
			error: 'At least one question is required',
			textError: 'The question is required in all 3 languages',
			removeLabel: 'Remove'
		},
		ru: {
			label: 'Вопросы',
			addButton: 'Добавить вопрос',
			questionPlaceholder: 'Введите вопрос',
			maxScoreLabel: 'Макс. балл',
			error: 'Требуется хотя бы один вопрос',
			textError: 'Вопрос должен быть заполнен на всех 3 языках',
			removeLabel: 'Удалить'
		}
	},

	voteStartInput: {
		ro: { label: 'Începutul votării', error: 'Data de început este obligatorie' },
		en: { label: 'Vote Start', error: 'Start date is required' },
		ru: { label: 'Начало голосования', error: 'Дата начала обязательна' }
	},

	voteEndInput: {
		ro: { label: 'Sfârșitul votării', error: 'Data de sfârșit este obligatorie' },
		en: { label: 'Vote End', error: 'End date is required' },
		ru: { label: 'Окончание голосования', error: 'Дата окончания обязательна' }
	}
}
