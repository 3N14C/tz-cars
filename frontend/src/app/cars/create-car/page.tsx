import { NextPage } from 'next'
import { AddCarForm } from './_components/add-car-form'

interface Props {}

const Page: NextPage<Props> = ({}) => {
	return (
		<div>
			<AddCarForm />
		</div>
	)
}

export default Page
