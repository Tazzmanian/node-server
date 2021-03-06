import * as express from 'express';
import * as bodyParser from 'body-parser';
import { Routes } from './contract/routes/crmRoutes';
import * as mongoose from 'mongoose';
import { AccountRoutes } from './account/crmRoutes';

class App {

    public app: express.Application;
    public routePrv: Routes = new Routes();
    public accRoutes: AccountRoutes = new AccountRoutes();
    public mongoUrl: string = 'mongodb://localhost:27017/CRMdb';  

    constructor() {
        this.app = express();
        this.config();        
        this.routePrv.routes(this.app);
        this.accRoutes.routes(this.app);
        this.mongoSetup();
    }

    private mongoSetup(): void{
        mongoose.Promise = global.Promise;
        mongoose.connect(this.mongoUrl, { useNewUrlParser: true });    
    }

    private config(): void{
        // support application/json type post data
        this.app.use(bodyParser.json());

        //support application/x-www-form-urlencoded post data
        this.app.use(bodyParser.urlencoded({ extended: false }));
    }

}

export default new App().app;