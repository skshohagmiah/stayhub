import List from "@/components/List";
import { prisma } from "@/libs/db";
import { getCurrentSession, getCurrentUser } from "@/libs/getCurrentUser";
import React from "react";

const WishlistPage = async () => {
  const user = await getCurrentUser();
  const wistlists = await prisma.listing.findMany({
    where: {
      id: {
        in: user?.wishlistIds,
      },
    },
  });

  return (
    <div className="max-w-7xl mx-auto mt-[5rem] h-full flex gap-2 p-4">
      {wistlists.length === 0 ? (
        <div className="h-full w-full mt-[5rem] text-center font-semibold text-xl tex-black">
          You have Not Added Any Place To Wishlist
        </div>
      ) : (
        wistlists.map((list) => <List list={list} key={list.id} />)
      )}
    </div>
  );
};

export default WishlistPage;
