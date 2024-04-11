import React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useNavigate, useLocation } from 'react-router-dom';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import ListItemButton from '@mui/material/ListItemButton';
import mainlogo from '../assets/mainlogo.jpg';
import { getPrimaryNavList } from './NavList';

const background = '#1C2434';

export default function Navbar({ drawerWidth }) {
  const location = useLocation();
  const primaryNav = getPrimaryNavList();
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(Array(primaryNav.length).fill(true));

  const handleClick = (key) => {
    const newOpen = [...open];
    newOpen[key] = !newOpen[key];
    setOpen(newOpen);
  };

  return (
    <>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          display: 'block',
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: 'border-box',
            backgroundColor: background
            },
        }}
      >
        <Box sx={{ overflow: 'auto', paddingTop: '60px' }}>
          <Box sx={{
            cursor: 'pointer',
            position: 'fixed',
            top: 0,
            height: '60px',
            width: drawerWidth,
            color: 'white',
            backgroundColor: background,
            zIndex: 999,
            }} onClick={() => navigate(`/`)}>
            <img src={mainlogo} style={{
              height: '40px',
              margin: '15px 0 0 15px',
              float: 'left',
              borderRadius: '15px'
              }} />
            <Typography sx={{ float: 'left ', fontSize: '1.3em', paddingTop: '20px', paddingLeft: '15px' }}>
              ChurroFlow
            </Typography>
          </Box>

          <List sx={{ backgroundColor: background, marginTop: '70px' }}>
          {primaryNav.map(({ title, route, Icon, children }, key) => {
            const clickFn = route ? () => navigate(route) : () => handleClick(key)
            return (
                <ListItemButton onClick={clickFn} key={key} >
                  <ListItemIcon>
                    <Icon style={{fill: 'white'}} />
                  </ListItemIcon>
                  <ListItemText
                      disableTypography
                      primary={
                        <Typography style={{
                          fontWeight: location.pathname === route ? 'bold' : 'normal',
                          color: 'white'
                        }}>
                          {title}
                        </Typography>}
                      />
                </ListItemButton>
            );
          })}
          </List>
        </Box>
      </Drawer>
    </>
  );
}