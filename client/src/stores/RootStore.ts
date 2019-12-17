import { createContext } from 'react'

import FilterStore from './FilterStore'
import NavbarStore from './NavBarStore'
import CartStore from './CartStore'

export class RootStore {
    filterStore = new FilterStore(this)
    navBarStore = new NavbarStore(this)
    cartStore = new CartStore(this)
}

export const RootStoreContext = createContext(new RootStore())