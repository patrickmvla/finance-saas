"use client";

import { Button } from "@/components/ui/button";
import { useNewAccount } from "@/modules/accounts/hooks/use-new-account";

const DashboardPage = () => {
  const { onOpen } = useNewAccount();
  return <Button onClick={onOpen}>Add an account</Button>;
};

export default DashboardPage;
