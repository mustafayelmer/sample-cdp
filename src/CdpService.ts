import {BatchResponse} from "./interfaces";
import {StagingProcess} from "./StagingProcess";
import {EnterpriseDataProcess} from "./EnterpriseDataProcess";
import {DatamartProcess} from "./DatamartProcess";
import {EmptyDatamartCodeError, InvalidDatamartCodeError, NotFoundDatamartCodeError} from "./errors";
import {Db} from "./Db";


export class CdpService {
    async startBatchAsync(): Promise<BatchResponse> {
        const response = {} as BatchResponse;
        StagingProcess.initialize();
        response.collectAction = StagingProcess.collectAction();
        response.collectCustomer = StagingProcess.collectCustomer();
        response.collectLocation = StagingProcess.collectLocation();
        response.collectProduct = StagingProcess.collectProduct();
        response.collectSession = StagingProcess.collectSession();
        EnterpriseDataProcess.initialize();
        response.processAction = EnterpriseDataProcess.processAction();
        response.processCustomer = EnterpriseDataProcess.processCustomer();
        response.processLocation = EnterpriseDataProcess.processLocation();
        response.processProduct = EnterpriseDataProcess.processProduct();
        response.processSession = EnterpriseDataProcess.processSession();
        DatamartProcess.initialize();
        response.aggregate4055 = DatamartProcess.aggregate4055();
        return response;
    }

    async datamart(code: string): Promise<Array<Record<string, unknown>>> {
        if (typeof code !== 'string') {
            throw new InvalidDatamartCodeError(typeof code);
        }
        code = code.trim();
        if (code === '') {
            throw new EmptyDatamartCodeError();
        }
        try {
            const records = Db.run(`SELECT * FROM d_${code}`) as Array<Record<string, unknown>>;
            return records.slice(0, 10);
        } catch (e) {
            throw new NotFoundDatamartCodeError(code);
        }
    }
}