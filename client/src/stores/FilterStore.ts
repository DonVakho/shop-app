import {observable} from 'mobx'
import {RootStore} from './RootStore'

export default class FilterStore {
    rootStore: RootStore
    constructor(rootStore: RootStore){
        this.rootStore = rootStore;
    }
    @observable
    category: string = 'all'

    @observable
    thematicsGeneral: string = 'all'

    @observable
    thematicsNarrow: string = 'all'

    public clearStore = () => {
        this.category = 'all'
        this.thematicsGeneral = 'all'
        this.thematicsNarrow = 'all'
    }
}