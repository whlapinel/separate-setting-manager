import { useFormStatus } from "react-dom";
import { Button } from "@/ui/button";
import clsx from "clsx";
import { MouseEventHandler } from "react";

export function SubmitButton({className, children }: {className?: string, children?: React.ReactNode }) {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" aria-disabled={pending} className={clsx([
      className,
    ])}>
      {pending?'Submitting...':'Submit'}
    </Button>
  );
}