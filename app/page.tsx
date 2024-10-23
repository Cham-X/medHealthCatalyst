import PatientForm from "@/components/forms/PatientForm";
import PassKeyModal from "@/components/PassKeyModal";
import Image from "next/image";
import Link from "next/link";

export default function Home({ searchParams }: SearchParamProps) {
  const isAdmin = searchParams?.admin === "true";
  return (
    <div className="flex h-screen max-h-screen text-dark-700" >
      {/* TODO: OTP VERIFICATION */}
      {isAdmin && <PassKeyModal/>}
        <Image
        src="/assets/images/onboarding-img.png"
        alt="onboarding"
        width={1000}
        height={1000}
        className="side-img max-w-[50%] h-full"
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

          <PatientForm />
          
          <div className="text-14-regular mt-20 py-10 flex justify-between">
            <p className="justify-items-end text-dark-600 xl:text-left">&copy; MedHealthCatalyst</p>
            <Link href="/?admin=true" className="text-green-500">Admin</Link>
          </div>
        </div>
      </section>
    </div>
  );
}