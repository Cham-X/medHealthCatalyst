import { DataTable } from '@/components/table/DataTable'
import { columns } from '@/components/table/column'
import StatCard from '@/components/StatCard'
import { getRecentAppointmentList } from '@/lib/actions/appointment.action'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

  const data =  [
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
]


const Admin = async() => {
const appointments = await getRecentAppointmentList()
  return (
    <div className='mx-auto flex max-w-7xl flex-col space-y-14 text-dark-700'>
          <header className='admin-header'>
              <Link href="/" className='cursor-pointer'>
                  <Image
                      src="/assets/icons/logo-full.svg"
                      height={32}
                      width={162}
                      alt='logo'
                      className='h-8 w-fit'
                  />
              </Link>
              <p className='text-16-bold'>Admin Dashboard</p>
          </header>
          
          <main className='admin-main'>
              <section className='w-full space-y-4'>
                  <h1 className='header'>Welcome 👋</h1>
                  <p className='text-dark-700'> Start the day with managing new appointment</p>
              </section>

              <section className='admin-stat'>
                  <StatCard
                      type="appointment"
                      count={appointments.scheduledCount}
                      label="Scheduled appointment"
                      icon="/assets/icons/appointments.svg"
                  />
                  <StatCard
                      type="pending"
                      count={appointments.pendingCount}
                      label="Pending appointment"
                      icon="/assets/icons/Pending.svg"
                  />
                  <StatCard
                      type="cancelled"
                      count={appointments.cancelledCount}
                      label="Cancelled appointment"
                      icon="/assets/icons/cancelled.svg"
                  />
              </section>

              <DataTable columns={columns } data={ appointments.document} />

          </main>
    </div>
  )
}

export default Admin;