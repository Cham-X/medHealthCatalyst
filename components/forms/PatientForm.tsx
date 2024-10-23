"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form } from "@/components/ui/form"
import CustomFormField from "../ui/CustomFormField"
import SubmitButton from "../ui/SubmitButton"
import { UserFormValidation } from "@/lib/validation"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { createUsers } from "@/lib/actions/patient.actions"


export enum FormFieldType {
    INPUT = "input",
    TEXTAREA = "textarea",
    PHONE_INPUT = "phoneInput",
    CHECKBOX = "checkbox",
    DATE_PICKER = "datePicker",
    SELECT = "select",
    SKELETON="skeleton"
}
 

 
const PatientForm = () => {
    const router = useRouter()
    const [isloading,setIsLoading] = useState(false)
    // 1. Define your form.
    const form = useForm<z.infer<typeof UserFormValidation>>({
        resolver: zodResolver(UserFormValidation),
        defaultValues: {
            name: "",
            email: "",
            phone:""
        },
    })
 
    // 2. Define a submit handler.
    async function onSubmit({name, email, phone}: z.infer<typeof UserFormValidation>) {
        setIsLoading(true)

        try {
            console.log("hi")
            const userData = { name, email, phone };
            
            const user = await createUsers(userData)

            if(user) router.push(`/patients/${user.$id}/register`)
        } catch (error) {
            console.log(error)
        }
    }

    return (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1 text-dark-700">
                <section className="mb-12 space-y-4">
                    <h1 className="header">Hi there 👋</h1>
                    <p className="text-dark-700">Schedule your first appointment</p>
                </section>
                <CustomFormField
                    fieldType={FormFieldType.INPUT}
                    control={form.control}
                    name="name"
                    label="Full name"
                    placeholder="Shamsudeen Zakariyyah"
                    iconSrc="/assets/icons/user.svg"
                    iconAlt="user"
                />
                <CustomFormField
                    fieldType={FormFieldType.INPUT}
                    control={form.control}
                    name="email"
                    label="email"
                    placeholder="zakariyyahshamsudeen@gmail.com"
                    iconSrc="/assets/icons/email.svg"
                    iconAlt="email"
                />
                <CustomFormField
                    fieldType={FormFieldType.PHONE_INPUT}
                    control={form.control}
                    name="phone"
                    label="phone number"
                    placeholder="+234 7019033392"
                />

                <SubmitButton isloading={isloading}>Get Started</SubmitButton>
      </form>
    </Form>
    )
}

export default PatientForm
