import {observable} from 'mobx'
import {RootStore} from './RootStore'

export default class FilterStore {
    rootStore: RootStore
    constructor(rootStore: RootStore){
        this.rootStore = rootStore;
    }
    @observable
    category: string = ''
}