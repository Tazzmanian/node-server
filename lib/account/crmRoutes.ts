import { Request, Response } from 'express';
import { AccountController } from './crmController';

export class AccountRoutes {

    public accountController: AccountController = new AccountController();

    public routes(app): void {
        // Account
        app.route('/account')
            // GET endpoint 
            .get(this.accountController.addNewAccount);
        // POST endpoint
        // .post(this.contactController.addNewContact)

        // // Contact detail
        // app.route('/contact/:contactId')
        // // get specific contact
        // .get(this.contactController.getContactWithID)
        // .put(this.contactController.updateContact)
        // .delete(this.contactController.deleteContact)
    }
}