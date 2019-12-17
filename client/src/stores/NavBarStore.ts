import { observable } from 'mobx'
import { RootStore } from './RootStore'

export default class NavBarStore {
    rootStore: RootStore

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
    }

    @observable
    showFilter: boolean = false

    @observable
    userName: string = 'Vakhtang Donadze'
}