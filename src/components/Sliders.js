import { useState } from 'react';
import { Box, Slider, Switch } from '@mui/material';

function SliderWithToggle({status, num}) {
  const {startStat} = status;
  const{value} = num;
  const [isDisabled, setIsDisabled] = useState(startStat);
  const handleToggle = () => {
    setIsDisabled(!isDisabled);
  };


  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Switch checked={isDisabled} onChange={handleToggle} />
      </Box>
      <Slider
        disabled={isDisabled}
        aria-label="Percentage"
        sx={{ paddingBottom: '5px'}}
        defaultValue={value}
        valueLabelDisplay="auto"
      />
    </>
  );
}

export default SliderWithToggle;