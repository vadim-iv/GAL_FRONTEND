import { Control, Controller, FieldPath, FieldValues, RegisterOptions } from 'react-hook-form'

import { SelectBoxBase } from './SelectBoxBase'

interface ISelectProps<T extends FieldValues> {
	options: { value: string; label: string }[]
	name: FieldPath<T>
	control: Control<T>
	placeholder: string
	className?: string
	rules?: RegisterOptions<T>
}

export const SelectBox = <T extends FieldValues>({
	className,
	name,
	control,
	options,
	placeholder,
	rules
}: ISelectProps<T>) => {
	return (
		<Controller
			name={name}
			control={control}
			rules={rules}
			render={({ field: { value = '', onChange }, fieldState }) => (
				<SelectBoxBase
					options={options}
					value={value as string}
					onChange={onChange}
					placeholder={placeholder}
					className={className}
					error={!!fieldState.error}
				/>
			)}
		/>
	)
}
