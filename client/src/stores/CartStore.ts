import {observable} from 'mobx'
import {RootStore} from './RootStore'

export default class CartStore {
    rootStore: RootStore
    constructor(rootStore: RootStore){
        this.rootStore = rootStore;
    }
    @observable
    itemCount: number = 0
}