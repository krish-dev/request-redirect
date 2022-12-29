import { useState } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { DataGrid } from "@mui/x-data-grid";

import NoRowsOverlay from "./components/NoData";
import AddRule from "./components/AddRule";

function App() {
  const [checked, setChecked] = useState(false);

  const handleChange = (event) => {
    // chrome.runtime.sendMessage({type: 'request_proxy:control', data: event.target.checked});
    setChecked(event.target.checked);
  };

  const columns = [
    { field: "from", headerName: "From", width: 350, editable: true },
    { field: "to", headerName: "To", width: 350, editable: true },
  ];

  const rows = [];

  const handleAddedRule = ({from, to}) => {
    console.log(from, to);
  }

  return (
    <>
      <Box sx={{ flexGrow: 1 }} p={2}>
        <Grid container spacing={2}>
          <Grid item xs={12} container justifyContent="flex-end">
            <AddRule onRuleAdded={handleAddedRule}/>
          </Grid>
          <Grid item xs={12}>
            <Paper elevation={3}>
              <Box sx={{ height: 400, width: "100%" }}>
                <DataGrid
                  rows={rows}
                  columns={columns}
                  checkboxSelection
                  disableSelectionOnClick
                  hideFooter={true}
                  experimentalFeatures={{ newEditingApi: true }}
                  components={{
                    NoRowsOverlay: NoRowsOverlay,
                  }}
                />
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default App;
