import {Db} from "./Db";
import {Datamart4055} from "./interfaces";
import {JourneyPhaseEnum} from "./enums";

export class DatamartProcess {
    static initialize(): void {
        Db.create('d_4055', {
            date: 'string',
            datePart: 'string',
            age: 'integer',
            touchpoint: 'string',
            count: 'integer',
            sum: 'integer',
        });
    }

    static aggregate4055(): number {
        const sqlLines: Array<string> = [];
        // sqlLines.push('SELECT a.[date], FIRST(a.[datePart]) AS [datePart], SUM(p.price) AS [sum], COUNT(*) AS [count]');
        sqlLines.push('SELECT a.[datePart] AS [datePart], SUM(p.price) AS [sum], COUNT(*) AS [count]');
        sqlLines.push('FROM e_action AS a JOIN e_session s ON (a.session = s.id) JOIN e_product p ON (a.product = p.id)');
        sqlLines.push('WHERE a.[journeyPhase] = ?');
        // sqlLines.push('GROUP BY a.[date]');
        // sqlLines.push('ORDER BY a.[date]');

        sqlLines.push('GROUP BY a.[datePart]');

        const datamarts = Db.run<Array<Datamart4055>>(sqlLines.join(' '), [JourneyPhaseEnum.COMPLETION]);
        datamarts.forEach((datamart, index) => {
            Db.insert('d_4055', datamart, index);
        })
        return datamarts.length;
    }

}