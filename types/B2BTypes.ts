import { pickupAddressType } from "./types";

export interface IPackageDetails {
    qty: string;
    orderBoxLength: string;
    orderBoxHeight: string;
    orderBoxWidth: string;
    boxSizeUnit: string;
    orderBoxWeight: string;
    boxWeightUnit: string;
}

// Interface for order stages
interface IOrderStage {
    stage: number;
    action: string;
    stageDateTime: Date;
}

export interface B2BCustomerDetailsType {
    _id: string;
    name: string;
    phone: string;
    state: string;
    city: string;
    pincode: string;
    gst: string;
}

// Interface for B2B order schema
export interface B2BOrderType {
    _id?: string;
    order_reference_id: string;
    client_name: string;
    sellerId?: string;
    freightType?: 0 | 1;
    pickupType?: 0 | 1;
    InsuranceType?: 0 | 1;
    pickupAddress?: pickupAddressType;
    product_description?: string;
    total_weight: number;
    quantity: number;
    ewaybill?: string;
    amount: number;
    invoiceNumber?: string;
    customer?: B2BCustomerDetailsType;
    packageDetails?: IPackageDetails[];
    bucket?: number;
    orderStages?: IOrderStage[];
    awb?: string;
    channelName?: string;
    carrierName?: string;
    invoiceImg?: string;
    supporting_document?: string;
}