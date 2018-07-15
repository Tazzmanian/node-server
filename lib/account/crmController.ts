import * as mongoose from 'mongoose';
import { Request, Response } from 'express';
import { AccountShema } from './crmModel';
import * as bip39 from 'bip39';
import hdkey = require('hdkey');
import * as ethUtil from 'ethereumjs-util';
// const Contact = mongoose.model('Contact', AccountShema);

export class AccountController {

    public addNewWallet(req: Request, res: Response) {
        let mnemonic = bip39.generateMnemonic(); //generates string
        let valid = bip39.validateMnemonic(mnemonic);
        mnemonic = 'alcohol practice grab proud father cradle film genius kitchen off install possible';
        const seed = bip39.mnemonicToSeed(mnemonic); //creates seed buffer

        const root = hdkey.fromMasterSeed(seed);

        const masterPrivateKey = root.privateKey.toString('hex');

        let addrNode = root.derive("m/44'/60'/0'/0/0"); //line 1
        let pubKey = ethUtil.privateToPublic(addrNode.privateKey);
        console.log(ethUtil.bufferToHex(pubKey), ethUtil.bufferToHex(addrNode.privateKey));
        console.log((addrNode as any).getWallet());
        let addr = ethUtil.pubToAddress(pubKey);
        let address = ethUtil.toChecksumAddress(ethUtil.bufferToHex(addr));
        valid = ethUtil.isValidAddress(address);
        console.log(address);

        res.json({ mnemonic: mnemonic })
    }

    public restoreWalletFromSeed(req: Request, res: Response) {
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