'use server'

import { DATABASE_ID, APPOINTMENT_COLLECTION_ID, databases } from "../appwrite.config";
import { ID, Query } from "node-appwrite";
import { parseStringify } from "../utils";
import { Appointment } from "@/types/appwrites.types";
import { revalidatePath } from "next/cache";


export const createAppointment = async (appointment: CreateAppointmentParams) => {
    try {
            const newAppointment = await databases.createDocument(
      DATABASE_ID!,
      APPOINTMENT_COLLECTION_ID!,
      ID.unique(),
       appointment
    );
        console.log("this is from the server:", newAppointment)

        return parseStringify(newAppointment)
    } catch (error) {
        console.log("Error while creating appointment",error)
    }
}

export const getAppointment = async (appointmentId: string) => {
   try {
       const appointment = await databases.getDocument(
           DATABASE_ID!,
           APPOINTMENT_COLLECTION_ID!,
           appointmentId,
       )
       
       return parseStringify(appointment)
   } catch (error) {
    console.log("Error trying to get appointment", error)
   }
}

export const getRecentAppointmentList = async () => {
        console.log(DATABASE_ID)

    try {
        const appointment = await databases.listDocuments(
            DATABASE_ID!,
            APPOINTMENT_COLLECTION_ID!,
            [Query.orderDesc('$createdAt')]
        );

        const initialCounts = {
            scheduledCount: 0,
            pendingCount: 0,
            cancelledCount: 0,
        }

        const counts = (appointment.documents as Appointment[]).reduce(
            (acc, appointment) => {
                switch (appointment.status) {
                    case "scheduled":
                        acc.scheduledCount++;
                        break;
                    case "pending":
                        acc.pendingCount++;
                        break;
                    case "cancelled":
                        acc.cancelledCount++;
                        break;
                }
                return acc;
            },
            initialCounts
        );
        
        const data = {
            totalCount: appointment.total,
            ...counts,
            document:appointment.documents,
        }
        return parseStringify(data)

    } catch (error) {
        console.log("Error trying to get recent appointment list", error)
    }
}

export const updateAppointment = async ({appointmentId,appointment}:UpdateAppointmentParams) => {
    try {
        const updatedAppointment = await databases.updateDocument(
            DATABASE_ID!,
            APPOINTMENT_COLLECTION_ID!,
            appointmentId!,
            appointment,
        )
        if (!updatedAppointment) {
            throw new Error('Appointment not found')
        }

        // SMS NOTIFICATION
        revalidatePath('/admin')
    return parseStringify(updatedAppointment)
    } catch (error) {
        console.log('Error trying to update appointment',error)
    }
}