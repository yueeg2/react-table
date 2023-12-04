import * as React from 'react';
import Box from '@mui/material/Box';
import { Badge as MuiBadge } from '@mui/material';

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