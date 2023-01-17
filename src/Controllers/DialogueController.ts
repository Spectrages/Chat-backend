import express from "express";
import { DialogueModel, MessageModel } from '../Models'

class DialogueController {

    index(req: express.Request, res: express.Response) {
        const ownerId: string = req.params.id;
        DialogueModel
            .find({ owner: ownerId })
            .populate(["owner", "partner"])
            .exec(function (err, dialogues) {
                if(err) {
                    return res.status(400).json({
                        message: `Dialogues not found`
                    });
                }
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
            .then((dialogueObj: any) => {
                const message = new MessageModel({
                    user: req.body.owner,
                    text: req.body.text,
                    dialogue: dialogueObj._id,
                });
                message
                    .save()
                    .then(() => {
                        res.json(dialogueObj);
                    })
                    .catch(error => {
                        res.json(error)
                    });
            })
            .catch(reason => {
                res.json(reason);
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