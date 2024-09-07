'use client'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Checkbox } from '@/components/ui/checkbox'
import { useFilterParams } from '@/hooks/use-filter-params'
import { BrandService } from '@/services/service-brand'
import { ColorService } from '@/services/service-color'
import { useQuery } from '@tanstack/react-query'
import { FC } from 'react'

export const SideBarAccordion: FC = () => {
	const { brandId, setBrandId, colorId, setColorId } = useFilterParams()

	const { data: brands, isLoading: isLoadingBrands } = useQuery({
		queryKey: ['get-all-brands'],
		queryFn: BrandService.getAll,
	})

	const { data: colors, isLoading: isLoadingColors } = useQuery({
		queryKey: ['get-all-colors'],
		queryFn: ColorService.getAll,
  })

  const handleAddBrandId = (id: string) => {
    if (brandId?.includes(id)) {
      setBrandId(brandId.filter((item) => item !== id))
    } else {
      setBrandId([...brandId ?? [], id])
    }
  }

  const handleAddColorId = (id: string) => {
    if (colorId?.includes(id)) {
      setColorId(colorId.filter((item) => item !== id))
    } else {
      setColorId([...colorId ?? [], id])
    }
  }

	return (
		<Accordion
			type='multiple'
			className='w-full'
		>
			<AccordionItem value='brands'>
				<AccordionTrigger>Бренд</AccordionTrigger>

				<AccordionContent className='flex flex-col gap-4'>
					{brands?.map((brand) => (
						<div
							key={brand.id}
							className='flex items-center gap-3'
						>
							<Checkbox
								className='w-4 h-4'
								onClick={() => handleAddBrandId(brand.id)}
								checked={brandId?.includes(brand.id)}
							/>

							<p>{brand.name}</p>
						</div>
					))}
				</AccordionContent>
			</AccordionItem>

			<AccordionItem value='colors'>
				<AccordionTrigger>Цвет</AccordionTrigger>

				<AccordionContent className='flex flex-col gap-4'>
					{colors?.map((color) => (
						<div
							key={color.id}
							className='flex items-center gap-3'
						>
							<Checkbox
								className='w-4 h-4 border-none'
								style={{ backgroundColor: color.hex }}
                onClick={() => handleAddColorId(color.id)}
                checked={colorId?.includes(color.id)}
							/>

							<p className='capitalize'>{color.name}</p>
						</div>
					))}
				</AccordionContent>
			</AccordionItem>
		</Accordion>
	)
}
