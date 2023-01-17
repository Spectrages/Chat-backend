import express from "express";
import { UserModel } from '../Models'

class UserController {

    index(req: express.Request, res: express.Response) {
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