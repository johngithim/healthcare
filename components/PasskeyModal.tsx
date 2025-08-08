"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const PasskeyModal = () => {
  const router = useRouter();
  const [open, setOpen] = useState(true);
  const [passKey, setPassKey] = useState("");
  const [error, setError] = useState("");

  const validatePasskey = (
    error: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    error.preventDefault();
    if (passKey === process.env.NEXT_PUBLIC_ADMIN_PASSKEY) {
    }
  };

  const closeModal = () => {
    setOpen(false);
    router.push("/");
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent className={"shad-alert-dialog"}>
        <AlertDialogHeader>
          <AlertDialogTitle className={"flex items-start justify-between"}>
            Admin Access Verification
            <Image
              src={"/assets/icons/close.svg"}
              alt={"close"}
              width={20}
              height={20}
              onClick={() => closeModal()}
              className={"cursor-pointer"}
            />
          </AlertDialogTitle>
          <AlertDialogDescription>
            To access the admi page, please enter the passkey.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div>
          <InputOTP
            maxLength={6}
            value={passKey}
            onChange={(value) => setPassKey(value)}
          >
            <InputOTPGroup className={"shad-otp"}>
              <InputOTPSlot className={"shad-otp-slot"} index={0} />
              <InputOTPSlot className={"shad-otp-slot"} index={1} />
              <InputOTPSlot className={"shad-otp-slot"} index={2} />
              <InputOTPSlot className={"shad-otp-slot"} index={3} />
              <InputOTPSlot className={"shad-otp-slot"} index={4} />
              <InputOTPSlot className={"shad-otp-slot"} index={5} />
            </InputOTPGroup>
          </InputOTP>
          {error && (
            <p
              className={"shad-error text-14-regular mt-4 flex justify-center"}
            >
              {error}
            </p>
          )}
        </div>
        <AlertDialogFooter>
          <AlertDialogAction
            onClick={(e) => validatePasskey(e)}
            className={"shad-primary-btn w-full"}
          >
            Enter Admin Passkey
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
export default PasskeyModal;
