import { MotorType, TransmissionType } from '@/interfaces/interface-car'
import { z } from 'zod'

export const addCarSchema = z.object({
	name: z.string().min(1, 'Это поле не может быть пустым'),
	price: z.string().min(1, 'Это поле не может быть пустым'),
	year: z.string().min(1, 'Это поле не может быть пустым'),
	reserve: z
		.string()
		.refine((val) => (MotorType.ELECTRIC ? true : val.length > 0), {
			message: 'Это поле является обязательным',
    }).optional(),
  img: z.instanceof(FormData).optional(),
  brandId: z.string().optional(),
  colorId: z.string().optional(),
  motor: z.string().optional(),
  transmission: z.string().optional(),
})
