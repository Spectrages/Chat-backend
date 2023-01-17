import express from "express";
import { UserModel } from "../Models";

export default (
    _: express.Request,
    __: express.Response,
    next: express.NextFunction
) => {
    UserModel.findByIdAndUpdate(
        { _id:  '63c55d8110bb09e2eafda69e' },
            { last_seen: new Date() },
        { new: true },
        () => {}
        );
    next();
}