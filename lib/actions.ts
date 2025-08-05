"use server";

import { z } from "zod";
import { ContactSchema, ReserveSchema, RoomSchema } from "./zod";
import { prisma } from "./prisma";
import { redirect } from "next/navigation";
import { del } from "@vercel/blob";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { differenceInCalendarDays } from "date-fns";

export const saveRoom = async (
  image: string,
  prevState: unknown,
  formData: FormData
) => {
  if (!image) {
    return { message: "Image is required" };
  }

  const rawData = {
    name: formData.get("name"),
    description: formData.get("description"),
    capacity: formData.get("capacity"),
    price: formData.get("price"),
    amenities: formData.getAll("amenities"),
  };

  const validatedFields = RoomSchema.safeParse(rawData);

  if (!validatedFields.success) {
    const tree = z.treeifyError(validatedFields.error);

    return {
      error: {
        name: tree.properties?.name?.errors?.[0],
        description: tree.properties?.description?.errors?.[0],
        capacity: tree.properties?.capacity?.errors?.[0],
        price: tree.properties?.price?.errors?.[0],
        amenities: tree.properties?.amenities?.errors?.[0],
      },
    };
  }

  const { name, description, capacity, price, amenities } =
    validatedFields.data;

  try {
    await prisma.room.create({
      data: {
        name,
        description,
        image,
        price,
        capacity,
        RoomAmenities: {
          createMany: {
            data: amenities.map((item: string) => ({
              amenitiesId: item,
            })),
          },
        },
      },
    });
  } catch (error) {
    console.log(error);
  }
  redirect("/admin/room");
};

export const ContactMessage = async (
  prevState: unknown,
  formData: FormData
) => {
  const validatedFields = ContactSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validatedFields.success) {
    const tree = z.treeifyError(validatedFields.error);

    return {
      error: {
        name: tree.properties?.name?.errors?.[0],
        email: tree.properties?.email?.errors?.[0],
        subject: tree.properties?.subject?.errors?.[0],
        message: tree.properties?.message?.errors?.[0],
      },
    };
  }

  const { name, email, subject, message } = validatedFields.data;

  try {
    await prisma.contact.create({
      data: {
        name,
        email,
        subject,
        message,
      },
    });

    return { message: "Thanks for contact us." };
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong." };
  }
};

// Delete Room
export const deleteRoom = async (id: string, image: string) => {
  try {
    await del(image);
    await prisma.room.delete({
      where: { id },
    });
  } catch (error) {
    console.log(error);
  }

  revalidatePath("/admin/room");
};

// Update Room
export const updateRoom = async (
  image: string,
  roomId: string,
  prevState: unknown,
  formData: FormData
) => {
  if (!image) {
    return { message: "Image is required" };
  }

  const rawData = {
    name: formData.get("name"),
    description: formData.get("description"),
    capacity: formData.get("capacity"),
    price: formData.get("price"),
    amenities: formData.getAll("amenities"),
  };

  const validatedFields = RoomSchema.safeParse(rawData);

  if (!validatedFields.success) {
    const tree = z.treeifyError(validatedFields.error);

    return {
      error: {
        name: tree.properties?.name?.errors?.[0],
        description: tree.properties?.description?.errors?.[0],
        capacity: tree.properties?.capacity?.errors?.[0],
        price: tree.properties?.price?.errors?.[0],
        amenities: tree.properties?.amenities?.errors?.[0],
      },
    };
  }

  const { name, description, capacity, price, amenities } =
    validatedFields.data;

  try {
    await prisma.$transaction([
      prisma.room.update({
        where: { id: roomId },
        data: {
          name,
          description,
          image,
          price,
          capacity,
          RoomAmenities: {
            deleteMany: {},
          },
        },
      }),
      prisma.roomAmenities.createMany({
        data: amenities.map((item) => ({
          roomId,
          amenitiesId: item,
        })),
      }),
    ]);
  } catch (error) {
    console.log(error);
  }
  revalidatePath("/admin/room");
  redirect("/admin/room");
};

export const createReserve = async (
  roomId: string,
  price: number,
  startDate: Date,
  endDate: Date,
  prevState: unknown,
  formData: FormData
) => {
  const session = await auth();

  if (!session || !session.user || !session.user.id) {
    redirect(`/sign-in?redirect_url=room/${roomId}`);
  }

  const rawData = {
    name: formData.get("name"),
    phone: formData.get("phone"),
  };

  const validatedFields = ReserveSchema.safeParse(rawData);

  if (!validatedFields.success) {
    const tree = z.treeifyError(validatedFields.error);

    return {
      error: {
        name: tree.properties?.name?.errors?.[0],
        phone: tree.properties?.phone?.errors?.[0],
      },
    };
  }

  const { name, phone } = validatedFields.data;
  const night = differenceInCalendarDays(endDate, startDate);

  if (night <= 0) {
    return {
      messageDate: "Date must be at least 1 night",
    };
  }

  const total = night * price;

  let reservationId;

  try {
    await prisma.$transaction(async (tx) => {
      await tx.user.update({
        data: {
          name,
          phone,
        },
        where: { id: session.user.id },
      });

      const reservation = await tx.reservation.create({
        data: {
          startDate, 
          endDate,
          price,
          roomId,
          userId: session.user.id as string,
          Payment: {
            create: {
              amount: total,
            },
          },
        },
      });

      reservationId = reservation.id;
    });
  } catch (error) {
    console.log(error);
  }

  redirect(`/checkout/${reservationId}`);
};
