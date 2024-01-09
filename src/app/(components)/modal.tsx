"use client";

import { Dialog } from "@/ui/dialog";

import type { FC, ReactNode } from "react";
import { useRouter } from "next/navigation";


export default function Modal({children}) {
  const router = useRouter();

  function handleClose() {
      router.back();
  };

  return (
    <Dialog open onClose={handleClose}>
          {children}
    </Dialog>
  );
};