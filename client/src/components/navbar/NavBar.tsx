//React Imports
import React, { useContext } from 'react'
import { observer } from 'mobx-react'
import Avatar from 'react-avatar'
//Style Imports
import { useStyles } from '../../styles/StylesNavBar'
//Material-ui core Imports
import {
  AppBar,
  Toolbar,
  IconButton,
  InputBase,
  Badge,
  MenuItem,
  Menu,
  Link
} from '@material-ui/core'
//Icon Imports
import AssignmentOutlinedIcon from '@material-ui/icons/AssignmentOutlined'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import FilterIcon from '../../assets/icons/filter_white.png'
import ShopName from '../../assets/icons/shop_name.png'
import SearchIcon from '@material-ui/icons/Search'
import MoreIcon from '@material-ui/icons/MoreVert'
//Store Imports
import { RootStoreContext } from '../../stores/RootStore'

const NavBar: React.FC = observer(() => {
  const classes = useStyles({} as any)
  const store = useContext(RootStoreContext)
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState<null | HTMLElement>(null)

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);

  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const preventDefault = (event: React.SyntheticEvent) => event.preventDefault();

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      transformOrigin={{ vertical: 'top', horizontal: 'left' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>შესვლა</MenuItem>
      <MenuItem onClick={handleMenuClose}>გამოსვლა</MenuItem>
    </Menu>
  );

  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      transformOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton>
          <Badge badgeContent={store.cartStore.itemCount} color="secondary">
            <ShoppingCartIcon />
          </Badge>
        </IconButton>
        <p>კალათა</p>
      </MenuItem>
      <MenuItem>
        <IconButton color="inherit">
          <AssignmentOutlinedIcon />
        </IconButton>
        <p>შეკვეთები</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton>
          <Avatar name={store.navBarStore.userName} round={true} size="40" color={'#9e0b0f'} textSizeRatio={2.2} />
        </IconButton>
        <p>პროფილი</p>
      </MenuItem>
    </Menu>
  );

  return (
    <div>
      <div className={classes.grow}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              className={classes.menuButton}
              onClick={() => store.navBarStore.showFilter = true}
            >
              <img src={FilterIcon} alt="filter" />
            </IconButton>
            <Link href='/' onClick={preventDefault}>
              <img src={ShopName} alt="logo" className={classes.logoIcon} />
            </Link>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="მოძებნა..."
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ 'aria-label': 'search' }}
              />
            </div>
            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
              <IconButton color="inherit">
                <Badge badgeContent={store.cartStore.itemCount} color="secondary">
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>

              <IconButton color="inherit">
                <AssignmentOutlinedIcon />
              </IconButton>

              <IconButton edge="end" color="inherit" onClick={handleProfileMenuOpen}>
                <Avatar name={store.navBarStore.userName} round={true} size="40" color={'#9e0b0f'} textSizeRatio={2.2} />
              </IconButton>
            </div>
            <div className={classes.sectionMobile}>
              <IconButton color="inherit" onClick={handleMobileMenuOpen}>
                <MoreIcon />
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
        {renderMobileMenu}
        {renderMenu}
      </div>
    </div>
  );
})

export default NavBar