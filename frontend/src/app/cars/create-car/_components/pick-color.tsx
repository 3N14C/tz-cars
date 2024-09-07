'use client'

import { Button } from '@/components/ui/button'
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from '@/components/ui/command'
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { BrandService } from '@/services/service-brand'
import { ColorService } from '@/services/service-color'
import { useQuery } from '@tanstack/react-query'
import { Check } from 'lucide-react'
import { FC, useState } from 'react'

interface Props {
	colorId: string
	setColorId: (value: string) => void
}

export const PickColor: FC<Props> = ({ colorId, setColorId }) => {
	const [open, setOpen] = useState<boolean>(false)
	const { data: colors } = useQuery({
		queryKey: ['get-all-colors'],
		queryFn: ColorService.getAll,
	})

	return (
		<Popover
			open={open}
			onOpenChange={setOpen}
		>
			<PopoverTrigger asChild>
				<Button
					role='combobox'
					className='w-full'
					variant='outline'
				>
					{colorId ? (
						<p className='capitalize'>
							{colors?.find((color) => color.id === colorId)?.name}
						</p>
					) : (
						<p>Выберите цвет</p>
					)}
				</Button>
			</PopoverTrigger>

			<PopoverContent>
				<Command>
					<CommandInput placeholder='Цвет...' />

					<CommandList>
						<CommandEmpty>No results found.</CommandEmpty>

						<CommandGroup>
							{colors?.map((color) => (
								<CommandItem
									key={color.id}
									value={color.name}
									onSelect={() => {
										setColorId(color.id)
										setOpen(false)
									}}
									className='cursor-pointer capitalize'
								>
									<Check
										className={cn(
											'w-4 h-4 mr-2 transition-all duration-300',
											colorId === color.id ? 'opacity-100' : 'opacity-0'
										)}
									/>
									{color.name}
								</CommandItem>
							))}
						</CommandGroup>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	)
}
