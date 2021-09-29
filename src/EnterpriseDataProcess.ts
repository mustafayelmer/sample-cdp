import {Db} from "./Db";
import DeviceDetector from "device-detector-js";
import GeoIP from "geoip-lite";
import LanguageParser from "accept-language-parser";

import {
    EnterpriseAction,
    EnterpriseCustomer,
    EnterpriseLocation,
    EnterpriseProduct,
    EnterpriseSession,
    GeoResult,
    StagingAction,
    StagingCustomer,
    StagingLocation,
    StagingProduct,
    StagingSession
} from "./interfaces";
import {
    DatePartEnum,
    GenderEnum,
    JourneyPhaseEnum,
    LocationTypeEnum,
    MissionEnum,
    NeedEnum,
    PlaceOfPurchaseEnum,
    ProductClusterEnum,
    TouchpointEnum,
    TriggerEnum
} from "./enums";

export class EnterpriseDataProcess {
    static initialize(): void {
        Db.create('e_action', {
            id: 'integer',
            datetime: 'string',
            date: 'string',
            datePart: 'string',
            session: 'integer',
            journeyPhase: 'string',
            product: 'integer',
            trigger: 'string',
            mission: 'string',
            need: 'string',
        });
        Db.create('e_customer', {
            id: 'integer',
            gender: 'string',
            age: 'integer',
            nationality: 'string',
        });
        Db.create('e_location', {
            id: 'integer',
            name: 'string',
            type: 'string',
            placeOfPurchase: 'string',
        });
        Db.create('e_product', {
            id: 'integer',
            cluster: 'string',
            name: 'string',
            price: 'float',
        });
        Db.create('e_session', {
            id: 'integer',
            customer: 'integer',
            isAnonymous: 'boolean',
            touchpoint: 'string',
            location: 'integer',
            createdAt: 'string',
            ipAddress: 'string',
            ipCountry: 'string',
            ipCity: 'string',
            ipRegion: 'string',
            ipMetro: 'integer',
            ipTimezone: 'string',

            useragent: 'string',
            uaClient: 'string',
            uaBrowser: 'string',
            uaEngine: 'string',
            uaOs: 'string',
            uaDeviceVendor: 'string',
            uaDeviceType: 'string',
            uaDeviceModel: 'string',
            uaLanguage: 'string',
            consumerApp: 'string',
            acceptLanguage: 'string',
        });
    }

    private static _parseLanguage(session: EnterpriseSession): void {
        const items = LanguageParser.parse(session.acceptLanguage);
        for (const item of items) {
            if (!session.ipCountry) {
                session.ipCountry = item.region ?? null;
            }
            if (!session.uaLanguage) {
                session.uaLanguage = item.code ?? null;
                break;
            }
        }
    }

    private static _parseIpAddress(session: EnterpriseSession): void {
        const geo = GeoIP.lookup(session.ipAddress) as GeoResult;
        session.ipCountry = geo?.country ?? null;
        session.ipTimezone = geo?.timezone ?? null;
        session.ipRegion = geo?.region ?? null;
        session.ipCity = geo?.city ?? null;
        session.ipMetro = geo?.metro ?? null;
    }

    private static _parseUserAgent(session: EnterpriseSession): void {
        const parser = new DeviceDetector();
        let detected: DeviceDetector.DeviceDetectorResult = null;
        try {
            detected = parser.parse(session.useragent);
        } catch (e) {
            return;
        }
        session.uaClient = detected?.client?.type ?? null;
        session.uaBrowser = detected?.client?.name ?? null;
        session.uaEngine = detected?.client?.['engine'] ?? null;
        session.uaOs = detected?.os?.name ?? null;
        session.uaDeviceVendor = detected?.device?.brand ?? null;
        session.uaDeviceType = detected?.device?.type ?? null;
        session.uaDeviceModel = detected?.device?.model ?? null;
    }

    private static _findTrigger(action: EnterpriseAction): void {
        const arr = Object.values(TriggerEnum) as unknown as Array<TriggerEnum>;
        action.trigger = arr[Math.floor(Math.random() * arr.length)];
    }

    private static _findMission(action: EnterpriseAction): void {
        const arr = Object.values(MissionEnum) as unknown as Array<MissionEnum>;
        action.mission = arr[Math.floor(Math.random() * arr.length)];
    }

