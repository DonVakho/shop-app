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

export interface IItemCard {
    name: string,
    price: number,
    img: string
}