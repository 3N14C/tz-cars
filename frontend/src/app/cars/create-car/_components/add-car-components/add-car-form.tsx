'use client'

import { InputValidated } from '@/components/input-validated'
import { Button } from '@/components/ui/button'
import { MotorType, TransmissionType } from '@/interfaces/interface-car'
import { addCarSchema } from '@/schemas/schema-add-car'
import { CarService } from '@/services/service-car'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { Loader2 } from 'lucide-react'
import { FC, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { PickBrand } from './pick-brand'
import { PickColor } from './pick-color'
import { PickImage } from './pick-image'
import { PickMotor } from './pick-motor'
import { PickTransmission } from './pick-transmission'

export const AddCarForm: FC = () => {
	const [brandId, setBrandId] = useState<string>('')
	const [colorId, setColorId] = useState<string>('')
	const [motorName, setMotorName] = useState<MotorType | null>(null)
	const [transmissionName, setTransmissionName] =
		useState<TransmissionType | null>(null)

	const [image, setImage] = useState<File | null>(null)

	const {
		register,
		handleSubmit,
		formState: { errors },
		getValues,
		reset,
	} = useForm<z.infer<typeof addCarSchema>>({
		resolver: zodResolver(addCarSchema),
	})

	const { mutateAsync, isPending } = useMutation({
		mutationFn: CarService.create,
		onSuccess: () => {
			reset()
			setBrandId('')
			setColorId('')
			setMotorName(null)
			setTransmissionName(null)
			setImage(null)
		},
	})

	const onSubmit = async (data: z.infer<typeof addCarSchema>) => {
		if (!image) return
		if (!motorName) return
		if (!transmissionName && motorName !== 'электрический') return
		if (!data.reserve && motorName === 'электрический') return

		const formData = new FormData()
		formData.append('img', image)
		formData.append('name', data.name)
		formData.append('year', data.year)
		formData.append('price', data.price)
		formData.append('reserve', data.reserve ?? '')
		formData.append('brandId', brandId)
		formData.append('colorId', colorId)
		formData.append('motor', motorName)
		formData.append('transmission', transmissionName ?? '')

		await mutateAsync(formData)
	}

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className='flex flex-col gap-4'
		>
			<InputValidated
				label='Название модели'
				placeholder='...'
				{...register('name')}
				error={errors.name?.message}
				className=''
			/>

			<InputValidated
				label='Цена в рублях'
				placeholder='...'
				{...register('price')}
				error={errors.price?.message}
				className=''
			/>

			<InputValidated
				label='Год выпуска'
				placeholder='...'
				{...register('year')}
				error={errors.year?.message}
				className=''
			/>

			<InputValidated
				disabled={motorName !== MotorType.ELECTRIC}
				label='Запас хода (км)'
				placeholder='...'
				className=''
			/>

			<PickBrand
				setBrandId={setBrandId}
				brandId={brandId}
			/>

			<PickColor
				colorId={colorId}
				setColorId={setColorId}
			/>

			<PickMotor
				motorName={motorName}
				setMotorName={setMotorName}
			/>

			<PickTransmission
				disabled={motorName === MotorType.ELECTRIC}
				transmissionName={transmissionName}
				setTransmissionName={setTransmissionName}
			/>

			<PickImage
				image={image}
				setImage={setImage}
			/>

			<Button
				disabled={isPending}
				type='submit'
				className='py-7'
			>
				{isPending ? <Loader2 className='animate-spin' /> : 'Добавить'}
			</Button>
		</form>
	)
}
