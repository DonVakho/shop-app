export interface IThematicsNarrow {
    key: string,
    values: string[]
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
    description: string,
    price: number,
    img: string,
    left: number,
    category: string
}

export interface IStock {
    option: string,
    left: number
}