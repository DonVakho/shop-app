import { observable } from 'mobx'
import { RootStore } from './RootStore'

import { IFilterProps } from '../Interfaces'

export default class FilterStore {
    rootStore: RootStore
    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
    }
    @observable
    maxPrice: number = 100

    @observable
    filter: IFilterProps = {
        category: 'all',
        thematicsGeneral: 'all',
        thematicsNarrow: 'all',
        price: [0, this.maxPrice]
    }

    public clearStore = () => {
        this.filter = {
            category: 'all',
            thematicsGeneral: 'all',
            thematicsNarrow: 'all',
            price: [0, this.maxPrice]
        }
    }
}