"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { ReactNode } from "react";

type ModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  children: ReactNode;
  description?: string;
};

export default function Modal({
  open,
  onOpenChange,
  title,
  children,
  description,
}: ModalProps) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm transition-opacity animate-fade-in" />

        <Dialog.Content className="fixed top-1/2 left-1/2 z-50 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white/80 backdrop-blur-lg p-6 shadow-2xl transition-all duration-300 animate-slide-up border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            {title && (
              <Dialog.Title className="text-2xl font-semibold text-gray-900 tracking-tight">
                {title}
              </Dialog.Title>
            )}
            <Dialog.Close asChild>
              <button
                className="rounded-full p-1.5 hover:bg-gray-200 transition"
                aria-label="Close"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </Dialog.Close>
          </div>

          {description && (
            <Dialog.Description className="text-sm text-gray-600 mb-6">
              {description}
            </Dialog.Description>
          )}

          <div className="text-base text-gray-800 space-y-4">{children}</div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
