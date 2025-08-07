"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl } from "@/components/ui/form";
import CustomFormField from "@/components/CustomFormField";
import SubmitButton from "@/components/SubmitButton";
import { useState } from "react";
import { UserFormValidation } from "@/lib/validation";
import { useRouter } from "next/navigation";
import { createUser } from "@/lib/actions/patient.actions";
import { FormFieldType } from "@/components/forms/PatientForm";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Doctors, GenderOptions, IdentificationTypes } from "@/constants";
import { Label } from "@/components/ui/label";
import { SelectItem } from "@/components/ui/select";
import Image from "next/image";
import FileUploader from "@/components/FileUploader";

const RegisterForm = ({ user }: { user: User }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  });

  async function onSubmit({
    name,
    email,
    phone,
  }: z.infer<typeof UserFormValidation>) {
    setIsLoading(true);

    try {
      const userData = { name, email, phone };

      const user = await createUser(userData);

      if (user) router.push(`/patients/${user.$id}/register`);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-12 flex-1"
      >
        <section className={"space-y-4"}>
          <h1 className={"header"}>Welcome👋</h1>
          <p className={"text-dark-700"}>Let us know more about yourself</p>
        </section>

        <section className={"space-y-6"}>
          <div className={"mb-9 space-y-1"}>
            <h2 className={"sub-header"}>Personal Information</h2>
          </div>
        </section>

        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name={"name"}
          label={"Full Name"}
          placeholder={"JohnDoe"}
          iconSrc={"/assets/icons/user.svg"}
          iconAlt={"user"}
        />

        <div className={"flex flex-col gap-6 xl:flex-row"}>
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name={"email"}
            label={"Email"}
            placeholder={"johndoe@gmail.com"}
            iconSrc={"/assets/icons/email.svg"}
            iconAlt={"email"}
          />
          <CustomFormField
            fieldType={FormFieldType.PHONE_INPUT}
            control={form.control}
            name={"phone"}
            label={"Phone"}
            placeholder={"+251 9 543 421"}
          />
        </div>

        <div className={"flex flex-col gap-6 xl:flex-row"}>
          <CustomFormField
            fieldType={FormFieldType.DATE_PICKER}
            control={form.control}
            name={"birthDate"}
            label={"Date of Birth"}
          />
          <CustomFormField
            fieldType={FormFieldType.SKELETON}
            control={form.control}
            name={"Gender"}
            label={"Gender"}
            renderSkeleton={(field) => (
              <FormControl>
                <RadioGroup
                  className={"flex h-11 gap-6 xl:justify-between"}
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  {GenderOptions.map((option) => (
                    <div key={option} className={"radio-group"}>
                      <RadioGroupItem value={option} id={option} />
                      <Label htmlFor={option} className={"cursor-pointer"}>
                        {option}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </FormControl>
            )}
          />
        </div>

        <div className={"flex flex-col gap-6 xl:flex-row"}>
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name={"address"}
            label={"Address"}
            placeholder={"Wawel St, Addis Ababa"}
          />
        </div>

        <div className={"flex flex-col gap-6 xl:flex-row"}>
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name={"occupation"}
            label={"Occupation"}
            placeholder={"Software Engineer"}
          />
        </div>

        <div className={"flex flex-col gap-6 xl:flex-row"}>
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name={"emergencyContactName"}
            label={"Emergency contact name"}
            placeholder={"Guardian's Name"}
          />
          <CustomFormField
            fieldType={FormFieldType.PHONE_INPUT}
            control={form.control}
            name={"emergencyContactNumber"}
            label={"Emergency contact number"}
            placeholder={"+251 9 543 234"}
            iconSrc={"/assets/icons/email.svg"}
            iconAlt={"email"}
          />
        </div>

        <section className={"space-y-6"}>
          <div className={"mb-9 space-y-1"}>
            <h2 className={"sub-header"}>Medical Information</h2>
          </div>
        </section>

        <CustomFormField
          fieldType={FormFieldType.SELECT}
          control={form.control}
          name={"primaryPhysician"}
          label={"primary Physician"}
          placeholder={"select a physician"}
        >
          {Doctors.map((doctor) => (
            <SelectItem key={doctor.name} value={doctor.name}>
              <div className={"flex cursor-pointer items-center gap-2"}>
                <Image
                  src={doctor.image}
                  width={32}
                  height={32}
                  alt={doctor.name}
                  className={"rounded-full border border-dark-500"}
                />
                <p>{doctor.name}</p>
              </div>
            </SelectItem>
          ))}
        </CustomFormField>

        <div className={"flex flex-col gap-6 xl:flex-row"}>
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name={"insuranceProvider"}
            label={"Insurance Provider"}
            placeholder={"BlueCross BlueShield"}
          />
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name={"insurancePolicyNumber"}
            label={"Insurance Policy Number"}
            placeholder={"ABC123456789"}
          />
        </div>
        <div className={"flex flex-col gap-6 xl:flex-row"}>
          <CustomFormField
            fieldType={FormFieldType.TEXTAREA}
            control={form.control}
            name={"allergies"}
            label={"Allergies (is any)"}
            placeholder={"Pollen, asthmal, skin conditions, cockroaches"}
          />
          <CustomFormField
            fieldType={FormFieldType.TEXTAREA}
            control={form.control}
            name={"currentMedication"}
            label={"Current medication (if any)"}
            placeholder={"Paracetamol 500mg"}
          />
        </div>
        <div className={"flex flex-col gap-6 xl:flex-row"}>
          <CustomFormField
            fieldType={FormFieldType.TEXTAREA}
            control={form.control}
            name={"familyMedicalHistory"}
            label={"Family medical hs=istory"}
            placeholder={"Mother had... and father had..."}
          />
          <CustomFormField
            fieldType={FormFieldType.TEXTAREA}
            control={form.control}
            name={"pastMedicalHistory"}
            label={"Past Medical History"}
            placeholder={"respiratory infections, malaria, tuberculosis"}
          />
        </div>

        <section className={"space-y-6"}>
          <div className={"mb-9 space-y-1"}>
            <h2 className={"sub-header"}>Identification and verification</h2>
          </div>
        </section>

        <CustomFormField
          fieldType={FormFieldType.SELECT}
          control={form.control}
          name={"identificationType"}
          label={"Identification Type"}
          placeholder={"select an identification type"}
        >
          {IdentificationTypes.map((type) => (
            <SelectItem key={type} value={type}>
              {type}
            </SelectItem>
          ))}
        </CustomFormField>

        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name={"identificationNmber"}
          label={"Identification Number"}
          placeholder={"1234567890"}
        />

        <CustomFormField
          fieldType={FormFieldType.SKELETON}
          control={form.control}
          name={"identificationDocument"}
          label={"Scanned copy of your document"}
          renderSkeleton={(field) => (
            <FormControl>
              <FileUploader files={field.value} onChange={field.onChange} />
            </FormControl>
          )}
        />

        <section className={"space-y-6"}>
          <div className={"mb-9 space-y-1"}>
            <h2 className={"sub-header"}>Concent and Privacy</h2>
          </div>
        </section>

        <CustomFormField
          control={form.control}
          fieldType={FormFieldType.CHECKBOX}
          name={"treatmentConsent"}
          label={"I consent to recieve treatment for my health condition"}
        />
        <CustomFormField
          control={form.control}
          fieldType={FormFieldType.CHECKBOX}
          name={"disclosureConsent"}
          label={
            "I consent to the use and disclosure of my health information for treatment purpose"
          }
        />
        <CustomFormField
          control={form.control}
          fieldType={FormFieldType.CHECKBOX}
          name={"privacyConsent"}
          label={"I consent to privacy policy"}
        />

        <SubmitButton>Get started</SubmitButton>
      </form>
    </Form>
  );
};
export default RegisterForm;
