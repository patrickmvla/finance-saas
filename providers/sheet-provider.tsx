"use client";

import { useMountedState } from "react-use";

import { NewAccountSheet } from "@/modules/accounts/components/new-account-sheet";
import { EditAccountSheet } from "@/modules/accounts/components/edit-accounts-sheet";

export const SheetProvider = () => {
  const isMounted = useMountedState();

  if (!isMounted) return null;
  return (
    <>
      <NewAccountSheet />
      <EditAccountSheet />
    </>
  );
};
