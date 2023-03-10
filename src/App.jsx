import { useEffect } from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import green from '@mui/material/colors/green'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import Switch from '@mui/material/Switch'
import { DataGrid } from '@mui/x-data-grid'

import NoRowsOverlay from './components/NoData'
import AddRule from './components/AddRule'
import { useLocalStorage } from './hooks/storage'

import Logo from './assets/images/logo.png'

function App() {
  const theme = createTheme({
    palette: {
      primary: green,
      mode: 'dark',
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 28,
          },
        },
      },
    },
  })
  const [rules, setRules] = useLocalStorage('rules', [])

  useEffect(() => {
    if (chrome.runtime) {
      chrome.runtime.sendMessage({ type: 'request_redirect:rules:updated', data: rules })
    }
  }, [rules])

  const findIndex = (id) => {
    return rules.findIndex((x) => x.id === id)
  }

  const delRuleByIndex = (index) => {
    const exRules = [...rules]
    exRules.splice(index, 1)
    setRules(exRules)
  }

  const delCell = (params) => {
    const handleClick = () => {
      delRuleByIndex(findIndex(params.row.id))
    }
    return (
      <IconButton aria-label="delete" onClick={handleClick}>
        <DeleteIcon />
      </IconButton>
    )
  }

  const updateActiveByIndex = (index) => {
    const exRules = [...rules]
    exRules[index].isActive = !exRules[index].isActive
    setRules(exRules)
  }

  const activeControlCell = (params) => {
    const handleChange = () => {
      updateActiveByIndex(findIndex(params.row.id))
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
    existingRules.push({ id: Date.now(), from, to, isActive: true })
    setRules(existingRules)
  }

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ flexGrow: 1, bgcolor: 'background.default', color: 'text.primary' }} p={2}>
        <Grid container spacing={2}>
          <Grid item xs={6} container justifyContent="flex-start">
            <img src={Logo} alt="" />
            <Typography ml={1} variant="h6">
              Request proxy
            </Typography>
          </Grid>
          <Grid item xs={6} container justifyContent="flex-end">
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
    </ThemeProvider>
  )
}

export default App
