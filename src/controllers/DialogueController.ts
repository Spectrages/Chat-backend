import express from "express";
import { DialogueModel } from '../models'

class DialogueController {

    getOne(req: express.Request, res: express.Response) {
        const ownerId: string = req.params.id;
        DialogueModel
            .find({ owner: ownerId })
            .populate(["owner", "partner"])
            .exec(function (err, dialogues) {
                if(err) {
                    return res.status(400).send({
                        message: `Dialogues not found, reason - ${err}`
                    });
                };
                return res.json(dialogues);
            });
    };

    create(req: express.Request, res: express.Response) {
        const postData = {
           owner: req.body.owner,
           partner: req.body.partner,
        };
        const dialogue = new DialogueModel(postData);
        dialogue
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
        DialogueModel.findByIdAndRemove({_id: id})
            .then(dialogue => {
                if(dialogue) {
                    res.json({
                        message: `Dialogue deleted`
                    });
                }
            })
            .catch(() => {
                res.json({
                    message: `Dialogue not found`
                });
            });
    };
}

export default DialogueController;