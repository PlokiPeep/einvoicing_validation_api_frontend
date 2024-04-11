import React from 'react';
import Box from '@mui/material/Box';
import ChangeHistoryOutlinedIcon from '@mui/icons-material/ChangeHistoryOutlined';
import getAPI from '../../services/APIService';

const StatisticBox = ({type, from_date, to_date}) => {
  let timePeriod = "12 months";

  const [title, setTitle] = React.useState("Test");
  const [unit, setUnit] = React.useState("");
  const [value, setValue] = React.useState("-");
  const [change, setChange] = React.useState("-");
  const [is_positive, setIsPositive] = React.useState("+");
  const [update, setUpdate] = React.useState(false);
  const APIService = getAPI();

  React.useEffect(() => {
    switch (type) {
      case "numActiveCustomers":
        setTitle("Number of active customers");
        setUnit("");
        fetchQuery(type, true);
        break;
      case "numInvoices":
        setTitle("Number of invoices");
        setUnit("");
        fetchQuery(type, true);
        break;
      case "averageDeliveryTime":
        setTitle("Delivery Time");
        setUnit(" days");
        fetchQuery(type, false);
        break;
      case "avgDeliveryDistance":
        setTitle("Delivery Distance");
        setUnit(" km");
        fetchQuery(type, false);
        break;
    }
  }, [update]);

  async function fetchQuery (query, is_int) {
    const response = await APIService.invoiceProcessingQuery(query, from_date, to_date);
    const data = response.data;

    if (data == null) {
      return;
    }
    
    if (is_int) {
      setValue(data.value.toFixed(0));
    } else {
      setValue(Math.round(data.value * 10) / 10);
    }

    setChange(data.change);
    setIsPositive(data.change > 0 ? "+" : "-")
  }

  return (
    <Box sx={{
      margin: '10px 10px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      height: '90%',
      color: 'black',
    }}>
      <Box sx={{
        fontSize: '0.9rem',
        textAlign: 'left',
        paddingBottom: '10px'
      }}>
        {title}
      </Box>
      <Box sx={{
        fontSize: '2rem',
        alignItems: 'center',
        flexGrow: 1,
      }}>
        {value}{unit}
      </Box>
      <Box sx={{
        fontSize: '0.8rem',
        color: is_positive === '+' ? 'green' : 'red',
      }}>
        {is_positive === '+' ? (
          <ChangeHistoryOutlinedIcon sx={{
            color: 'green',
            fontSize: '0.8rem',
            verticalAlign: 'middle',
            paddingLeft: '5px',
            paddingBottom: '5px'
          }} />
        ) : (
          <ChangeHistoryOutlinedIcon sx={{
            color: 'red',
            fontSize: '0.8rem',
            verticalAlign: 'middle',
            paddingRight: '5px',
            paddingTop: '4px',
            transform: 'rotate(180deg)'
          }} />
        )}
        {/* Rounded change */}
        {Math.round(change)}{"%"}
      </Box>
      <Box sx={{
        fontSize: '0.7rem',
        color: 'grey'
      }}>
      </Box>
    </Box>
  );
}

export default StatisticBox;
