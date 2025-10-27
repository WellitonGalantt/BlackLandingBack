export interface ILead {
    name: string;
    email: string;
    phone: number;
    notification: boolean;
    createdAt: Date;
}

export interface IIntegrationRes {
    sucess: boolean;
    message: string;
}