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
import { transmissions } from '@/constants/transmissions'
import { MotorType, TransmissionType } from '@/interfaces/interface-car'
import { cn } from '@/lib/utils'
import { Check } from 'lucide-react'
import { FC, useState } from 'react'

interface Props {
	transmissionName: TransmissionType | null
	setTransmissionName: (value: TransmissionType) => void
	disabled: boolean
}

export const PickTransmission: FC<Props> = ({
	transmissionName,
	setTransmissionName,
	disabled,
}) => {
	const [open, setOpen] = useState<boolean>(false)

	return (
		<Popover
			open={!disabled && open}
			onOpenChange={setOpen}
		>
			<PopoverTrigger asChild>
				<Button
					role='combobox'
					className='w-full'
					variant='outline'
				>
					{transmissionName ? (
						<p className='capitalize'>
							{disabled
								? 'Недоступно для электрического двигателя'
								: transmissions?.find(
										(transmission) => transmission.name === transmissionName
								  )?.name}
						</p>
					) : (
						<p>
							{disabled
								? 'Недоступно для электрического двигателя'
								: 'Выберите тип коробки передач'}
						</p>
					)}
				</Button>
			</PopoverTrigger>

			<PopoverContent>
				<Command>
					<CommandInput placeholder='Цвет...' />

					<CommandList>
						<CommandEmpty>No results found.</CommandEmpty>

						<CommandGroup>
							{transmissions?.map((transmission) => (
								<CommandItem
									key={transmission.id}
									value={transmission.name}
									onSelect={() => {
										setTransmissionName(transmission.name)
										setOpen(false)
									}}
									className='cursor-pointer capitalize'
								>
									<Check
										className={cn(
											'w-4 h-4 mr-2 transition-all duration-300',
											transmissionName === transmission.name
												? 'opacity-100'
												: 'opacity-0'
										)}
									/>
									{transmission.name}
								</CommandItem>
							))}
						</CommandGroup>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	)
}
