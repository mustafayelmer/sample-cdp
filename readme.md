# Sample CDP Project

Simulation of "Staging Layer" > "Enterprise Data Layer" > "Datamart Layer" 

## Standards
- Language: `TS`
- Eslint: `Yes`
- Static Code Analysis: `Yes` *IntelliJ Code Inspections*
- DDD - Document Driven: `Yes`
- DDD - Domain Driven: `50%` *Partially*
- EDD - Exception Driven: `Yes`
- TDD - Test Driven: `Yes` [test folder](./test/)
- LDD - Log Driven: `No`
- 12FA - 12 Factor-App: `50%` *Partially*

## Commands
- ``npm run clear`` *// clears "dist" folder*
- ``npm run lint`` *// runs eslint for static code analysis*
- ``npm run test`` *// runs test files in "test" folder*
- ``npm run build`` *// builds JS files at "dist" folder*
- ``npm run test`` *// run tests*
- ``npm run start`` *// starts web server*

## Dependencies
- ``express`` *provides as web server*
- ``alasql`` *in memory db*
- ``accept-language-parser`` *Accept-Language parser, fr-BE => language: French, Country: Belgium*
- ``device-detector-js`` *User-Agent parser > browser, client, engine, os, device etc*
- ``geoip-lite`` *Ip Address parser > country, region, city, timezone, metro/advertisement*
- ``csv-string`` *parses string to array of objects*
- ``dotenv`` *reads environment*
- ``cors`` *provides CORS*
- ``body-parser`` *handles body by header*
- ``helmet`` *handles header keys*


## Mock-up Data
- You can view at [assets folder](./assets/)
- ``action`` **10.000** with *id, datetime, session, journeyPhase, product, referer, unnecessary5* fields
- ``customer`` **100** with *id, gender, age, nationality, address, unnecessary2* fields
- ``location`` **10** with *id, name, type, placeOfPurchase, unnecessary4* fields
- ``product`` **50** with *id, cluster, name, price, unnecessary1* fields
- ``session`` **1000** with *id, customer, isAnonymous, anonymousBind, createdAt, ipAddress, useragent, acceptLanguage, consumerApp, unnecessary2, touchpoint, location* fields

## Postman
> You can find Postman export file at [asset folder](./assets/) 

## Config
> You can use `host` as `http://localhost:8080` 

## Samples

### Batch All tasks
> It simulates AWS Glue and AWS Lambda
>
- Reads all static files and creates new records into staging layer without any changing
- Reads staging data, and creates new records into enterprise data layer with general, industry based and case based transformations
- Read enterprise data, and creates new records into aggregation layer with aggregating, summarizing & projecting according to requirements

| Type | Value |
| ---- | --- |
| Method | GET |
| Endpoint | `host`/batch |
| Payload | *none* |
| Response | Summary of jobs |

> Sample Endpoint
>
`GET` `http://localhost:8080/batch`
> Sample Response
````json
{
    "collectAction": 10000,
    "collectCustomer": 100,
    "collectLocation": 10,
    "collectProduct": 50,
    "collectSession": 1000,
    "processAction": 10000,
    "processCustomer": 100,
    "processLocation": 10,
    "processProduct": 50,
    "processSession": 1000,
    "aggregate4055": 60
}
````

> Throws
> InvalidSqlError, InvalidCsvLinesError



### Fetch a Datamart
> Returns a datamart record for dashboard or any report usage
>
> Note: This datamart holds only completed sales amount & count by date parts
>

| Type | Value |
| ---- | --- |
| Method | GET |
| Endpoint | `host`/datamart/:code |
| Payload | *none* |
| Response | Array of records for given datamart |

> Sample Endpoint
>
`GET` `http://localhost:8080/datamart/4055`
> Sample Response
````json
[
    {
        "datePart": "DAWN",
        "count": 242,
        "sum": 12176
    },
    {
        "datePart": "NIGHT",
        "count": 276,
        "sum": 14097
    },
    {
        "datePart": "NOON",
        "count": 359,
        "sum": 19231
    },
    {
        "datePart": "MORNING",
        "count": 215,
        "sum": 11033
    },
    {
        "datePart": "EVENING",
        "count": 283,
        "sum": 14137
    }
]
````

---
### Prepared by
- Mustafa Yelmer
- mustafayelmer(at)gmail.com
- `2021-09-29`