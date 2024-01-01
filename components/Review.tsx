import { prisma } from "@/libs/db";
import { getCurrentSession, getCurrentUser } from "@/libs/getCurrentUser";
import { Listing, Reservation, User } from "@prisma/client";
import { format } from "date-fns";
import { revalidatePath } from "next/cache";
import { Audiowide } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaStar } from "react-icons/fa";

interface ReviewProps {
  list: Listing & {
    owner: User;
  } & {
    reservations: Reservation[];
  };
}

const Review = async ({ list }: ReviewProps) => {
  const user = await getCurrentUser();
  const session = await getCurrentSession();

  const reviews = await prisma.review.findMany({
    where: {
      listingId: list.id,
    },
    include: {
      user: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const createReview = async (formDate: FormData) => {
    "use server";
    const text: FormDataEntryValue = formDate.get("text") as string;
    const rating: FormDataEntryValue = formDate.get("rating") as string;
    if (text && rating) {
      await prisma.review.create({
        //@ts-ignore
        data: {
          text: text,
          rating: parseInt(rating),
          listingId: list.id,
          userId: user?.id,
        },
      });
      revalidatePath(`/listing/${list.id}`);
    }
  };

  return (
    <div className="mt-2">
      <form
        action={createReview}
        className="flex items-center justify-between gap-2"
      >
        <input
          type="text"
          name="text"
          placeholder="add a review"
          className="p-2 w-full bg-gray-300 rounded-md outline-none"
        />
        <input
          type="number"
          name="rating"
          placeholder="rating"
          defaultValue={3}
          max={5}
          min={1}
          className="p-2 w-20 bg-gray-300 rounded-md outline-none"
        />
        <button
          disabled={!session}
          className="py-2 px-4 rounded-md bg-rose-500 text-white hover:opacity-50 disabled:opacity-50"
          type="submit"
        >
          Send
        </button>
      </form>
      {!session && (
        <p className="text-sm font-light p-1">Sign In to give review</p>
      )}
      <div className="relative">
        {reviews.length === 0 ? (
          <div className="p-4 text-xl">No Review Found For This Property</div>
        ) : (
          reviews.slice(0, 3).map((review) => (
            <div
              key={review.id}
              className="flex items-center gap-4 p-2 mt-2 bg-gray-200 rounded-md"
            >
              <div className="text-center">
                <Image
                  className="rounded-full"
                  src={review.user.image || ""}
                  alt="user pic"
                  width={40}
                  height={40}
                />
              </div>

              <div className="w-full">
                <div className="text-xs font-light ">
                  {review.user.name}{" "}
                  <span className="text-sm font-normal">
                    {format(review.createdAt, "dd-MM-yyyy")}
                  </span>
                </div>
                <p>{review.text}</p>
              </div>

              <div className="flex justify-end w-fit">
                {new Array(review.rating).fill(null).map((item, inx) => (
                  <p key={inx}>
                    <FaStar className="text-rose-500" />
                  </p>
                ))}
              </div>
            </div>
          ))
        )}
        {reviews.length >= 3 && (
          <Link className="p-1 underline font-light" href={"/"}>
            read more
          </Link>
        )}
      </div>
    </div>
  );
};

export default Review;
