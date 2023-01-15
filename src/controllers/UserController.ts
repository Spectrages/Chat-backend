import express from "express";
import { UserModel } from '../models'

class UserController {

    getOne(req: express.Request, res: express.Response) {
        const id: string = req.params.id;
        UserModel.findById(id, (err: unknown, user: unknown) => {
            if (err) {
                return res.status(404).json({
                    message: 'Not found'
                });
            }
            res.json(user);
        });

    };

    getAll(req: express.Request, res: express.Response) {
        try{
            const users = UserModel.find().exec();
            res.json(users);
        } catch (e) {
            res.status(500).json({message: "Failed to getting users list"});
        }
    };

    create(req: express.Request, res: express.Response) {
        const postData = {
            email: req.body.email,
            fullname: req.body.fullname,
            password: req.body.password,
        };
        const user = new UserModel(postData);
        user
            .save()
            .then((obj: unknown) => {
                return res.json(obj);
            })
            .catch(reason => {
                return res.json(reason);
            });
    };

    delete(req: express.Request, res: express.Response) {
        const id: string = req.params.id;
        UserModel.findByIdAndRemove(id, (err: unknown, user: {
            fullname: string
        }) => {
            if(err) {
                return res.status(404).json({
                    message: 'Not found'
                });
            };
            res.json({
                message: `User ${user.fullname} deleted`
            });
        });
    };
};

export default UserController;