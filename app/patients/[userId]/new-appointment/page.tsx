import Image from "next/image";
import AppointmentForm from "@/components/forms/AppointmentForm";
import { getPatient } from "@/lib/actions/patient.actions";

export default async function NewAppointment({
  params: { userId },
}: SearchParamProps) {
  const patient = await getPatient(userId);
  return (
    <div className={"flex h-screen max-h-screen"}>
      <section className={"remove-scrollbar container my-auto"}>
        <div className={"sub-container max-w-[860px] flex-1 justify-between"}>
          <Image
            src={"/assets/icons/logo-full.svg"}
            height={1000}
            width={1000}
            alt={"appointment"}
            className={"mb-12 h-10 w-fit"}
          />
          <AppointmentForm
            userId={userId}
            patientId={patient?.$id}
            type={"create"}
            setOpen={false}
          />
          <p className={"copyright mt-10 py-1"}>©copyright carepulse</p>
        </div>
      </section>

      <Image
        src={"/assets/images/appointment-img.png"}
        alt={"patient"}
        height={1000}
        width={1000}
        className={"side-img max-w-[390px] bg-bottom"}
      />
    </div>
  );
}
