import { prisma } from "@/libs/db";
import { getCurrentUser } from "@/libs/getCurrentUser";

export async function POST(req: Request) {
  try {
    const user = await getCurrentUser();
    const { id } = await req.json();
    const isAlreadyinList = user?.wishlistIds.includes(id);

    let res;
    if (isAlreadyinList) {
      const newList = user?.wishlistIds.filter((wish) => wish !== id);
      console.log(newList);
      res = await prisma.user.update({
        where: {
          id: user?.id,
        },
        data: {
          wishlistIds: {
            set: newList,
          },
        },
      });
    } else {
      res = await prisma.user.update({
        where: {
          id: user?.id,
        },
        data: {
          wishlistIds: {
            push: id,
          },
        },
      });
    }
    return Response.json({ data: res }, { status: 200 });
  } catch (error) {
    console.log("wishlist route", error);
    return Response.json("something went wrong", { status: 500 });
  }
}
