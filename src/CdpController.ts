import * as express from "express";
import {Express, Router} from "express";
import {CdpService} from "./CdpService";

// noinspection JSUnusedGlobalSymbols
export class CdpController {
    _router: Router;
    _service: CdpService;


    /**
     * @constructor
     * */
    constructor() {
        this._router = express.Router();
        this._service = new CdpService();
    }

    route(app: Express): void {
        this._router.get('/batch', (req, res) => {
            this._service.startBatchAsync()
                .then(content => {
                    res.status(200).json(content);
                })
                .catch((e: Error) => {
                    res.status(400).json({name: e.name, message: e.message});
                });
        });
        this._router.get('/datamart/:code', (req, res) => {
            this._service.datamart(req.params.code as string)
                .then(content => {
                    res.json(content);
                })
                .catch((e: Error) => {
                    res.status(400).json({name: e.name, message: e.message});
                });
        });
        app.use(this._router);
    }
}