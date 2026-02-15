"use server";
import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";

export const onBoardUser = async () => {
  try {
    const user = await currentUser();
    if (!user) return { success: false, message: "User not authenticated" };

    const { id, emailAddresses, firstName, lastName, imageUrl } = user;
    const newUser = await db.user.upsert({
      where: {
        clerkId: id,
      },
      update: {
        email: emailAddresses[0]?.emailAddress || "",
        firstName,
        lastName,
        imageUrl,
      },
      create: {
        clerkId: id,
        email: emailAddresses[0]?.emailAddress || "",
        firstName,
        lastName,
        imageUrl,
      },
    });

    return {
      success: true,
      user: newUser,
      message: "User onboarded successfully",
    };
  } catch (error) {
    console.error("Error onboarding user:", error);
    return {
      success: false,
      error: "Failed to onboard user",
    };
  }
};
