'use client'

import { cn } from '@/lib/utils'
import { FC } from 'react'

interface Props extends React.HTMLAttributes<HTMLParagraphElement> {
	children: React.ReactNode
}

export const Title: FC<Props> = ({ children, className, ...props }) => {
	return (
		<p
			{...props}
			className={cn('text-3xl font-bold', className)}
		>
			{children}
		</p>
	)
}
