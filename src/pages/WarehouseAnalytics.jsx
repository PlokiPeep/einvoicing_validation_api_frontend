import { BasicPage } from "./BasicPage";
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import InteractiveMap from "../components/InteractiveMap";
import DeliveryGraph from "../components/DeliveryGraph"
import DistancesGraph from "../components/DistancesGraph"
import DTimeGraph from "../components/DTimeGraph"
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


const WarehouseAnalytics = () => {
  const { user } = useAuth();

  return (
    <BasicPage title="Warehouse Planning" >
      <Box sx={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr 1fr',
        gridTemplateRows: '1fr 1fr 1fr 1fr 1fr 1fr 1fr',
        gap: '20px',
        height: `calc(100vh - 200px)`
      }}>

        <Item sx={{
          gridArea: '1 / 1 / 3 / 3 ',
        }}>
          {user.tier === 'Starter'
          ? <BlurredBox type="Units over time graph">
              <DeliveryGraph />
            </BlurredBox>
          : <DeliveryGraph />
          }
        </Item>

        <Item sx={{
          gridArea: '3 / 1 / 5 / 3 ',
        }}>
          {user.tier !== 'Ultimate'
          ? <BlurredBox type="Delivery distance istance graph">
              <DistancesGraph />
            </BlurredBox>
          : <DistancesGraph />
          }
          

        </Item>


        <Item sx={{
          gridArea: '5 / 1 / 8 / 3 ',
        }}>
          {user.tier !== 'Ultimate'
          ? <BlurredBox type="Delivery time graph">
          <DTimeGraph />
            </BlurredBox>
          : <DTimeGraph />
          }

        </Item>

        <Item sx={{
          gridArea: '1 / 3 / 8 / 5 ',
        }}>
          {user.tier !== 'Ultimate'
          ? <BlurredBox type="Interactive heatmap">
              <InteractiveMap />
            </BlurredBox>
          : <InteractiveMap />
          }
        </Item>

      </Box>
    </BasicPage>
  );
};

export default WarehouseAnalytics;
