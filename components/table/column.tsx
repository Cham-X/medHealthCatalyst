"use client"

import { ColumnDef } from "@tanstack/react-table"
import StatusBadge from "../StatusBadge"
import { formatDateTime } from "@/lib/utils"
import { Doctors } from "@/constants"
import Image from "next/image"
import AppointmentModal from "../AppointmentModal"
import { Appointment } from "@/types/appwrites.types"


// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.



export const columns: ColumnDef<Appointment>[] = [
  {
    header: "ID",
    cell: ({ row }) => <p className="text-14-medium">{row.index + 1 }</p>
  },
  {
    accessorKey: "patient",
    header: "Patient",
    cell: ({ row }) =>  <p className="text-14-medium">{row.original.patient.name }</p>
    
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (<div className="min-w-[115px]">
      <StatusBadge status={ row.original.status} />
    </div>)
    
  },
  {
    accessorKey: "schedule",
    header: "Appointment",
    cell: ({ row }) => (<p className="text-14-regular">
      {formatDateTime(row.original.schedule).dateTime}
    </p>)
    
  },
  {
    accessorKey: "primaryPhysician",
    header: "Doctor",
    cell: ({ row }) => {
      const doctor = Doctors.find((doc) => doc.name === row.original.primaryPhysician)
      const docImage = doctor?.image;
      return (
        <div className="flex items-center gap-3 pr-4">
          <Image
            src={docImage!}
            alt={"doctor"}
            width={100}
            height={100}
            className="size-8"
          />
          <p className="whitespace-nowrap">Dr. {doctor?.name }</p>
        </div>
      )
    }
  },
    {
    id: "actions",
      header: () => <div className="pl-4">Action</div>,
      cell: ({ row:{original:data} }) => {
        return (
          <div className="flex gap-1">
            <AppointmentModal type="schedule"
              patientId={data.patient.$id}
              userId={data.userId}
              appointment={data}
              // title="Schedule Appointment"
              // decription="Please confirm the following schedule"
            />
            <AppointmentModal type="cancel"
              patientId={data.patient.$id}
              userId={data.userId}
              appointment={data}
                // title="Cancel Appointment"
                // description="Are you sure you want to cancel this appointment?"
              />
            </div>
     )
   }
  },
]

   
