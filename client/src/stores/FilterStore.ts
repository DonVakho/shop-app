import { observable } from 'mobx'
import { RootStore } from './RootStore'

import { IFilterProps } from '../Interfaces'

export default class FilterStore {
    rootStore: RootStore
    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
    }

    @observable
    filter: IFilterProps = {
        category: 'all',
        thematicsGeneral: 'all',
        thematicsNarrow: 'all'
    }

    public clearStore = () => {
        this.filter = {
            category: 'all',
            thematicsGeneral: 'all',
            thematicsNarrow: 'all'
        }
    }
}