import React from 'react'
import Image from 'next/image'
import RegisterForm from '@/components/forms/RegisterForm'
import { getUser } from '@/lib/actions/patient.actions'
import Logo from '@/components/Logo'

const Register = async ({ params: { userId } }:SearchParamProps) => {
    const user = await getUser(userId)
  return (
      <div className="flex h-screen max-h-screen" >
             <Image
        src="/assets/images/register-bg.jpg"
        alt="onboarding"
        width={1000}
        height={1000}
        className="side-img max-w-[390px] h-full"
      />
      <section className="remove-scrollbar container">
        <div className="sub-container max-w-[800px] ">
          <Logo/>

                  <RegisterForm user={ user} />
                  
            <p className="copyright py-12">&copy; MedHealthCatalyst</p>
        </div>
      </section>
    </div>
  )
}

export default Register
