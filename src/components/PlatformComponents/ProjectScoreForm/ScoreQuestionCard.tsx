'use client'

interface Props {
	question: string
	maxScore: number
	value: number | null
	onChange: (value: number) => void
	disabled?: boolean
}

// Closest green-accented equivalent to Google Forms' "linear scale" question type.
export function ScoreQuestionCard({ question, maxScore, value, onChange, disabled }: Props) {
	const scores = Array.from({ length: maxScore + 1 }, (_, index) => index)

	return (
		<div className='bg-white rounded-[1rem] border border-gray-500 p-[1.5rem] flex flex-col gap-[1rem]'>
			<p className='text-green-700 text-[1rem] font-[500]'>{question}</p>
			<div className='flex flex-wrap gap-[0.5rem]'>
				{scores.map(score => (
					<button
						key={score}
						type='button'
						disabled={disabled}
						onClick={() => onChange(score)}
						className={`size-[2.5rem] rounded-full flex items-center justify-center text-[0.875rem] font-[500] border transition-colors duration-300 ${
							value === score
								? 'bg-green-600 text-white border-green-600'
								: 'bg-white text-green-700 border-gray-500 hover:border-green-600'
						} ${disabled ? 'opacity-70 cursor-not-allowed' : 'cursor-pointer'}`}
					>
						{score}
					</button>
				))}
			</div>
		</div>
	)
}
