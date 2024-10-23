import React from 'react'
import { Button } from './button'
import Image from 'next/image'

interface ButtonProps{
    isloading: boolean,
    children?: React.ReactNode
    className?:string
}

const SubmitButton = ({isloading,children,className}:ButtonProps) => {
  return (
      <Button type='submit' disabled={isloading} className={className ?? "shad-primary-btn w-full"}>
          {isloading ? (
              <div className='flex items-center gap-4' >
                  <Image
                      src="/assets/icons/loader.svg"
                      alt='loader'
                      width={24}
                      height={24}
                      className='animate-spin'
                  />
                  Loading ...
              </div>
          ):children}
   </Button>
  )
}

export default SubmitButton
