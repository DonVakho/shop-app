import { createContext } from 'react'

import FilterStore from './FilterStore'
import NavbarStore from './NavBarStore'
import CartStore from './CartStore'

export class RootStore {
    public  HOST = 'http://localhost' //  'http://10.99.17.16' //
    public BACKEND_ENDPOINT: string = 'http://localhost:5000/entrance?'
    filterStore = new FilterStore(this)
    navBarStore = new NavbarStore(this)
    cartStore = new CartStore(this)
}

export const RootStoreContext = createContext(new RootStore())