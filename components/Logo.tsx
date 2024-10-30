import Image from 'next/image'
import React from 'react'

const Logo = () => {
  return (
      <div
          className='flex items-center space-x-2 cursor-pointer text-white whitespace-nowrap mb-12 h-10 w-fit'
      >
          <div className=' bg-gray-300 p-1 rounded-md'>
                   <Image
                src="/assets/images/heart-handshake.svg"
                height={24}
                width={30}
                alt='logo'
                className='h-8  flex flex-1 '
          />       
          </div>  
          <h3 className='text-2xl'>
            Med<span className='text-green-200'>Health</span><span className='text-blue-300'>Catalyst</span>
          </h3>
    </div>
  )
}

export default Logo
