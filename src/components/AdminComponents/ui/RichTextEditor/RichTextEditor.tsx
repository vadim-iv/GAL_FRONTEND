'use client'

import BulletList from '@tiptap/extension-bullet-list'
import Document from '@tiptap/extension-document'
import ListItem from '@tiptap/extension-list-item'
import OrderedList from '@tiptap/extension-ordered-list'
import Paragraph from '@tiptap/extension-paragraph'
import Placeholder from '@tiptap/extension-placeholder'
import Subscript from '@tiptap/extension-subscript'
import Superscript from '@tiptap/extension-superscript'
import Text from '@tiptap/extension-text'
import Underline from '@tiptap/extension-underline'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { useEffect } from 'react'
import { Control, RegisterOptions, useController } from 'react-hook-form'

import { TypeBlogFormState } from '@/types/blog.types'
import { TypeDocumentsFormState } from '@/types/documents.types'
import { TypeMainImageFormState } from '@/types/management.types'
import { TypeMemberFormState } from '@/types/member.types'
import { TypeStatisticsFormState } from '@/types/statistics.types'

import { Toolbar } from './Toolbar'
import { cn } from '@/lib/utils'

import './text-editor.styles.css'

interface Props {
	className?: string
	name: string
	control:
		| Control<TypeBlogFormState>
		| Control<TypeStatisticsFormState>
		| Control<TypeMainImageFormState>
		| Control<TypeDocumentsFormState>
		| Control<TypeMemberFormState>
	placeholder: string
	rules?: RegisterOptions
}

export function RichTextEditor({ className, name, control, placeholder, rules }: Props) {
	const {
		field: { value, onChange },
		fieldState
	} = useController({
		name: name as any,
		control: control as Control<
			TypeBlogFormState | TypeStatisticsFormState | TypeMainImageFormState | TypeDocumentsFormState | TypeMemberFormState
		>,
		rules: rules as any,
		defaultValue: ''
	})

	const editor = useEditor({
		immediatelyRender: false,
		extensions: [
			StarterKit,
			Placeholder.configure({
				placeholder: placeholder || 'Enter text here...'
			}),
			Underline,
			Subscript,
			Superscript,
			BulletList,
			ListItem,
			OrderedList,
			Text,
			Document,
			Paragraph
		],
		content: value || '',
		onUpdate: ({ editor }) => {
			let html = editor.getHTML()
			if (html === '<p></p>') html = ''

			onChange(html)
		},
		editorProps: {
			attributes: {
				class: cn(
					'styled-scrollbar w-full h-full overflow-y-auto p-[1.5rem] text-green-700 text-[1rem] leading-[1.125rem] font-[400] focus:outline-none',
					fieldState.error && 'error-state'
				),
				'data-placeholder': placeholder
			}
		}
	})

	useEffect(() => {
		if (editor && value !== editor.getHTML()) {
			editor.commands.setContent(value || '')
		}
	}, [editor, value])

	return (
		<div className='flex flex-col gap-[0.25rem]'>
			<Toolbar editor={editor} />
			<EditorContent
				data-lenis-prevent
				editor={editor}
				style={{ whiteSpace: 'pre-line' }}
				className={cn(
					`h-[22rem] bg-gray-300 transition-colors duration-300 border-gray-500 border rounded-[0.5rem]`,
					className
				)}
			/>
		</div>
	)
}
