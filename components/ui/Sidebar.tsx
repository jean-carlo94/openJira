import { Drawer, Box, Typography, List, ListItem, ListItemIcon, ListItemText, ListItemButton, Divider,  } from '@mui/material'
import MoveToInboxOutlinedIcon from '@mui/icons-material/MoveToInboxOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';

import { useUI } from '@UIproviders';

const menuItems: string[] = ['Inbox','Starred', 'Send Email', 'Drafts'];

export const Sidebar = () => {

    const { sidemenuOpen, closeSideMenu } = useUI();
   
  return (
    <Drawer
      variant="temporary"
      anchor="left"
      open={ sidemenuOpen }
      onClose={ closeSideMenu }      
    >
        <Box sx={{ width:250 }}>

            <Box sx={{ padding: '5px 10px'}}>
                <Typography variant='h4'>Menu</Typography>
            </Box>

            <List>
                {
                    menuItems.map((text, index) => (
                        <ListItem key={text}>
                            <ListItemButton>
                                <ListItemIcon>
                                    {index % 2 ? (<MoveToInboxOutlinedIcon />) : (<EmailOutlinedIcon />) }
                                </ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItemButton>
                        </ListItem>
                    ))
                }
            </List>

            <Divider />

            <List>
                {
                    menuItems.map((text, index) => (
                        <ListItem key={text}>
                            <ListItemButton>
                                <ListItemIcon>
                                    {index % 2 ? (<MoveToInboxOutlinedIcon />) : (<EmailOutlinedIcon />) }
                                </ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItemButton>
                        </ListItem>
                    ))
                }
            </List>

        </Box>
    </Drawer>
  )
}