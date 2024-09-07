'use client'

import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import { FC } from 'react'

interface Props {
	image: File | null
	setImage: React.Dispatch<React.SetStateAction<File | null>>
}

export const PickImage: FC<Props> = ({ image, setImage }) => {
	return (
		<div className='h-[200px] w-full relative border rounded-lg overflow-hidden'>
			<Input
				type='file'
        className='w-full h-full opacity-0 cursor-pointer'
        onChange={e => setImage(e.target.files?.[0] || null)}
			/>
			<p
				className={cn(
					'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10',
					{
						'opacity-0': image,
					}
				)}
			>
				Выберите изображение
			</p>

			{image && (
				<Image
					src={URL.createObjectURL(image)}
					alt={image.name}
					width={1000}
					height={1000}
					className='w-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'
				/>
			)}
		</div>
	)
}
