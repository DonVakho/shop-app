import FilterStore from './FilterStore'
import NavbarStore from './NavBarStore'
import CartStore from './CartStore'
import { createContext } from 'react'

export class RootStore {
    filterStore = new FilterStore(this)
    navBarStore = new NavbarStore(this)
    cartStore = new CartStore(this)
}

export const RootStoreContext = createContext(new RootStore())