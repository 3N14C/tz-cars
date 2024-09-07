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
import { useQuery } from '@tanstack/react-query'
import { Check } from 'lucide-react'
import { FC, useState } from 'react'

interface Props {
	brandId: string
	setBrandId: (value: string) => void
}

export const PickBrand: FC<Props> = ({ brandId, setBrandId }) => {
  const [open, setOpen] = useState<boolean>(false)
	const { data: brands } = useQuery({
		queryKey: ['get-all-brands'],
		queryFn: BrandService.getAll,
	})

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					role='combobox'
					className='w-full'
					variant='outline'
				>
					{brandId
						? brands?.find((brand) => brand.id === brandId)?.name
						: 'Выберите бренд'}
				</Button>
			</PopoverTrigger>

			<PopoverContent>
				<Command>
					<CommandInput placeholder='Бренд...' />

					<CommandList>
						<CommandEmpty>No results found.</CommandEmpty>

						<CommandGroup>
							{brands?.map((brand) => (
								<CommandItem
									key={brand.id}
									value={brand.name}
                  onSelect={() => {
                    setBrandId(brand.id)
                    setOpen(false)
                  }}
									className='cursor-pointer'
								>
									<Check
										className={cn(
											'w-4 h-4 mr-2 transition-all duration-300',
											brandId === brand.id ? 'opacity-100' : 'opacity-0'
										)}
									/>
									{brand.name}
								</CommandItem>
							))}
						</CommandGroup>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	)
}
