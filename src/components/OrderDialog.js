// import * as React from 'react';
import { Box, Collapse, Divider, Link, TextField, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';
import { FacebookIcon, InstagramIcon, ViberIcon, WhatsappIcon } from '../SVGIcons';
import AddIcCallIcon from '@mui/icons-material/AddIcCall';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { db } from '../firebase';
import { addDoc, collection, doc, setDoc, updateDoc } from 'firebase/firestore';
import { format } from 'date-fns';

export default function OrderDialog(item) {
  const [inputs, setInputs] = useState({ adds: '', phone: '', email: '', name: '' });
  const [open, setOpen] = useState(false);
  const [openSucess, setOpenSucess] = useState(false);
  const [openCollapse, setOpenCollapse] = useState(false);
  const [required, setRequired] = useState(false);

  const handleClickInputs = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
    //   setRequired(false)
  };

  //   console.log(item);
  const handleClickConfirm = async () => {
    const key = format(new Date(), 'yMMdd');
    try {
      await updateDoc(doc(db, 'users', 'unregistered', key, key), {
        [+Date.now()]: { ...inputs, ...item },
      });
      setOpen(false);
      setInputs({ adds: '', phone: '', email: '', name: '' });
      setOpenCollapse(false);
      setOpenSucess(false);
    } catch (error) {
      await setDoc(doc(db, 'users', 'unregistered', key, key), {
        [+Date.now()]: { ...inputs, ...item },
      });
      setOpen(false);
      setInputs({ adds: '', phone: '', email: '', name: '' });
      setOpenCollapse(false);
      setOpenSucess(false);
    }
  };
  const handleClickSend = () => {
    if (inputs.name && inputs.phone) {
      setOpenSucess(true);
    } else {
      setRequired(true);
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  //   console.log(inputs);
  return (
    <div>
      <Button
        onClick={handleClickOpen}
        sx={{ textTransform: 'capitalize' }}
        size="small"
        variant="contained"
        color="success"
      >
        Order now
      </Button>
      <Dialog
        fullWidth={true}
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        {!openSucess ? (
          <>
            <DialogTitle id="alert-dialog-title">{'How would you like to be contacted?'}</DialogTitle>
            <DialogContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography>Social Network</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <a
                    target="_blank"
                    style={{ marginRight: '10px' }}
                    href="https://www.instagram.com/buyitnow_armenia/"
                  >
                    <InstagramIcon />
                  </a>
                  <a target="_blank" style={{ marginRight: '10px' }} href="https://www.facebook.com/">
                    <FacebookIcon />
                  </a>

                  <a
                    style={{ marginRight: '10px' }}
                    target="_blank"
                    aria-label="Chat on WhatsApp"
                    href="https://wa.me/37477055777"
                  >
                    <WhatsappIcon />
                  </a>
                  <a target="_blank" href="viber://chat/?number=37477055777">
                    <ViberIcon />
                  </a>
                </Box>
              </Box>
              <Divider />
              <Box
                sx={{ py: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
              >
                <Typography>Call to expert</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <AddIcCallIcon color="success" sx={{ fontSize: 25, mr: '13px' }} />
                  <Link href="tel:+37477055777">+37477055777</Link>
                </Box>
              </Box>
              <Divider />
              <Box
                sx={{ py: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <EmailOutlinedIcon color="success" sx={{ fontSize: 25, mr: '13px' }} />
                  <Typography>E-mail</Typography>
                </Box>
                <address style={{ display: 'flex', alignItems: 'flex-end' }}>
                  <Link sx={{ textAlign: 'right' }} href="mailto:abraham020788@gmail.com">
                    Abraham Manaseryan
                  </Link>
                </address>
              </Box>
              <Divider />
              <Box
                onClick={() => setOpenCollapse(!openCollapse)}
                sx={{ py: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
              >
                <Typography>Leave a message</Typography>
                {openCollapse ? <ExpandLess /> : <ExpandMore />}
              </Box>

              <Collapse in={openCollapse} timeout="auto" unmountOnExit>
                <TextField
                  name="adds"
                  value={inputs.adds}
                  onChange={handleClickInputs}
                  multiline
                  autoFocus
                  margin="dense"
                  label="Your add-ons"
                  fullWidth
                  variant="standard"
                />
                <TextField
                  //   autoFocus
                  name="name"
                  type="name"
                  value={inputs.name}
                  onChange={handleClickInputs}
                  margin="dense"
                  label="Name"
                  fullWidth
                  variant="standard"
                />
                <Typography color="error" sx={{ fontSize: '12px', display: required ? 'block' : 'none' }}>
                  This field is required
                </Typography>
                <TextField
                  //   autoFocus
                  name="phone"
                  type="number"
                  value={inputs.phone}
                  onChange={handleClickInputs}
                  margin="dense"
                  label="Phone number"
                  fullWidth
                  variant="standard"
                />
                <Typography color="error" sx={{ fontSize: '12px', display: required ? 'block' : 'none' }}>
                  This field is required
                </Typography>
                <TextField
                  name="email"
                  type="email"
                  value={inputs.email}
                  onChange={handleClickInputs}
                  margin="dense"
                  label="E-mail"
                  fullWidth
                  variant="standard"
                />

                <DialogActions>
                  <Button onClick={handleClose}>Cancel</Button>
                  <Button onClick={handleClickSend} autoFocus>
                    Send
                  </Button>
                </DialogActions>
              </Collapse>
              <Divider />
            </DialogContent>
          </>
        ) : (
          <DialogContent>
            <DialogTitle>
              {`${inputs.name}, thank you for cooperating with us.`} <br /> Your details are:
              <br />
            </DialogTitle>
            <DialogContentText id="alert-dialog-description">
              {`Vehicle - ${item.item.Make} ${item.item['Model Group']} ${item.item.Year}`}
              <br />
              {`Phone - ${inputs.phone}`}
              <br />
              {`email - ${inputs.email}`}
              <br />
              If the details are correct, please confirm.
            </DialogContentText>
            <DialogActions>
              <Button onClick={() => setOpenSucess(false)}>Cancel</Button>
              <Button onClick={handleClickConfirm} autoFocus>
                Confirm
              </Button>
            </DialogActions>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
}
