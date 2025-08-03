"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import CustomFormField from "@/components/CustomFormField";

export enum FormFieldType {
    INPUT = 'input',
    TEXTAREA = 'textarea',
    CHECKBOX = 'checkbox',
    PHONE_INPUT = 'phoneInput',
    DATE_PICKER = 'datePicker',
    SELECT = 'select',
    SKELETON = 'skeleton',


}

const formSchema = z.object({
  username: z.string().min(2).max(50),
});

const PatientForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
        <section className={"mb-12 space-y-4"}>
          <h1 className={"header"}>Hi there👋</h1>
          <p className={"text-dark-700"}>Schedule your first appointment</p>
        </section>

        <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name={"name"}
            label={"Full name"}
            placeholder={"JohnDoe"}
            iconSrc={"/assets/icons/user.svg"}
            iconAlt={"user"}
        />
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

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};
export default PatientForm;
