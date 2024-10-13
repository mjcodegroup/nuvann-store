import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import { styled } from '@mui/material';
import { grey } from '@mui/material/colors';

interface CustomDrawerProps {
  open: boolean;
  onClose: () => void;
  anchor: 'top' | 'right' | 'bottom' | 'left';
  children: React.ReactNode;
  puller?: boolean;
}

const Puller = styled('div')(({ theme }) => ({
  width: 30,
  height: 6,
  backgroundColor: grey[300],
  borderRadius: 3,
  position: 'absolute',
  top: 8,
  left: 'calc(50% - 15px)',
  ...theme.applyStyles('dark', {
    backgroundColor: grey[900],
  }),
}));

const CustomDrawer: React.FC<CustomDrawerProps> = ({ open, onClose, anchor, children, puller }) => {
  return (
    <Drawer anchor={anchor} open={open} onClose={onClose} elevation={15}>
      <Box
        sx={{ 
          width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 ,
          height: anchor === 'bottom' ? 500 : 'auto',
        }}
        role="presentation"
      >
        {children}
        {
          puller && <Puller />
        }
      </Box>
    </Drawer>
  );
};

export default CustomDrawer;