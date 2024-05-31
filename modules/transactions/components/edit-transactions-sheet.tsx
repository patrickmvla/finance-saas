import { z } from "zod";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import { useEditAccount } from "@/modules/accounts/api/use-edit-account";
import { useGetAccount } from "@/modules/accounts/api/use-get-account";
import { AccountForm } from "@/modules/accounts/components/account-form";
import { useOpenAccount } from "@/modules/accounts/hooks/use-open-account";
import { useDeleteAccount } from "@/modules/accounts/api/use-delete-account";

import { insertTransactionSchema } from "@/db/schema";
import { Loader } from "lucide-react";
import { useConfirm } from "@/hooks/use-confirm";
import { useOpenTransaction } from "../hooks/use-open-account";
import { useGetTransaction } from "../api/use-get-transaction";
import { useEditTransaction } from "../api/use-edit-transaction";
import { useDeleteTransaction } from "../api/use-delete-transaction";

const formSchema = insertTransactionSchema.omit({
  id: true,
});

type FormValues = z.input<typeof formSchema>;

export const EditTransactionSheet = () => {
  const { isOpen, onClose, id } = useOpenTransaction();

  const [ConfirmDialog, confirm] = useConfirm(
    "Are you sure?",
    "You are about to delete this Transaction"
  );

  const transactionQuery = useGetTransaction(id);
  const editMutation = useEditTransaction(id);
  const deleteMutation = useDeleteTransaction(id);

  const isLoading = transactionQuery.isLoading;

  const isPending = editMutation.isPending || deleteMutation.isPending;

  const onSubmit = (values: FormValues) => {
    editMutation.mutate(values, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  const onDelete = async () => {
    const ok = await confirm();

    if (ok) {
      deleteMutation.mutate(undefined, {
        onSuccess: () => {
          onClose();
        },
      });
    }
  };

  const defaultValues = transactionQuery.data
    ? {
        name: transactionQuery.data.id,
      }
    : {
        name: "",
      };

  return (
    <>
      <ConfirmDialog />
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent className="space-y-4">
          <SheetHeader>
            <SheetTitle>Edit Transaction</SheetTitle>
            <SheetDescription>Edit an existing Transaction</SheetDescription>
          </SheetHeader>
          {isLoading ? (
            <div className="absolute insert-0 flex items-center justify-center">
              <Loader className="size-4 text-muted-foreground animate-spin" />
            </div>
          ) : (
           <p>Tform</p>
          )}
        </SheetContent>
      </Sheet>
    </>
  );
};
