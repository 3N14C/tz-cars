import { cn } from '@/lib/utils'
import { SideBar } from './_components/side-bar/side-bar'
import { CarList } from './_components/car-list'
import { Button } from '@/components/ui/button'
import { ModalAddCar } from './_components/modal-add-car/modal-add-car'

export default function Home() {
	return (
		<div className='flex flex-col gap-10'>
			<ModalAddCar />
			<div className={cn('flex items-start gap-10')}>
				<SideBar />

				<CarList />
			</div>
		</div>
	)
}
