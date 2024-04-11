import { BasicPage } from "./BasicPage";
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import InteractiveMap from "../components/InteractiveMap";
import SliderWithToggle from "../components/Sliders";
import ItemFilter from "../components/HeatmapOptionDropdown"
import BlurredBox from "../components/boxes/BlurredBox";
import { useAuth } from '../hooks/useAuth';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  position: 'relative',
  overflow: 'hidden',
  color: theme.palette.text.secondary,
}));


const WarehousePlanning = () => {
  const { user } = useAuth();
  return (
    <BasicPage title="Warehouse Planning" >
      <Box sx={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr 1fr',
        gridTemplateRows: '1fr 1fr 1fr 1fr',
        gap: '20px',
        height: `calc(100vh - 200px)`
      }}>

        <Item sx={{
          gridArea: '1 / 1 / 5 / 5',
        }}>

          
          {user.tier !== 'Ultimate'
          ? <BlurredBox type="Interactive heatmap">
            <InteractiveMap />
            </BlurredBox>
          : <InteractiveMap />
          }

        </Item>

        <Item sx={{
          gridArea: '5 / 1 / 6 / 2'
        }}>
          Delivery Times
          <SliderWithToggle status={{ startStat: false }} num={{ value: 70 }} />
        </Item>
        <Item sx={{
          gridArea: '6 / 1 / 6 / 2'
        }}>
          Delivery Distance
          <SliderWithToggle status={{ startStat: true }} num={{ value: 50 }} />
        </Item>

        <Item sx={{
          gridArea: '5 / 2 / 6 / 2'
        }}>
          No. Deliveries
          <SliderWithToggle status={{ startStat: true }} num={{ value: 50 }} />
        </Item>

        <Item sx={{
          gridArea: '6 / 2 / 6 / 3'
        }}>
          No. units × Price
          <SliderWithToggle status={{ startStat: true }} num={{ value: 50 }} />
        </Item>

        <Item sx={{
          gridArea: '5 / 3 / 6 / 5'
        }}>
          ProductFilter
          <ItemFilter />
        </Item>

        <Item sx={{
          gridArea: '6 / 3 / 6 / 4'
        }}>
          Customer Buy volume
          <SliderWithToggle status={{ startStat: false }} num={{ value: 30 }} />
        </Item>

        <Item sx={{
          gridArea: '6 / 4 / 6 / 5'
        }}>
          Customer Revenue
          <SliderWithToggle status={{ startStat: false }} num={{ value: 90 }} />
        </Item>
      </Box>
    </BasicPage>
  );
};

export default WarehousePlanning;
