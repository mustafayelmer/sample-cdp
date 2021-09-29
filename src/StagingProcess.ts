import alasql from "alasql";
import * as path from "path";
import fs from "fs";
import * as CSV from 'csv-string';
import {InvalidCsvLinesError} from "./errors";
import {Db} from "./Db";

export class StagingProcess {

    static initialize(): void {
        Db.create('s_action', {
            id: 'string',
            datetime: 'string',
            session: 'string',
            journeyPhase: 'string',
            product: 'string',
            referer: 'string',
            unnecessary5: 'string',
        });
        Db.create('s_customer', {
            id: 'string',
            gender: 'string',
            age: 'string',
            nationality: 'string',
            address: 'string',
            unnecessary2: 'string',
        });
        Db.create('s_location', {
            id: 'string',
            name: 'string',
            type: 'string',
            placeOfPurchase: 'string',
            unnecessary4: 'string',
        });
        Db.create('s_product', {
            id: 'string',
            cluster: 'string',
            name: 'string',
            price: 'string',
            unnecessary1: 'string',
        });
        Db.create('s_session', {
            id: 'string',
            customer: 'string',
            isAnonymous: 'string',
            anonymousBind: 'string',
            createdAt: 'string',
            ipAddress: 'string',
            useragent: 'string',
            acceptLanguage: 'string',
            consumerApp: 'string',
            unnecessary2: 'string',
            touchpoint: 'string',
            location: 'string',
        });
    }

    private static _lineToRow(columns: Array<string>, line: Array<string>): Record<string, unknown> {
        const inserted = {};
        columns.forEach((column, index) => {
            inserted[column] = line[index];
        });
        return inserted;
    }

    private static _csvToTable(table: string, file: string): number {
        const content = fs.readFileSync(`${path.dirname(path.dirname(__filename))}/assets/${file}`, 'utf8');
        const lines = CSV.parse(content);
        if (!Array.isArray(lines)) {
            throw new InvalidCsvLinesError(table);
        }
        const columns = lines[0] as Array<string>;
        // first line consists header columns
        lines.shift();
        // Create table with csv columns
        lines.forEach((line, index) => {
            Db.insert(table, this._lineToRow(columns, line), index);
        });
        return lines.length;
    }

    static collectAction(): number {
        return this._csvToTable('s_action', 'action.csv');
    }

    static collectCustomer(): number {
        return this._csvToTable('s_customer', 'customer.csv');
    }

    static collectLocation(): number {
        return this._csvToTable('s_location', 'location.csv');
    }

    static collectProduct(): number {
        return this._csvToTable('s_product', 'product.csv');
    }

    static collectSession(): number {
        return this._csvToTable('s_session', 'session.csv');
    }
}