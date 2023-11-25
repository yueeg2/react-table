import * as React from 'react';
import Box from '@mui/material/Box';
import { Badge as MuiBadge } from '@mui/material';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import MailIcon from '@mui/icons-material/Mail';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';

export default function Badge({ children, invisible }: any) {
  

  return (
    <Box>
      <div>
        <MuiBadge color="info" variant="dot" invisible={invisible}>
          {children}
        </MuiBadge>
      </div>
    </Box>
  );
}