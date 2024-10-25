import Image from "next/image";
import AppointmentForm from "@/components/forms/AppointmentForm";
import { getPatients } from "@/lib/actions/patient.actions";

export default async function NewAppointment({ params: { userId } }: SearchParamProps) {
    const patient = await getPatients(userId)

  return (
    <div className="flex h-screen max-h-screen" >
      {/* TODO: OTP VERIFICATION */}
        <Image
        src="/assets/images/appointment-bg.jpg"
        alt="onboarding"
        width={1000}
        height={1000}
        className="side-img max-w-[400px] h-full"
      />

      <section className="remove-scrollbar container">
        <div className="sub-container max-w-[800px] py-0 flex-1">
          <Image
            src="/assets/icons/logo-full.svg"
            alt="logo"
            height={1000}
            width={1000}
            className="mb-12 h-10 w-fit"
          />

                  <AppointmentForm type="create" userId={userId} patientId={patient?.$id} />
                  
            <p className="copyright mt-10 py-12">&copy; MedHealthCatalyst</p>
        </div>
      </section>
    </div>
  );
}
