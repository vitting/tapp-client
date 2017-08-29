export interface IObjectIndex {
    [index: string]: number;
}

export interface IMyInfo {
    id: string;
    name: string;
    isAdmin: boolean;
}

export interface ISocketNewUserConnected {
    id: string;
    name: string;
    socketId: string;
}

export interface IChatMessage {
    _id?: string;
    date: Date;
    receiverId: string;
    senderId: string;
    message: string;
    messageRead: boolean;
}

export interface IChatResponse {
    user: ISocketNewUserConnected;
    message: IChatMessage;
}

export interface ITaskAction {
    accepted: boolean;
    taskId: string;
}

export interface IStoredUser {
    _id: string;
    name: string;
    isAdmin: boolean;
}

export interface IDawaAddressData {
    dør: string;
    etage: string;
    href: string;
    husnr: string;
    id: string;
    postnr: string;
    postnrnavn: string;
    stormodtagerpostnr: string;
    stormodtagerpostnrnavn: string;
    supplerendebynavn: string;
    vejnavn: string;
}

export interface IDawaAddress extends IDawa {
    data: IDawaAddressData;
}

export interface IDawa {
    type: string;
    tekst: string;
    forslagstekst: string;
    caretpos: number;
}

export interface ICalendarEvent {
    start: Date;
    title: string;
    color: {
        primary: string,
        secondary: string
    };
}

export interface IResponseValue<T> {
    success: boolean;
    msg: string;
    data?: T;
}

export interface IAuthentication {
    success: boolean;
    msg?: string;
    token?: string;
    data?: any;
}

export interface ILogin {
    username: string;
    password: string;
}

export interface IAddress {
    street: string;
    zipCode: number;
    city: string;
}

export interface IPerson {
    _id?: string;
    firstName: string;
    lastName: string;
    address: IAddress;
    mail?: string;
    mobilePhone: string;
}

export interface IEmployee extends IPerson {
    username?: string;
    password?: string;
}

export interface ICustomer extends IPerson {
}

export interface ITask {
    _id?: string;
    customer: ICustomer;
    startDate: Date;
    endDate: Date;
    description: string;
    address: IAddress;
    employeesAssigned: IEmployee[];
}

export interface ITaskData {
    taskId: string;
    title: string;
    date: string;
    time: string;
    description: string;
    address: string;
    assignedNames: string[];
    userAssigned: boolean;
}

export interface IItemData {
    taskItem: ITask;
    taskData: ITaskData;
}
