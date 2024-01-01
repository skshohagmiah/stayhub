"use client";
import React, { useEffect, useState } from "react";
import { RxCross1 } from "react-icons/rx";
import useSignInModal from "@/hooks/useSignInModal";
import { FaGoogle } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { signIn } from "next-auth/react";

const SignInModal = () => {
  const { isOpen, onClose } = useSignInModal();

  if (isOpen) {
    return (
      <div className="fixed inset-0 h-full w-full flex items-center justify-center z-50  bg-white/70">
        <div className=" max-w-full bg-white shadow-lg rounded-xl m-2 overflow-scroll sm:p-4">
          <div className="flex items-center justify-between px-4 py-2">
            <p className="text-xl text-rose-500 font-medium capitalize">
              Sign In
            </p>
            <div onClick={onClose}>
              <RxCross1 className="hover:opacity-40" />
            </div>
          </div>
          <small className="p-4 capitalize">To Continue your Journay</small>
          <div className="flex flex-col gap-4 p-4">
            <div
              onClick={() => signIn("google", { redirect: false })}
              className="flex gap-4 py-2 px-4 items-center justify-center text-lg  rounded-md bg-rose-600 hover:opacity-40  text-white duration-150 transition"
            >
              <FaGoogle className="w-8 h-8" />
              <h3 className="text-xl ">Sign In With Google</h3>
            </div>
            <div
              onClick={() => signIn("github", { redirect: false })}
              className="flex gap-4 py-2 px-4 items-center justify-center text-lg bg-black text-white rounded-md hover:opacity-40 duration-150 transition"
            >
              <FaGithub className="w-8 h-8" />
              <h3 className="text-xl ">Sign In With Github</h3>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

export default SignInModal;
