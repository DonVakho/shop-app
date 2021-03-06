import { observable } from 'mobx'
import { RootStore } from './RootStore'

import { IFilterProps, IFilterData } from '../Interfaces'

export default class FilterStore {
    rootStore: RootStore

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
    }

    @observable
    maxPrice: number = 100

    @observable
    filter: IFilterProps = {
        category: 'სხვადასხვა',
        thematicsGeneral: 'სხვადასხვა',
        thematicsNarrow: 'სხვადასხვა',
        price: [0, this.maxPrice]
    }

    @observable
    filterSet: boolean = false

    @observable
    doFilter: boolean = false

    @observable
    filterData: IFilterData = {
        categories: [],
        thematics: [],
        thematics_narrow: [],
        high_price: 100
    }

    public clearStore = () => {
        this.filter = {
            category: 'სხვადასხვა',
            thematicsGeneral: 'სხვადასხვა',
            thematicsNarrow: 'სხვადასხვა',
            price: [0, this.maxPrice]
        }
    }
}