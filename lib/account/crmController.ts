import * as mongoose from 'mongoose';
import { Request, Response } from 'express';
import { AccountShema } from './crmModel';
import * as bip39 from 'bip39';
// import * as hdkey from 'hdkey';
import hdkey = require('hdkey');
import * as ethUtil from 'ethereumjs-util';
// const Contact = mongoose.model('Contact', AccountShema);

export class AccountController {

    public addNewAccount(req: Request, res: Response) {
        const mnemonic = bip39.generateMnemonic(); //generates string
        let valid = bip39.validateMnemonic(mnemonic);
        const seed = bip39.mnemonicToSeed(mnemonic); //creates seed buffer

        const root = hdkey.fromMasterSeed(seed);
        const masterPrivateKey = root.privateKey.toString('hex');

        const addrNode = root.derive("m/44'/60'/0'/0/0"); //line 1
        const pubKey = ethUtil.privateToPublic(addrNode.privateKey);
        const addr = ethUtil.pubToAddress(pubKey);
        const address = ethUtil.toChecksumAddress(ethUtil.bufferToHex(addr));
        valid = ethUtil.isValidAddress(ethUtil.bufferToHex(addr));
        valid = ethUtil.isValidAddress(address);
        const i = 10;
        // let newContact = new Contact(req.body);

        // newContact.save((err, contact) => {
        //     if (err) {
        //         res.send(err);
        //     }
        //     res.json(contact);
        // });
    }

    public getContacts(req: Request, res: Response) {
        // Contact.find({}, (err, contact) => {
        //     if (err) {
        //         res.send(err);
        //     }
        //     res.json(contact);
        // });
    }

    public getContactWithID(req: Request, res: Response) {
        // Contact.findById(req.params.contactId, (err, contact) => {
        //     if (err) {
        //         res.send(err);
        //     }
        //     res.json(contact);
        // });
    }

    public updateContact(req: Request, res: Response) {
        // Contact.findOneAndUpdate({ _id: req.params.contactId }, req.body, { new: true }, (err, contact) => {
        //     if (err) {
        //         res.send(err);
        //     }
        //     res.json(contact);
        // });
    }

    public deleteContact(req: Request, res: Response) {
        // Contact.remove({ _id: req.params.contactId }, (err, contact) => {
        //     if (err) {
        //         res.send(err);
        //     }
        //     res.json({ message: 'Successfully deleted contact!' });
        // });
    }
}