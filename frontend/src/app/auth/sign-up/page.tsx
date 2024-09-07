import { NextPage } from 'next'
import { FormSignUp } from './_components/form-sign-up'
import { Title } from '@/components/ui/title'
import Link from 'next/link'

interface Props {}

const Page: NextPage<Props> = ({}) => {
	return (
		<div className='flex flex-col gap-10'>
			<Title className='text-center'>Создать аккаунт</Title>
			<FormSignUp />

      <div className="">
        <p className="text-center text-sm">
          Уже есть аккаунт?{' '}
          <Link
            href="/auth/sign-in"
            className="text-blue-500"
          >
            Войти
          </Link>
        </p>
      </div>
		</div>
	)
}

export default Page
