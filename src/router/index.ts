import express from "express";
const router = express.Router();

import authentication from "./authentication";
import user from "./user";
export default (): express.Router => {
  authentication(router);
  user(router);
  return router;
};
