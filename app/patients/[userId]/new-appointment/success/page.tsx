import React from "react";
import Image from "next/image";
import Link from "next/link";
import { getAppointment } from "@/lib/actions/appointment.actions";
import { Doctors } from "@/constants";
import { formatDateTime } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const Success = async ({
  params: { userId },
  searchParams,
}: SearchParamProps) => {
  const appointmentId = (searchParams?.appointmentId as string) || "";
  const appointment = await getAppointment(appointmentId);
  const doctor = Doctors.find(
    (doc) => doc.name === appointment.primaryPhysician,
  );

  return (
    <div className={"flex h-screen max-h-screen px-[5%]"}>
      <div className={"success-img"}>
        <Link href={"/"}>
          <Image
            src={"/assets/icons/logo-full.svg"}
            alt={"logo"}
            width={1000}
            height={1000}
            className={"h-10 w-fit"}
          />
        </Link>
        <section className={"flex flex-col items-center"}>
          <Image
            src={"/assets/gifs/success.gif"}
            alt={"success"}
            width={300}
            height={200}
          />
          <h2 className={"header mb-6 max-w-[600px] text-center"}>
            Your <span className={"text-green-500"}>appointmant request</span>{" "}
            has been successfully submitted.
          </h2>
          <p>We&apos;ll be in touch shortly to confirm</p>
        </section>

        <section className={"request-details"}>
          <p>requested appointment details:</p>
          <div className={"flex items-center gap-3"}>
            <Image
              src={doctor?.image}
              alt={"doctor"}
              width={100}
              height={100}
              className={"size-6"}
            />
            <p className={"whitespace-nowrap"}>Dr. {doctor?.name}</p>
          </div>

          <div className={"flex gap-2"}>
            <Image
              src={"/assets/icons/calendar.svg"}
              alt={"calendar"}
              height={24}
              width={24}
            />
            <p>{formatDateTime(appointment.schedule).dateTime}</p>
          </div>
        </section>
        <Button variant={"outline"} className={"shad-primary-btn"}>
          <Link href={`/patients/${userId}/new-appointment`}>
            New Appointment
          </Link>
        </Button>
        <p className={"copyright"}>©copyright carepulse</p>
      </div>
    </div>
  );
};
export default Success;
