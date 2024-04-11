import React from 'react';
import MUIDataTable from "mui-datatables";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { withStyles } from "@mui/styles";
import { createMuiTheme } from "@mui/styles";
import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import getAPI from '../../services/APIService';

const DataTableBox = ({type, from_date, to_date}) => {
  const [title, setTitle] = React.useState("Test");
  const [rows, setRows] = React.useState([]);
  const [update, setUpdate] = React.useState(false);
  const APIService = getAPI();

  React.useEffect(() => {
    switch (type) {
      case "clientDataTable":
        setTitle("Data by client");
        fetchQuery(type);
        break;
      case "suburbDataTable":
        setTitle("Data by suburb");
        fetchQuery(type);
        break;
    }
  }, [update]);

  async function fetchQuery (query) {
    const response = await APIService.invoiceProcessingQuery(query, from_date, to_date);
    const data = response.data;

    if (data == null) {
      return;
    }

    setRows(data.data);
  }

  const columns = [
    {
      field: "name",
      headerName: "Client",
      type: 'string',
      width: 120,
    },
    {
      field: "total-deliveries",
      headerName: "Total Deliveries",
      type: 'number',
      width: 150,
    },
    {
      field: "total-revenue",
      headerName: "Total Revenue",
      type: 'number',
      width: 150,
    },
   ];

  return (
    <Box sx={{
      margin: '10px 10px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      height: '100%',
      textAlign: 'left',
    }}>
      <Box>
        {title}
      </Box>
      <Box sx={{
          flexGrow: 1,
          marginBottom: '20px',
        }}>
        <DataGrid
          density="compact"
          rows={rows ?? []}
          columns={columns}
          initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 20,
                },
              },
              sorting: {
                sortModel: [
                  {
                    field: 'total-deliveries',
                    sort: 'desc',
                  },
                ],
              },
            }}
          // rowsPerPageOptions={[5]}
          disableRowSelectionOnClick
          hideFooterSelectedRowCount
          hideFooterPagination
          hideFooter
          sx={{
            '& .RaDatagrid-clickableRow': { cursor: 'default' },
            // Remove inner borders
            '& .MuiDataGrid-columnHeader, .MuiDataGrid-cell': {
              borderRight: 'none',
              borderBottom: 'none',
            },
            // Remove the outer borders
            border: 0

          }}
        />
      </Box>
    </Box>
  );
};

export default (DataTableBox);

