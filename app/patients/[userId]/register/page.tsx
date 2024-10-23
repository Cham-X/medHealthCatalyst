import React from 'react'
import Image from 'next/image'
import RegisterForm from '@/components/forms/RegisterForm'
import { getUser } from '@/lib/actions/patient.actions'

const Register = async ({ params: { userId } }:SearchParamProps) => {
    const user = await getUser(userId)
  return (
      <div className="flex h-screen max-h-screen" >
             <Image
        src="/assets/images/register-img.png"
        alt="onboarding"
        width={1000}
        height={1000}
        className="side-img max-w-[390px] h-full"
      />
      <section className="remove-scrollbar container">
        <div className="sub-container max-w-[800px] ">
          <Image
            src="/assets/icons/logo-full.svg"
            alt="logo"
            height={1000}
            width={1000}
            className="mb-12 h-10 w-fit"
          />

                  <RegisterForm user={ user} />
                  
            <p className="copyright py-12">&copy; MedHealthCatalyst</p>
        </div>
      </section>
    </div>
  )
}

export default Register
