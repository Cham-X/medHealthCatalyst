"use client"

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp"
import { decryptKey, encryptKey } from '@/lib/utils'




const PassKeyModal = () => {
    const [open, setOpen] = useState(true)
    const [passKey, setPassKey] = useState("")
    const [error, setError] = useState("")

    const path = usePathname()
    const router = useRouter()

    const encryptedKey = typeof window !== "undefined" ? window.localStorage.getItem('accessKey') : null;

    useEffect(() => {
        const accessKey = encryptedKey && decryptKey(encryptedKey);

        if (path) {
            if (accessKey === process.env.NEXT_PUBLIC_ADMIN_PASSKEY) {
                setOpen(false)
                router.push("/admin")
            } else {
                setOpen(true)
            }
        }
    }, [encryptedKey])


    const closeModal = () => {
        setOpen(false)
        router.push("/")
    }

    const validatePassKey = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
        e.preventDefault()

        if (passKey === process.env.NEXT_PUBLIC_ADMIN_PASSKEY) {
            const encryptedKey = encryptKey(passKey)

            localStorage.setItem("accessKey", encryptedKey)

            setOpen(false)
        } else {
            setError('Invalid passkey. Please try again')
        }
    }

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogContent className='text-dark-700 shad-alert-dialog'>
                <AlertDialogHeader>
                    <AlertDialogTitle className='flex items-start justify-between '>
                        Admin Access Verification
                        <Image
                            src="/assets/icons/close.svg"
                            width={20}
                            height={20}
                            alt='close'
                            onClick={() => closeModal()}
                            className='cursor-pointer'
                        />
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        To access the admin page, please enter the pass key
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <div>
                    <InputOTP maxLength={6} value={passKey} onChange={(value) => setPassKey(value)}>
                        <InputOTPGroup className='shad-otp'>
                            <InputOTPSlot className='shad-otp-slot' index={0} />
                            <InputOTPSlot className='shad-otp-slot' index={1} />
                            <InputOTPSlot className='shad-otp-slot' index={2} />
                            <InputOTPSlot className='shad-otp-slot' index={3} />
                            <InputOTPSlot className='shad-otp-slot' index={4} />
                            <InputOTPSlot className='shad-otp-slot' index={5} />
                        </InputOTPGroup>
                    </InputOTP>
                    {error && <p className='shad-error text-14-regular mt-4 flex justify-center'>{error}</p>}
                </div>
                <AlertDialogFooter>
                    <AlertDialogAction
                        onClick={(e) => validatePassKey(e)}
                        className='shad-primary-btn w-full'
                    >
                        Enter Admin Passkey
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default PassKeyModal