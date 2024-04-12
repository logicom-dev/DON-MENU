import React from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Menu, MenuItem } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutButton from '../components/LogoutButton';

const Navbar = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const location = useLocation(); // Get the current location

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Mascotte
        </Typography>
        <IconButton
          edge="end"
          color="inherit"
          aria-label="menu"
          onClick={handleMenuOpen}
          sx={{ display: { xs: 'block', md: 'none' } }}
        >
          <MenuIcon />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          sx={{ display: { xs: 'block', md: 'none' } }}
        >
          <MenuItem
            component={Link}
            to="/admin/categories"
            onClick={handleMenuClose}
            sx={{ backgroundColor: location.pathname === '/admin/categories' ? '#f0f0f0' : 'transparent' }}
          >
            Categories
          </MenuItem>
          <MenuItem
            component={Link}
            to="/admin/articles"
            onClick={handleMenuClose}
            sx={{ backgroundColor: location.pathname === '/admin/articles' ? '#f0f0f0' : 'transparent' }}
          >
            Articles
          </MenuItem>
          <MenuItem
            component={Link}
            to="/admin/commande"
            onClick={handleMenuClose}
            sx={{ backgroundColor: location.pathname === '/admin/commande' ? '#f0f0f0' : 'transparent' }}
          >
            Commande
          </MenuItem>
          <MenuItem>
            <LogoutButton />
          </MenuItem>
        </Menu>
        <Button
          color="inherit"
          component={Link}
          to="/admin/categories"
          sx={{
            display: { xs: 'none', md: 'block' },
            backgroundColor: location.pathname === '/admin/categories' ? '#7A7A77' : 'transparent',
          }}
        >
          Categories
        </Button>
        <Button
          color="inherit"
          component={Link}
          to="/admin/articles"
          sx={{
            display: { xs: 'none', md: 'block' },
            backgroundColor: location.pathname === '/admin/articles' ? '#7A7A77' : 'transparent',
          }}
        >
          Articles
        </Button>
        <Button
          color="inherit"
          component={Link}
          to="/admin/commande"
          sx={{
            display: { xs: 'none', md: 'block' },
            backgroundColor: location.pathname === '/admin/commande' ? '#7A7A77' : 'transparent',
          }}
        >
          Commande
        </Button>
        <Button color="inherit" sx={{ display: { xs: 'none', md: 'flex' } }}>
          <LogoutButton />
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
