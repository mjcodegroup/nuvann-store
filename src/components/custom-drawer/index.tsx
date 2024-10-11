import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';

interface CustomDrawerProps {
  open: boolean;
  onClose: () => void;
  anchor: 'top' | 'right' | 'bottom' | 'left';
  children: React.ReactNode;
}

const CustomDrawer: React.FC<CustomDrawerProps> = ({ open, onClose, anchor, children }) => {
  return (
    <Drawer anchor={anchor} open={open} onClose={onClose}>
      <Box
        sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
        role="presentation"
      >
        {children}
      </Box>
    </Drawer>
  );
};

export default CustomDrawer;