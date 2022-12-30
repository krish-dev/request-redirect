import { useState } from 'react'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import Switch from '@mui/material/Switch'
import { DataGrid } from '@mui/x-data-grid'

import NoRowsOverlay from './components/NoData'
import AddRule from './components/AddRule'
import { useLocalStorage } from './hooks/storage'

function App() {
  const [checked, setChecked] = useState(false)
  const [rules, setRules] = useLocalStorage('rules', [])

  const handleChange = (event) => {
    // chrome.runtime.sendMessage({type: 'request_proxy:control', data: event.target.checked});
    setChecked(event.target.checked)
  }

  const delCell = (params) => {
    return (
      <IconButton aria-label="delete">
        <DeleteIcon />
      </IconButton>
    )
  }

  const activeControlCell = (params) => {
    const handleChange = (event) => {
      console.log(params.row)
    }
    return <Switch checked={params.row.isActive} onChange={handleChange} />
  }

  const columns = [
    { field: 'isActive', headerName: 'State', renderCell: activeControlCell },
    { field: 'from', headerName: 'From', width: 280, editable: true },
    { field: 'to', headerName: 'To', width: 280, editable: true },
    { field: 'delete', headerName: 'Action', renderCell: delCell },
  ]

  const handleAddedRule = ({ from, to }) => {
    const existingRules = [...rules]
    existingRules.push({ id: existingRules.length + 1, from, to, isActive: true })
    setRules(existingRules)
  }

  return (
    <>
      <Box sx={{ flexGrow: 1 }} p={2}>
        <Grid container spacing={2}>
          <Grid item xs={12} container justifyContent="flex-end">
            <AddRule onRuleAdded={handleAddedRule} />
          </Grid>
          <Grid item xs={12}>
            <Paper elevation={3}>
              <Box sx={{ height: 400, width: '100%' }}>
                <DataGrid
                  rows={rules}
                  columns={columns}
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
  )
}

export default App
