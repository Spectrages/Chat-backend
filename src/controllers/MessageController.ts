import express from "express";
import { MessageModel } from '../models'

class MessageController {

    getOne(req: express.Request, res: express.Response) {
        const dialogueId: string = req.params.dialogue;
        MessageModel
            .find({ dialogue: dialogueId })
            .populate(["dialogue"])
            .exec(function (err, messages) {
                if(err) {
                    return res.status(400).send({
                        message: `Messages not found, error: ${err}`
                    });
                };
                return res.json(messages);
            });
    };

    // create(req: express.Request, res: express.Response) {
    //     const postData = {
    //         owner: req.body.owner,
    //         partner: req.body.partner,
    //     };
    //     const dialogue = new DialogueModel(postData);
    //     dialogue
    //         .save()
    //         .then((obj: unknown) => {
    //             return res.json(obj);
    //         })
    //         .catch(reason => {
    //             return res.json(reason);
    //         });
    // };
    //
    // delete(req: express.Request, res: express.Response) {
    //     const id: string = req.params.id;
    //     DialogueModel.findByIdAndRemove({_id: id})
    //         .then(dialogue => {
    //             if(dialogue) {
    //                 res.json({
    //                     message: `Dialogue deleted`
    //                 });
    //             }
    //         })
    //         .catch(() => {
    //             res.json({
    //                 message: `Dialogue not found`
    //             });
    //         });
    // };
}

export default MessageController;