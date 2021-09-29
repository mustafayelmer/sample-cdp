import {strict as assert} from 'assert';
import {StagingProcess} from "../src/StagingProcess";
import {Db} from "../src/Db";
import {EnterpriseDataProcess} from "../src/EnterpriseDataProcess";
import {DatamartProcess} from "../src/DatamartProcess";

describe('staging', () => {
    it(`should be initialized`, () => {
        assert.doesNotThrow(() => {
            StagingProcess.initialize();
        });
    });
    it(`collecting actions should not raise an error`, () => {
        assert.doesNotThrow(() => {
            StagingProcess.collectAction();
        });
    });
    it(`actions should be collected`, () => {
        assert.deepEqual(_getRowCount('s_action') > 0, true);
    });
    it(`collecting customers should not raise an error`, () => {
        assert.doesNotThrow(() => {
            StagingProcess.collectCustomer();
        });
    });
    it(`customers should be collected`, () => {
        assert.deepEqual(_getRowCount('s_customer') > 0, true);
    });
    it(`collecting locations should not raise an error`, () => {
        assert.doesNotThrow(() => {
            StagingProcess.collectLocation();
        });
    });
    it(`locations should be collected`, () => {
        assert.deepEqual(_getRowCount('s_location') > 0, true);
    });
    it(`collecting products should not raise an error`, () => {
        assert.doesNotThrow(() => {
            StagingProcess.collectProduct();
        });
    });
    it(`products should be collected`, () => {
        assert.deepEqual(_getRowCount('s_product') > 0, true);
    });
    it(`collecting sessions should not raise an error`, () => {
        assert.doesNotThrow(() => {
            StagingProcess.collectSession();
        });
    });
    it(`sessions should be collected`, () => {
        assert.deepEqual(_getRowCount('s_session') > 0, true);
    });
});
describe('enterprise', () => {
    it(`should be initialized`, () => {
        assert.doesNotThrow(() => {
            EnterpriseDataProcess.initialize();
        });
    });
    it(`processing actions should not raise an error`, () => {
        assert.doesNotThrow(() => {
            EnterpriseDataProcess.processAction();
        });
    });
    it(`actions should be processed`, () => {
        assert.deepEqual(_getRowCount('e_action') > 0, true);
    });
    it(`processing customers should not raise an error`, () => {
        assert.doesNotThrow(() => {
            EnterpriseDataProcess.processCustomer();
        });
    });
    it(`customers should be processed`, () => {
        assert.deepEqual(_getRowCount('e_customer') > 0, true);
    });
    it(`processing locations should not raise an error`, () => {
        assert.doesNotThrow(() => {
            EnterpriseDataProcess.processLocation();
        });
    });
    it(`locations should be processed`, () => {
        assert.deepEqual(_getRowCount('e_location') > 0, true);
    });
    it(`processing products should not raise an error`, () => {
        assert.doesNotThrow(() => {
            EnterpriseDataProcess.processProduct();
        });
    });
    it(`products should be processed`, () => {
        assert.deepEqual(_getRowCount('e_product') > 0, true);
    });
    it(`processing sessions should not raise an error`, () => {
        assert.doesNotThrow(() => {
            EnterpriseDataProcess.processSession();
        });
    });
    it(`sessions should be processed`, () => {
        assert.deepEqual(_getRowCount('e_session') > 0, true);
    });
});
describe('datamart', () => {
    it(`should be initialized`, () => {
        assert.doesNotThrow(() => {
            DatamartProcess.initialize();
        });
    });
    it(`aggregating code:4055 should not raise an error`, () => {
        assert.doesNotThrow(() => {
            DatamartProcess.aggregate4055();
        });
    });
    it(`code:4055 should be aggregated`, () => {
        assert.deepEqual(_getRowCount('d_4055') > 0, true);
    });
});
describe('finalize', () => {
    it(`logs should be viewable`, () => {
        assert.doesNotThrow(() => {
            Db.showLog();
        });
    });
});
const _getRowCount = (table: string): number => {
    const rows = Db.run(`SELECT * FROM ${table}`);
    return Array.isArray(rows) ? rows.length : -1;
}