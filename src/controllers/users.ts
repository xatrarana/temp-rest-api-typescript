import express from "express";
import { deleteUserById, getUsers } from "../model/users";

export const getAllUsers = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const users = await getUsers();
    return res.status(200).json(users).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const deleteUser = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;
    const deletedUser = await deleteUserById(id);
    return res
      .status(201)
      .json({ message: "user has been successfully deleted", deletedUser })
      .end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};
