import alasql from "alasql";
import {InvalidSqlError} from "./errors";

export class Db {
    static _log: Array<Array<unknown>> = [];
    static addLog(title: string, value: Record<string, unknown>): void {
        this._log.push([title, value]);
    }
    static get log(): Array<Array<unknown>> {
        return this._log;
    }
    static showLog(): void {
        this._log.forEach(item => {
            console.log(...item);
        })
    }
    static insert(table: string, row: Record<string, unknown>, index = 999): void {
        if (index < 5) {
            Db.addLog(`${table}-${index}`, row);
        }
        Db.run(`INSERT INTO ${table} VALUES ?`, [row]);
    }
    static run<T = unknown>(sql: string, params?: unknown): T {
        try {
            return alasql(sql, params) as T;
        } catch (e) {
            throw new InvalidSqlError(e.message, sql);
        }
    }

    static runIgnore<T = unknown>(sql: string, params?: unknown): T {
        try {
            return alasql(sql, params) as T;
        } catch (e) {
            return null
        }
    }

    static create(table: string, columns: Array<string> | Record<string, string>): void {
        this.runIgnore(`DROP TABLE ${table}`);
        const fields = [];
        if (Array.isArray(columns)) {
            columns.forEach(column => {
                fields.push(`[${column}] string`);
            });
        } else {
            for (const [column, type] of Object.entries(columns)) {
                fields.push(`[${column}] ${type}`);
            }
        }
        this.run(`CREATE TABLE ${table} (${fields.join(', ')})`);
    }
}