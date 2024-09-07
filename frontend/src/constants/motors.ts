import { MotorType } from '@/interfaces/interface-car'

export interface Motor {
	id: string
	name: MotorType
}

export const motors: Motor[] = [
	{
		id: '1',
		name: MotorType.DIESEL,
	},

	{
		id: '2',
		name: MotorType.GASOLINE,
	},

	{
		id: '3',
		name: MotorType.ELECTRIC,
	},
]
