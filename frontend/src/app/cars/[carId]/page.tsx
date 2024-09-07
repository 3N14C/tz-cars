import { NextPage } from 'next'
import { CarPage } from './_components/car-page'

interface Props {
  params: {
    carId: string
  }
}

const Page: NextPage<Props> = ({params}) => {
  return <div>
    <CarPage carId={params.carId} />
  </div>
}

export default Page
