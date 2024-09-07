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
import { motors } from '@/constants/motors'
import { MotorType } from '@/interfaces/interface-car'
import { cn } from '@/lib/utils'
import { Check } from 'lucide-react'
import { FC, useState } from 'react'

interface Props {
	motorName: MotorType | null
	setMotorName: (value: MotorType) => void
}

export const PickMotor: FC<Props> = ({ motorName, setMotorName }) => {
	const [open, setOpen] = useState<boolean>(false)

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
					{motorName ? (
						<p className='capitalize'>
							{motors?.find((motor) => motor.name === motorName)?.name}
						</p>
					) : (
						<p>Выберите тип двигателя</p>
					)}
				</Button>
			</PopoverTrigger>

			<PopoverContent>
				<Command>
					<CommandInput placeholder='Цвет...' />

					<CommandList>
						<CommandEmpty>No results found.</CommandEmpty>

						<CommandGroup>
							{motors?.map((motor) => (
								<CommandItem
									key={motor.id}
									value={motor.name}
									onSelect={() => {
										setMotorName(motor.name)
										setOpen(false)
									}}
									className='cursor-pointer capitalize'
								>
									<Check
										className={cn(
											'w-4 h-4 mr-2 transition-all duration-300',
											motorName === motor.name ? 'opacity-100' : 'opacity-0'
										)}
									/>
									{motor.name}
								</CommandItem>
							))}
						</CommandGroup>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	)
}
