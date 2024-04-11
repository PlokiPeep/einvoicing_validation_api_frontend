import { BasicPage } from "./BasicPage";
import React, { useState } from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import BlurredBox from "../components/boxes/BlurredBox";
import { useAuth } from '../hooks/useAuth';


const InventoryActions = () => {
  const { user } = useAuth();
  const [alerts, setAlerts] = useState([]);

  const handleClick = (message, severity) => {
    const id = Date.now();
    const newAlert = {
      id,
      message,
      severity
    };
    setAlerts((prevAlerts) => [...prevAlerts, newAlert]); // Add new alert to the alerts array
  };

  const handleClose = (id) => {
    setAlerts((prevAlerts) => prevAlerts.filter((alert) => alert.id !== id)); // Remove alert from the alerts array
  };
  
  return <BasicPage title="Inventory Actions">
      {user.tier === 'Starter'
          ? <BlurredBox type="Inventory Actions page">
              <Container maxWidth="lg" maxHeight = "md" style={{ background: '#ffffff' }}>
              </Container>
            </BlurredBox>
          : <>
      <h2 style={{ color: 'black', fontSize: '1.5em', marginTop: '1em' }}>Churro's Metro Warehouse</h2>

      
      <Container maxWidth="lg" maxHeight = "md" style={{ background: '#ffffff' }}>

      <FormControlLabel
        control={
            <Checkbox
                name="SomeName"
                value="SomeValue"
            />
        }
        label="Move 1000 units of Pens from West Warehouse to this warehouse"/>
        <p>Reason: Your Pen sales in Kensington spiked 32% in the 3 days and 1000 units are needed by 2023-04-08.</p>
        
        <Box
          m={1}
        //margin
          display="flex"
          justifyContent="flex-end"
          alignItems="flex-end"
          sx={{ height: 20 }}
        >
          <div>
          <Button variant="contained" color="success" sx={{ height: 30, width: 200 }}onClick = {() => handleClick('Sent notification to Churros West warehouse to deliver 1000 units of Pens to Metro Warehouse', 'success')}>
            Notify Warehouse
          </Button>
            {alerts.map((alert) => (
              <Snackbar
                key={alert.id}
                open
                autoHideDuration={6000}
                onClose={() => handleClose(alert.id)}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
              >
                <MuiAlert elevation={6} variant="filled" onClose={() => handleClose(alert.id)} severity={alert.severity}>
                  {alert.message}
                </MuiAlert>
              </Snackbar>
            ))}
          </div>

          
        </Box>
      </Container>

      <Container maxWidth="lg" style={{ background: '#ffffff' }}>

      <FormControlLabel
        control={
            <Checkbox
                name="SomeName"
                value="SomeValue"
            />
        }
        label="Send overdue payment reminder to Officeworks for payment of $1759.55. "/>
        <p>Reason: Payment was due on 13/03/2023, which was 3 days ago. Failure to pay will mean product delivery will be cancelled.</p>
        <Box
          m={1}
        //margin
          display="flex"
          justifyContent="flex-end"
          alignItems="flex-end"
          sx={{ height: 20 }}
        >
          <div>
          <Button variant="contained" color="error" sx={{ height: 45, width: 200 }}onClick = {() => handleClick('Sent overdue payment reminder to Officeworks for payment of $1759.55.', 'error')}>
            Overdue Payment Reminder Notice
          </Button>
            {alerts.map((alert) => (
              <Snackbar
                key={alert.id}
                open
                autoHideDuration={6000}
                onClose={() => handleClose(alert.id)}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
              >
                <MuiAlert elevation={6} variant="filled" onClose={() => handleClose(alert.id)} severity={alert.severity}>
                  {alert.message}
                </MuiAlert>
              </Snackbar>
            ))}
          </div>

          
        </Box>
        
      </Container>

      <h2 style={{ color: 'black', fontSize: '1.5em', marginTop: '1em' }}>Churro's West Warehouse</h2>


      <Container maxWidth="lg" maxHeight = "sm" style={{ background: '#ffffff' }}>

        <FormControlLabel
          control={
              <Checkbox
                  name="SomeName"
                  value="SomeValue"
              />
          }
          label="Expected payment for 10,000 rubbers from OfficeGo with scheduled pickup from East Warehouse"/>
          <p>Reason: Upcoming scheduled payment on a weekly delivery for OfficeGo - 10,000 units delivered every Wednesday.</p>
          
          <Box
            m={1}
          //margin
            display="flex"
            justifyContent="flex-end"
            alignItems="flex-end"
            sx={{ height: 20 }}
          >
          <div>
          <Button variant="contained" color="warning" sx={{ height: 30, width: 200 }}onClick = {() => handleClick('Sent regular payment invoice for 10,000 rubbers from OfficeGo with pickup at East Warehouse', 'warning')}>
            Send Invoice
          </Button>
            {alerts.map((alert) => (
              <Snackbar
                key={alert.id}
                open
                autoHideDuration={6000}
                onClose={() => handleClose(alert.id)}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
              >
                <MuiAlert elevation={6} variant="filled" onClose={() => handleClose(alert.id)} severity={alert.severity}>
                  {alert.message}
                </MuiAlert>
              </Snackbar>
            ))}
          </div>

            
          </Box>
        </Container>

    <Container maxWidth="lg" style={{ background: '#ffffff' }}>

    <FormControlLabel
      control={
          <Checkbox
              name="SomeName"
              value="SomeValue"
          />
      }
      label="Move 7000 units of tote bags from South Warehouse to this warehouse"/>
      <p>Reason: Your Tote Bag sales in Strathfield spiked 92% in the 4 days and an additional 2500 units are needed by 2023-05-02.</p>
      
      <Box
        m={1}
      //margin
        display="flex"
        justifyContent="flex-end"
        alignItems="flex-end"
        sx={{ height: 20 }}
      >
        
        <div>
          <Button variant="contained" color="success" sx={{ height: 30, width: 200 }}onClick = {() => handleClick('Sent notification to Churros South warehouse to deliver 7000 units of Tote Bags to West Warehouse', 'success')}>
            Notify Warehouse
          </Button>
            {alerts.map((alert) => (
              <Snackbar
                key={alert.id}
                open
                autoHideDuration={6000}
                onClose={() => handleClose(alert.id)}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
              >
                <MuiAlert elevation={6} variant="filled" onClose={() => handleClose(alert.id)} severity={alert.severity}>
                  {alert.message}
                </MuiAlert>
              </Snackbar>
            ))}
          </div>
      </Box>
    </Container>
      
    <h2 style={{ color: 'black', fontSize: '1.5em', marginTop: '1em' }}>Churro's East Warehouse</h2>
    <Container maxWidth="lg" maxHeight = "md" style={{ background: '#ffffff' }}>

    <FormControlLabel
      control={
          <Checkbox
              name="SomeName"
              value="SomeValue"
          />
      }
      label="Upcoming payment for 850,000 ink refills for Uniball with pickup at East Warehouse"/>
      <p>Reason: ADHOC request from Uniball for a big product launch - requested pick up at East Warehouse and potential delivery.</p>
      
      <Box
        m={1}
      //margin
        display="flex"
        justifyContent="flex-end"
        alignItems="flex-end"
        sx={{ height: 20 }}
      >
        <div>
          <Button variant="contained" color="warning" sx={{ height: 30, width: 200 }}onClick = {() => handleClick('Sent payment invoice for 850,000 ink refills for Uniball with pickup at East Warehouse', 'warning')}>
            Send Invoice
          </Button>
            {alerts.map((alert) => (
              <Snackbar
                key={alert.id}
                open
                autoHideDuration={6000}
                onClose={() => handleClose(alert.id)}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
              >
                <MuiAlert elevation={6} variant="filled" onClose={() => handleClose(alert.id)} severity={alert.severity}>
                  {alert.message}
                </MuiAlert>
              </Snackbar>
            ))}
          </div>

        
      </Box>
    </Container>

    <Container maxWidth="lg" style={{ background: '#ffffff' }}>

    <FormControlLabel
      control={
          <Checkbox
              name="SomeName"
              value="SomeValue"
          />
      }
      label="Move 750 units of notebooks from North Warehouse to this warehouse"/>
      <p>Reason: Your notebook sales in Revesby spiked 72% in the 6 days and 1500 units are needed by 2023-12-16.</p>
      
      <Box
        m={1}
      //margin
        display="flex"
        justifyContent="flex-end"
        alignItems="flex-end"
        sx={{ height: 20 }}
      >
        <div>
          <Button variant="contained" color="success" sx={{ height: 30, width: 200 }}onClick = {() => handleClick('Sent notification to Churros North warehouse to deliver 750 units of Notebooks to East Warehouse', 'success')}>
            Notify Warehouse
          </Button>
            {alerts.map((alert) => (
              <Snackbar
                key={alert.id}
                open
                autoHideDuration={6000}
                onClose={() => handleClose(alert.id)}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
              >
                <MuiAlert elevation={6} variant="filled" onClose={() => handleClose(alert.id)} severity={alert.severity}>
                  {alert.message}
                </MuiAlert>
              </Snackbar>
            ))}
          </div>
      </Box>
    </Container>
    </>
    }
    </BasicPage>
};

export default InventoryActions;
