export const ADMIN_DECISIONS_TRANSLATE = {
	columnLabels: {
		title: {
			ro: 'Titlul',
			en: 'Title',
			ru: 'Название'
		},
		description: {
			ro: 'Descrierea deciziei',
			en: 'Decision Description',
			ru: 'Описание решения'
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
			ro: 'Status',
			en: 'Status',
			ru: 'Статус'
		}
	},

	resultsPdfLabel: {
		ro: 'PDF rezultate',
		en: 'Results PDF',
		ru: 'PDF результатов'
	},

	generatingPdfLabel: {
		ro: 'Se generează...',
		en: 'Generating...',
		ru: 'Формируется...'
	},

	modifyLabel: {
		ro: 'Modifică',
		en: 'Edit',
		ru: 'Изменить'
	},

	addButtonLabel: {
		ro: 'Adaugă decizie',
		en: 'Add decision',
		ru: 'Добавить решение'
	},

	addDecisionTitle: {
		ro: 'Adaugă decizie',
		en: 'Add decision',
		ru: 'Добавить решение'
	},
	editDecisionTitle: {
		ro: 'Editează decizia',
		en: 'Edit decision',
		ru: 'Редактировать решение'
	},

	titleInput: {
		ro: {
			label: 'Titlu',
			placeholder: 'Introduceți titlul deciziei',
			error: 'Titlul este obligatoriu în toate cele 3 limbi'
		},
		en: {
			label: 'Title',
			placeholder: 'Enter the decision title',
			error: 'The title is required in all 3 languages'
		},
		ru: {
			label: 'Название',
			placeholder: 'Введите название решения',
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

	statusInput: {
		ro: { label: 'Status' },
		en: { label: 'Status' },
		ru: { label: 'Статус' }
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
	},

	questionsInput: {
		ro: {
			label: 'Întrebări',
			addButton: 'Adaugă întrebare',
			questionPlaceholder: 'Introduceți întrebarea',
			typeLabel: 'Tip întrebare',
			typePlaceholder: 'Selectați tipul întrebării',
			error: 'Este necesară cel puțin o întrebare',
			// Per-question text completeness (distinct from `error`, the "add at least one
			// question" array-level message).
			textError: 'Întrebarea este obligatorie în toate cele 3 limbi',
			removeLabel: 'Elimină'
		},
		en: {
			label: 'Questions',
			addButton: 'Add question',
			questionPlaceholder: 'Enter the question',
			typeLabel: 'Question type',
			typePlaceholder: 'Select the question type',
			error: 'At least one question is required',
			textError: 'The question is required in all 3 languages',
			removeLabel: 'Remove'
		},
		ru: {
			label: 'Вопросы',
			addButton: 'Добавить вопрос',
			questionPlaceholder: 'Введите вопрос',
			typeLabel: 'Тип вопроса',
			typePlaceholder: 'Выберите тип вопроса',
			error: 'Требуется хотя бы один вопрос',
			textError: 'Вопрос должен быть заполнен на всех 3 языках',
			removeLabel: 'Удалить'
		}
	},

	optionsInput: {
		ro: {
			label: 'Opțiuni de răspuns',
			addButton: 'Adaugă opțiune',
			labelPlaceholder: 'Textul opțiunii',
			removeLabel: 'Elimină',
			error: 'Este necesară cel puțin o opțiune',
			// Per-option label completeness (distinct from `error`, the "add at least one
			// option" array-level message).
			labelError: 'Textul opțiunii este obligatoriu în toate cele 3 limbi'
		},
		en: {
			label: 'Answer options',
			addButton: 'Add option',
			labelPlaceholder: 'Option text',
			removeLabel: 'Remove',
			error: 'At least one option is required',
			labelError: 'The option text is required in all 3 languages'
		},
		ru: {
			label: 'Варианты ответа',
			addButton: 'Добавить вариант',
			labelPlaceholder: 'Текст варианта',
			removeLabel: 'Удалить',
			error: 'Требуется хотя бы один вариант',
			labelError: 'Текст варианта должен быть заполнен на всех 3 языках'
		}
	}
}
