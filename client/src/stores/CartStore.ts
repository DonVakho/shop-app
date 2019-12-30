import { observable } from 'mobx'
import { RootStore } from './RootStore'

import {ICartItem} from '../Interfaces'

export default class CartStore {
    rootStore: RootStore

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
    }

    @observable
    cartItems: ICartItem[] = []
    
    @observable
    itemCount: number = this.cartItems.length
}