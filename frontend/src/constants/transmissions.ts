import { MotorType, TransmissionType } from '@/interfaces/interface-car'

export interface Transmission {
	id: string
	name: TransmissionType
}

export const transmissions: Transmission[] = [
	{
		id: '1',
		name: TransmissionType.AUTOMATIC,
	},

	{
		id: '2',
		name: TransmissionType.MANUAL,
	},

	{
		id: '3',
		name: TransmissionType.ROBOTIC,
	},
]
