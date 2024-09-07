import { Title } from '@/components/ui/title'
import { NextPage } from 'next'
import { FormSignIn } from './_components/form-sign-in'
import Link from 'next/link'

interface Props {}

const Page: NextPage<Props> = ({}) => {
	return (
		<div className='flex flex-col gap-10'>
			<Title className='text-center'>Вход в аккаунт</Title>

			<FormSignIn />

			<div className=''>
				<p className='text-center text-sm'>
					Еще нет аккаунта?{' '}
					<Link
						href='/auth/sign-up'
						className='text-blue-500'
					>
						Создать аккаунт
					</Link>
				</p>
			</div>
		</div>
	)
}

export default Page
