import { useState } from "react";
import Box from "@mui/material/Box";
import Backdrop from "@mui/material/Backdrop";
import Modal from "@mui/material/Modal";
import Grid from "@mui/material/Grid";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";

const AddRule = ({onRuleAdded}) => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
  };

  const initialState = {
    from: {
      value: "",
      error: false,
      errorMessage: "You must enter a url",
    },
    to: {
      value: "",
      error: false,
      errorMessage: "You must enter an url",
    },
  };
  const [modalOpen, setModalOpen] = useState(false);
  const [formValues, setFormValues] = useState(initialState);
  const handleOpen = () => setModalOpen(true);
  const handleClose = () => setModalOpen(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formFields = Object.keys(formValues);
    let newFormValues = { ...formValues };
    for (let index = 0; index < formFields.length; index++) {
      const currentField = formFields[index];
      const currentValue = formValues[currentField].value;
      newFormValues = {
        ...newFormValues,
        [currentField]: {
          ...newFormValues[currentField],
          error: currentValue === '' ? true: false,
        },
      };
    }
    setFormValues({...newFormValues});
    console.log(formValues);
    if(!formValues.from.error && !formValues.to.error) {
        onRuleAdded({from: formValues.from.value, to: formValues.to.value});
        // setFormValues({...initialState });
        // setModalOpen(false);
    }
  };


  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormValues({
      ...formValues,
      [name]:{
        ...formValues[name],
        value
      }
    })
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
          <Box sx={style} component="form" noValidate onSubmit={handleSubmit} onChange={handleChange}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography
                  id="transition-modal-title"
                  variant="h6"
                  component="h2"
                >
                  Add redirect rules
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="from"
                  required
                  fullWidth
                  value={formValues.from.value}
                  error={formValues.from.error}
                  size="small"
                  label="From"
                  helperText={
                    formValues.from.error && formValues.from.errorMessage
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="to"
                  required
                  fullWidth
                  value={formValues.to.value}
                  error={formValues.to.error}
                  size="small"
                  label="To"
                  helperText={formValues.to.error && formValues.to.errorMessage}
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
  );
};

export default AddRule;
