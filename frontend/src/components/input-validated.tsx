'use client'

import { forwardRef } from 'react'
import { Input } from './ui/input'

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
	error?: string
	label?: string
}

export const InputValidated = forwardRef<HTMLInputElement, Props>(
	({ error, label, ...props }, ref) => {
		return (
			<div className=''>
				<p className='text-sm text-zinc-400'>{label}</p>
				<Input
					{...props}
					ref={ref}
				/>
				{error}
			</div>
		)
	}
)
