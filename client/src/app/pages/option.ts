export interface Option {
    key: string | number,
    subKey?: number
    value: string,
    isDate?: boolean,
    isBoolean?: boolean,
    type?: string,
    isLink?:boolean
}