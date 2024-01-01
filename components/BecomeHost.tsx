"use client";
import useListModal from "@/hooks/useListModal";
import useSearchModal from "@/hooks/useSearchModal";
import useSignInModal from "@/hooks/useSignInModal";
import React from "react";

const BecomeHost = ({ session }: { session: any }) => {
  const { onOpen: SignupOpen } = useSignInModal();
  const { onOpen } = useListModal();
  return (
    <button
      onClick={() => {
        if (!session) {
          SignupOpen();
        } else {
          onOpen();
        }
      }}
      className="hidden md:block text-left p-2  font-medium text-medium hover:bg-gray-200 transition-all rounded-full px-3"
    >
      Become a Host
    </button>
  );
};

export default BecomeHost;
