import argon from "argon2";
import User from "../mongoose/schemas/user.schema.mjs";

export async function createUser(data) {
  try {
    const hash = await argon.hash(data.password);
    const user = await User.create({
      name: data.name,
      username: data.username,
      password: hash,
    });
    return { id: user.id, name: user.name };
  } catch (error) {
    throw new Error("unable to create new user");
  }
}
