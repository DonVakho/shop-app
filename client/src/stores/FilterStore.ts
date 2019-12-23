import { observable } from 'mobx'
import { RootStore } from './RootStore'

import { IFilterProps, IItem } from '../Interfaces'

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
    filterData: any = null
    
    public clearStore = () => {
        this.filter = {
            category: 'სხვადასხვა',
            thematicsGeneral: 'სხვადასხვა',
            thematicsNarrow: 'სხვადასხვა',
            price: [0, this.maxPrice]
        }
    }
}