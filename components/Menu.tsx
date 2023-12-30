"use client";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { IoIosMenu } from "react-icons/io";
import BecomeHost from "./BecomeHost";
import Link from "next/link";
import useListModal from "@/hooks/useListModal";
import useSignInModal from "@/hooks/useSignInModal";
import { signOut } from "next-auth/react";

interface MenuProps {
  session: any;
}

const Menu = ({ session }: MenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { onOpen } = useListModal();
  const { onOpen: signInOpen } = useSignInModal();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: any) => {
      if (!containerRef.current?.contains(e.target)) {
        setIsOpen(false);
      } else {
        return;
      }
    };
    window.addEventListener("click", handleClick);

    return () => window.removeEventListener("click", handleClick);
  }, []);

  return (
    <div className="flex w-fit shrink-0 lg:flex-1 justify-end gap-4">
      <BecomeHost />
      <div
        className="relative"
        ref={containerRef}
        onClick={() => setIsOpen(true)}
      >
        <div className="flex items-center flex-shrink-0 justify-center gap-2 px-3 hover:shadow-md py-2 rounded-full border-2">
          <IoIosMenu className="w-6 h-6 flex-shrink-0" />
          <Image
            className="rounded-full"
            src={session?.user?.image || "/avatar.png"}
            alt="user pic"
            width={30}
            height={30}
          />
        </div>
        {isOpen && (
          <div className="absolute right-3 w-56 top-16 p-4 rounded-lg shadow-xl  bg-white z-50 flex flex-col justify-between text-start gap-1">
            {!session?.user && (
              <div
                onClick={signInOpen}
                className="text-md font-medium  hover:bg-gray-200 transition-all p-2 rounded-md"
              >
                Sign In
              </div>
            )}
            <Link
              className="text-md font-medium hover:bg-gray-200 transition-all p-2 rounded-md"
              href={"/"}
            >
              Trips
            </Link>
            <Link
              className="text-md font-medium hover:bg-gray-200 transition-all p-2 rounded-md"
              href={"/"}
            >
              Wishlist
            </Link>
            <Link
              className="text-md font-medium  hover:bg-gray-200 transition-all p-2 rounded-md"
              href={"/"}
            >
              Listings
            </Link>
            <div className="border-b-2" />
            <div
              onClick={onOpen}
              className="text-md font-medium  hover:bg-gray-200 transition-all p-2 rounded-md"
            >
              Become a Host
            </div>
            <div className="border-b-2 " />
            <button className="text-left hover:bg-gray-200 transition-all p-2 rounded-md">
              Account
            </button>
            {session?.user && (
              <button
                onClick={() => signOut()}
                className="text-left hover:bg-gray-200 transition-all p-2 rounded-md"
              >
                Logout
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Menu;
