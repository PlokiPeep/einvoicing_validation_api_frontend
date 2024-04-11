import React from 'react';
import MUIDataTable from "mui-datatables";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { withStyles } from "@mui/styles";
import { createMuiTheme } from "@mui/styles";
import { DataGrid } from '@mui/x-data-grid';

const customTheme = createTheme({
  overrides: {
    MUIDataTable: {
      paper: {
        boxShadow: "none"
      }
    }
  }
});

const DataTableBox = ({type, from_date, to_date}) => {
  let title = "Test";

  switch (type) {
    case "client":
      title = "Data by client";
      break;
    case "suburb":
      title = "Data by suburb";
      break;
  }

  const options = {
    selectableRows: false,
    search: true,
    download: false,
    print: false,
    viewColumns: false,
    filter: true,
    filterType: "dropdown",
    responsive: "standard",
    tableBodyHeight: "100%",
    // onTableChange: (action, state) => {
    //   console.log(action);
    //   console.dir(state);
    // },
    setTableProps: () => {
      return {
        size: 'small',
      };
    },
    
  };

  const columns = [
    {
     name: "name",
     label: "Name",
     options: {
      filter: true,
      sort: true,
      fullWidth: true,
     }
    },
    {
     name: "total-deliveries",
     label: "Total Deliveries",
     options: {
      filter: true,
      sort: true,
     }
    },
    {
     name: "total-revenue",
     label: "Total Revenue",
     options: {
      filter: true,
      sort: true,
     }
    },
   ];


  const data = [
    ["Jaden Collins", 10000, 10000],
    ["Franky Rees", 10000, 10000],
    ["Aaren Rose", null, 10000],
    ["Johnny Jones", 10000, 10000],
    ["Jimmy Johns", 10000, 10000],
    ["Jack Jackson", 10000, 10000],
    ["Joe Jones", 10000, 10000],
    ["Jacky Jackson", 10000, 10000],
    ["Jo Jo", 10000, 10000],
    ["Donna Marie", 10000, 10000]
  ];

  

  return (
    // <ThemeProvider theme={customTheme}>
    //   <MUIDataTable
    //       title={title}
    //       data={data}
    //       columns={columns}
    //       options={options}
    //     />
    // </ThemeProvider>
    <DataGrid
      rows={rows}
      columns={columns}
      pageSize={5}
      rowsPerPageOptions={[5]}
      checkboxSelection
    />
  );
};

export default (DataTableBox);

