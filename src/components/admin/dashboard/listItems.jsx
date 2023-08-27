import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { Link } from 'react-router-dom';

export const mainListItems = (
  <div  >
    <ListItemButton>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText style={{color:'black'}} primary="Dashboard" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon >
      <Link to='/admin/products'>
        <ShoppingCartIcon />
        </Link>
      </ListItemIcon>
      <Link to='/admin/products'>
      <ListItemText style={{color:'black'}} primary="Products" />

      </Link>
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
      <Link to='/admin/users'>
      <PeopleIcon />
      </Link>
       
      </ListItemIcon>
      <Link to='/admin/users'>
      <ListItemText style={{color:'black'}} primary="Customers" />

      </Link>
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
      <Link to='/admin/transactions'>
      <BarChartIcon />
      </Link>
        
      </ListItemIcon>
      <Link to='/admin/transactions'>
      <ListItemText style={{color:'black'}} primary="Transactions" />
      </Link>
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="Integrations" />
    </ListItemButton>
  </div>
);

export const secondaryListItems = (
  <React.Fragment>
    <ListSubheader style={{ backgroundColor:'pink'}} component="div" inset>
      Saved reports
    </ListSubheader>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Current month" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Last quarter" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Year-end sale" />
    </ListItemButton>
  </React.Fragment>
);
