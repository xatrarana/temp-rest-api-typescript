import exrpess from "express";
import { getUserBySessionToken } from "../model/users";
import { get, merge } from "lodash";

export const isAuthenticated = async (
  req: exrpess.Request,
  res: exrpess.Response,
  next: exrpess.NextFunction
) => {
  try {
    const sessionToken = req.cookies["XATRA-AUTH"];
    if (!sessionToken) {
      return res.sendStatus(403);
    }

    const existingUser = await getUserBySessionToken(sessionToken);

    if (!existingUser) {
      return res.sendStatus(403);
    }

    merge(req, { identity: existingUser });
    next();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const isOwner = async (
  req: exrpess.Request,
  res: exrpess.Response,
  next: exrpess.NextFunction
) => {
  try {
    const { id } = req.params;
    const currentUserId = get(req, "identity._id") as string;
    if (!currentUserId) {
      return res.sendStatus(403);
    }
    if (currentUserId.toString() !== id) {
      return res.sendStatus(403);
    }
    next();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};
