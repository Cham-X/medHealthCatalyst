"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Form } from "@/components/ui/form"
import CustomFormField from "../ui/CustomFormField"
import SubmitButton from "../ui/SubmitButton"
import { SelectItem } from "../ui/select"
import { Doctors } from "@/constants"
import Image from "next/image"


import { getAppointmentSchema } from "@/lib/validation"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { FormFieldType } from "./PatientForm"
import { createAppointment,updateAppointment } from "@/lib/actions/appointment.action"
import { Appointment } from "@/types/appwrites.types"


 
const AppointmentForm = ({type,userId,patientId,appointment,setOpen}:{patientId:string, userId:string, type:"create" | "cancel" | "schedule",appointment:Appointment,setOpen:(open:boolean) => void}) => {
    const router = useRouter()
    const [isloading, setIsLoading] = useState(false)
    
    const appointmentFormValidation = getAppointmentSchema(type)

    // 1. Define your form.
    const form = useForm<z.infer<typeof appointmentFormValidation>>({
        resolver: zodResolver(appointmentFormValidation),
        defaultValues: {
            userId,
            primaryPhysician: appointment?.primaryPhysician || "",
            schedule:appointment?new Date(appointment.schedule!) :new Date(Date.now()),
            reason:appointment?.reason || "",
            note: appointment?.note || "",
            cancellationReason:appointment?.cancellationReason || "",
        },
    })
 
    // 2. Define a submit handler.
   const onSubmit =  async(values: z.infer<typeof appointmentFormValidation>) => {
     setIsLoading(true)

          let status;
        switch (type) {
               case "cancel":
                  status="cancelled"
                   break;
               case "schedule":
                   status = "scheduled"
                   break;
                default:
                   status = "pending";
                   break;
       }
       
       try {
           if (type === "create" && patientId) {
                const appointmentData = {
                userId,
                patient: patientId,
                primaryPhysician: values.primaryPhysician,
                schedule: new Date(values.schedule),
                reason: values.reason!,
                note: values.note,
                status:status as Status,
               }
               
               
             const appointment = await createAppointment(appointmentData)
             console.log(appointment.status)
               if (appointment) {
                   form.reset();
                   router.push(`/patients/${userId}/new-appointment/success?appointmentId=${appointment.$id}`)
               }

           } else {
             const appointmentToUpdate = {
               userId,
               appointmentId: appointment?.$id,
               appointment: {
                 primaryPhysician: values?.primaryPhysician,
                 schedule: new Date(values?.schedule),
                 status: status as Status,
                 cancellationReason:values?.cancellationReason,
               },
               type
             }

             const updatedAppointment = await updateAppointment(appointmentToUpdate);
             if (updatedAppointment) {
               if(setOpen){ setOpen(false)} 
               form.reset()
             }
           }
       } catch (error) {
        console.log(error)
       }
    }

    let buttonLabel
    switch (type) {
        case "cancel":
            buttonLabel="Cancel Appointment"
            break;
        case "create":
            buttonLabel = "Create Appointment"
            break;
        case "schedule":
            buttonLabel = "Schedule Appointment"
            break;
        default:
            break;
    }

    return (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1 text-dark-700">
          {type === "create" && (
            <section className="mb-12 space-y-4">
                    <h1 className="header">New Appointment</h1>
                    <p className="text-dark-700">Request new appointment in 10 seconds</p>
                </section>
               )} 
                {type !== "cancel" ? (
                    <>
                    <CustomFormField
                            fieldType={FormFieldType.SELECT}
                            control={form.control}
                            name="primaryPhysician"
                            label="Doctor"
                            placeholder="Select a doctor"
                        >
                            
            {Doctors.map((doctor, i) => (
              <SelectItem key={doctor.name + i} value={doctor.name}>
                <div className="flex cursor-pointer items-center gap-2">
                  <Image
                    src={doctor.image}
                    width={32}
                    height={32}
                    alt="doctor"
                    className="rounded-full border border-dark-500"
                  />
                  <p>{doctor.name}</p>
                </div>
              </SelectItem>
            ))}
                        </CustomFormField>
                        <CustomFormField
                             fieldType={FormFieldType.DATE_PICKER}
                            control={form.control}
                            name="schedule"
                            label="Expected appointment date"
                            showTimeSelect
                            dateFormat="MM/dd/yyyy - h:mm aa"
                            
                        />
                          <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField
              fieldType={FormFieldType.TEXTAREA}
              control={form.control}
              name="reason"
              label="Reason for appointment"
              placeholder="Enter reason for appointment"
            />

            <CustomFormField
              fieldType={FormFieldType.TEXTAREA}
              control={form.control}
              name="note"
              label="Note"
              placeholder="Enter notes"
            />
          </div>
                    </>
                ) : (
                        <>
                          <CustomFormField
              fieldType={FormFieldType.TEXTAREA}
              control={form.control}
              name="cancellationReason"
              label="Reason for cancellation"
              placeholder="Enter reason for cancellation"
            />
                        </>
                )}
                <SubmitButton isloading={isloading} className={`${type === 'cancel' ? 'shad-danger-btn' : "shad-primary-btn"} w-full`}>
                    {buttonLabel}
             </SubmitButton>
      </form>
    </Form>
    )
}

export default AppointmentForm
