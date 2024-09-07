import { cn } from '@/lib/utils'
import Link from 'next/link'
import { CarList } from './_components/car-list'
import { SideBar } from './_components/side-bar/side-bar'
import { Button } from '@/components/ui/button'

export default function Home() {
	return (
		<div className='flex flex-col gap-10'>
			{/* <ModalAddCar /> */}
			<Button className='py-7'>
				<Link href={'/cars/create-car'}>Добавить новый автомобиль</Link>
			</Button>
			<div className={cn('flex items-start gap-10')}>
				<SideBar />

				<CarList />
			</div>
		</div>
	)
}
