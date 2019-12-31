export interface IThematicsNarrow {
    key: string,
    values: string[]
}

export interface IDescription {
    key: string,
    value: string
}


export interface IFilterProps {
    category: string
    thematicsGeneral: string
    thematicsNarrow: string
    price: number[]
}

export interface IFilterData {
    categories: string[]
    thematics: string[]
    thematics_narrow: IThematicsNarrow[]
    high_price: number
}

export interface IItem {
    id: string,
    name: string,
    description: IDescription[],
    price: number,
    img: string,
    left: number,
    category: string
}

export interface IStock {
    option: string,
    left: number
}

export interface IOverlayFormState {
    option: string,
    left: number,
    qnty: any,
    gender: string,
}

export interface ICartItem {
    item: IItem,
    option: string,
    qnty: number,
    gender: string,
}