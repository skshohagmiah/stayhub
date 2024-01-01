"use client";
import useSignInModal from "@/hooks/useSignInModal";
import { Listing, User } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";

interface LikeButtonProps {
  user: User;
  list: Listing;
  session: any;
}

const LikeButton = ({ user, session, list }: LikeButtonProps) => {
  const [isWish, setIsWish] = useState(user.wishlistIds.includes(list.id));
  const { onOpen } = useSignInModal();
  const router = useRouter();

  const handleClick = async (
    e: React.MouseEvent<HTMLButtonElement> | undefined
  ) => {
    e?.preventDefault();
    if (!session) {
      onOpen();
      return;
    }
    try {
      const res = await axios.post(`/api/user/wishlist`, { id: list.id });
      if (res.status === 200) {
        setIsWish(res.data.data.wishlistIds?.includes(list.id) || false);
        router.refresh();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <button onClick={handleClick}>
      {isWish ? (
        <FaHeart className="w-8 h-8 text-rose-500" />
      ) : (
        <FaRegHeart className="w-8 h-8" />
      )}
    </button>
  );
};

export default LikeButton;
