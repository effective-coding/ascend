import argon from "argon2";

import User from "../mongoose/schemas/user.schema.mjs";
import Account from "../mongoose/schemas/account.schema.mjs";
import mongoose from "mongoose";

export async function createUser(data) {
  try {
    const hash = await argon.hash(data.password);

    const user = await User.create({
      name: data.name,
      email: data.email,
    });

    await Account.create({
      user: new mongoose.Types.ObjectId(user._id),
      provider: {
        id: null,
        type: "credential",
      },
      credentials: {
        hash,
      },
    });

    return { id: user.id, name: user.name, email: user.email };
  } catch (error) {
    throw new Error("unable to create new user");
  }
}
