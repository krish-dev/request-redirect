import { useState } from 'react'
import Box from '@mui/material/Box'
import Backdrop from '@mui/material/Backdrop'
import Modal from '@mui/material/Modal'
import Grid from '@mui/material/Grid'
import Fade from '@mui/material/Fade'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import { useForm, Controller } from 'react-hook-form'

const AddRule = ({ onRuleAdded }) => {
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
  }
  /** Modal  handle */
  const [modalOpen, setModalOpen] = useState(false)
  const handleOpen = () => setModalOpen(true)
  const handleClose = () => setModalOpen(false)
  /** Form handle */
  const { handleSubmit, control, reset } = useForm()
  const onSubmit = (data) => {
    onRuleAdded(data)
    reset({ from: '', to: '' })
    handleClose()
  }

  return (
    <>
      <Button variant="contained" onClick={handleOpen}>
        Add Rule
      </Button>
      <Modal
        open={modalOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={modalOpen}>
          <Box sx={style} component="form" noValidate onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography id="transition-modal-title" variant="h6" component="h2">
                  Add redirect rules
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="from"
                  control={control}
                  defaultValue=""
                  rules={{ required: 'URL required' }}
                  render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <TextField
                      required
                      fullWidth
                      size="small"
                      label="From"
                      value={value}
                      onChange={onChange}
                      error={!!error}
                      helperText={error ? error.message : null}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="to"
                  control={control}
                  defaultValue=""
                  rules={{ required: 'URL required' }}
                  render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <TextField
                      required
                      fullWidth
                      size="small"
                      label="To"
                      value={value}
                      onChange={onChange}
                      error={!!error}
                      helperText={error ? error.message : null}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} container justifyContent="flex-end">
                <Button variant="contained" type="submit">
                  Save
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Fade>
      </Modal>
    </>
  )
}

export default AddRule
