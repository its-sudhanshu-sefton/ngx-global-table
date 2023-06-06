import { MENU_OPTIONS } from "../../enums/menu-enum/menu.enum"

export interface TableHeader {
    headerName: string,
    value: any,
    extras?: Partial<Extras>
}[]

export interface Extras {
    displayMenu: boolean,
    element: string,
    isDisplay: boolean
}

export interface TableData {
    [key: string]: string | any
}[]

export interface MenuOption { 
    optionType: MENU_OPTIONS, 
    rowDetails: any // will change later
}
