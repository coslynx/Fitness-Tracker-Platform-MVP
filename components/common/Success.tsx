"use client";

import { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";

interface SuccessProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
}

export const Success = ({ isOpen, onClose, message }: SuccessProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Success">
      <p className="text-lg text-gray-700">{message}</p>
      <div className="mt-4 flex justify-end gap-2">
        <Button variant="primary" onClick={onClose}>
          Close
        </Button>
      </div>
    </Modal>
  );
};