import { AppBar, Toolbar, IconButton, Typography, Link } from '@mui/material'
import NextLink from 'next/link';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';

import { useUI } from '@UIproviders';

export const Navbar = () => {

  const { openSideMenu } = useUI();

  return (
    <AppBar position="sticky">
      <Toolbar>
        <IconButton
            size='large'
            edge='start'
            onClick={openSideMenu}
        >
          <MenuOutlinedIcon />
        </IconButton>
        <NextLink href="/" passHref legacyBehavior>
          <Link underline='none' color='white'>
            <Typography variant='h6'>OpenJira</Typography>
          </Link>
        </NextLink>
      </Toolbar>
    </AppBar>
  )
}