    private static _findNeed(action: EnterpriseAction): void {
        const arr = Object.values(NeedEnum) as unknown as Array<NeedEnum>;
        action.need = arr[Math.floor(Math.random() * arr.length)];
    }

    private static _findDatePart(action: EnterpriseAction) {
        let date: Date = null;
        try {
            date = new Date(action.datetime);
        } catch (e) {
            return;
        }
        const hour = date.getHours();
        if (hour >= 3 && hour < 7) {
            action.datePart = DatePartEnum.DAWN;
        } else if (hour >= 7 && hour < 11) {
            action.datePart = DatePartEnum.MORNING;
        } else if (hour >= 11 && hour < 17) {
            action.datePart = DatePartEnum.NOON;
        } else if (hour >= 17 && hour < 22) {
            action.datePart = DatePartEnum.EVENING;
        } else if (hour >= 22 || hour < 3) {
            action.datePart = DatePartEnum.NIGHT;
        }
    }

    static processLocation(): number {
        const stagings = Db.run<Array<StagingLocation>>('SELECT * FROM s_location');
        stagings.forEach((staging, index) => {
            const enterprise: EnterpriseLocation = {
                id: parseInt(staging.id),
                name: staging.name,
                type: staging.type as LocationTypeEnum,
                placeOfPurchase: staging.placeOfPurchase as PlaceOfPurchaseEnum,
                // remove unnecessary4
            };
            Db.insert('e_location', enterprise, index);
        });
        return stagings.length;
    }

    static processCustomer(): number {
        const stagings = Db.run<Array<StagingCustomer>>('SELECT * FROM s_customer');
        stagings.forEach((staging, index) => {
            const enterprise: EnterpriseCustomer = {
                id: parseInt(staging.id),
                gender: staging.gender as GenderEnum,
                age: parseInt(staging.age),
                nationality: staging.nationality,
                // remove address
                // remove unnecessary2
            };
            Db.insert('e_customer', enterprise, index);
        });
        return stagings.length;
    }

    static processProduct(): number {
        const stagings = Db.run<Array<StagingProduct>>('SELECT * FROM s_product');
        stagings.forEach((staging, index) => {
            const enterprise: EnterpriseProduct = {
                id: parseInt(staging.id),
                cluster: staging.cluster as ProductClusterEnum,
                name: staging.name,
                price: parseInt(staging.price),
                // remove unnecessary1
            };
            Db.insert('e_product', enterprise, index);
        });
        return stagings.length;
    }

    static processSession(): number {
        const stagings = Db.run<Array<StagingSession>>('SELECT * FROM s_session');
        stagings.forEach((staging, index) => {
            const enterprise: EnterpriseSession = {
                id: parseInt(staging.id),
                customer: parseInt(staging.customer), // Customer.id
                isAnonymous: !!staging.isAnonymous,
                touchpoint: staging.touchpoint as TouchpointEnum,
                location: parseInt(staging.location), // Location.id
                createdAt: staging.createdAt,
                ipAddress: staging.ipAddress,
                useragent: staging.useragent,
                acceptLanguage: staging.acceptLanguage,
                consumerApp: staging.consumerApp,
                // remove unnecessary2
            };
            this._parseIpAddress(enterprise);
            this._parseUserAgent(enterprise);
            this._parseLanguage(enterprise);
            Db.insert('e_session', enterprise, index);
        });
        return stagings.length;
    }

    static processAction(): number {
        const stagings = Db.run<Array<StagingAction>>('SELECT * FROM s_action');
        stagings.forEach((staging, index) => {
            const enterprise: EnterpriseAction = {
                id: parseInt(staging.id),
                datetime: staging.datetime,
                date: staging.datetime.substr(0, 10),
                session: parseInt(staging.session), // Session
                journeyPhase: staging.journeyPhase as JourneyPhaseEnum,
                product: parseInt(staging.product), // Product
                // remove referer
                // remove unnecessary5
            };
            this._findDatePart(enterprise);
            this._findTrigger(enterprise);
            this._findMission(enterprise);
            this._findNeed(enterprise);
            Db.insert('e_action', enterprise, index);
        });
        return stagings.length;
    }
}