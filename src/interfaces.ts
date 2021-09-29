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

type R =  Record<string, unknown>;
export interface StagingAction extends R {
    id: string;
    datetime: string;
    session: string;
    journeyPhase: string;
    product: string;
    referer: string;
    unnecessary5: string;
}

export interface StagingCustomer extends R {
    id: string;
    gender: string;
    age: string;
    nationality: string;
    address: string;
    unnecessary2: string;
}

export interface StagingLocation extends R {
    id: string;
    name: string;
    type: string;
    placeOfPurchase: string;
    unnecessary4: string;
}

export interface StagingProduct extends R {
    id: string;
    cluster: string;
    name: string;
    price: string;
    unnecessary1: string;
}

export interface StagingSession extends R {
    id: string;
    customer: string;
    isAnonymous: string;
    anonymousBind: string;
    createdAt: string;
    ipAddress: string;
    useragent: string;
    acceptLanguage: string;
    consumerApp: string;
    unnecessary2: string;
    touchpoint: string;
    location: string;
}

export interface EnterpriseAction extends R {
    id: number;
    datetime: string;
    date: string;
    datePart?: DatePartEnum;
    session: number; // Session.id
    journeyPhase: JourneyPhaseEnum;
    product: number; // Product.id
    trigger?: TriggerEnum;
    mission?: MissionEnum;
    need?: NeedEnum;
}

export interface EnterpriseCustomer extends R {
    id: number;
    gender: GenderEnum;
    age: number;
    nationality: string;
}

export interface EnterpriseLocation extends R {
    id: number;
    name: string;
    type: LocationTypeEnum;
    placeOfPurchase: PlaceOfPurchaseEnum;
}

export interface EnterpriseProduct extends R {
    id: number;
    cluster: ProductClusterEnum;
    name: string;
    price: number;
}

export interface EnterpriseSession extends R {
    id: number;
    customer: number; // Customer.id
    isAnonymous: boolean;
    touchpoint: TouchpointEnum;
    location: number; // Location.id
    createdAt: string;
    ipAddress: string;
    ipCountry?: string;
    ipCity?: string;
    ipRegion?: string;
    ipMetro?: number;
    ipTimezone?: string;

    useragent: string;
    uaClient?: string;
    uaBrowser?: string;
    uaEngine?: string;
    uaOs?: string;
    uaDeviceVendor?: string;
    uaDeviceType?: string;
    uaDeviceModel?: string;
    uaLanguage?: string;
    consumerApp: string;
    acceptLanguage?: string;
}

export interface GeoResult {
    range: Array<number>;
    country: string;
    region: string;
    timezone: string;
    city: string;
    ll: string;
    metro: number;
    area: number;
}

export interface Datamart4055 extends R {
    date: string;
    datePart: DatePartEnum;
    age: number;
    touchpoint: TouchpointEnum;
    count: number;
}

export type BatchResponse = Record<string, number>;