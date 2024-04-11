import React from 'react';
import { TextField, Box, Typography } from '@mui/material';

function ItemFilter() {
  return (
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Typography sx={{ paddingLeft: "10%" }}>Filter by product:</Typography>
        <TextField variant="outlined" size="medium" placeholder="Item ID"/>
      </Box>
  );
}

export default ItemFilter;
