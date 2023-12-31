import { useFormStatus } from "react-dom";
import { Button } from "@/ui/button";
import clsx from "clsx";

export function SubmitButton({className}: {className?: string}) {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" aria-disabled={pending} className={clsx([
      className,
    ])}>
      {pending?'Submitting...':'Submit'}
    </Button>
  );
}