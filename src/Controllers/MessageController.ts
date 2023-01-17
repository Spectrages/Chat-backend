import express from "express";
import { MessageModel } from '../Models'

class MessageController {

    index(req: express.Request, res: express.Response) {
        const dialogueId: unknown = req.query.dialogue;

        MessageModel
            .find({ dialogue: dialogueId })
            .populate(["dialogue"])
            .exec(function (err, messages) {
                if(err) {
                    return res.status(400).send({
                        message: `Messages not found`
                    });
                }
                return res.json(messages);
            });
    };

    create(req: express.Request, res: express.Response) {
        const userId = '63c55d8110bb09e2eafda69e';

        const postData = {
            text: req.body.text,
            dialogue: req.body.dialogueId,
            user: userId,
        };

        const message = new MessageModel(postData);
        message
            .save()
            .then((obj: unknown) => {
                res.json(obj);
            })
            .catch(error => {
                res.json(error);
            });
    };

    delete(req: express.Request, res: express.Response) {
        const id: string = req.params.id;
        MessageModel.findByIdAndRemove({_id: id})
            .then(message => {
                if(message) {
                    res.json({
                        message: `Message deleted`
                    });
                }
            })
            .catch(() => {
                res.json({
                    message: `Message not found`
                });
            });
    };
}

export default MessageController;