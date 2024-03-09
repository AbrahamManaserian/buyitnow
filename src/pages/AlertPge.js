import { Box, Button, Collapse, Grid, TextField, Typography } from '@mui/material';
import { doc, setDoc, updateDoc } from 'firebase/firestore';
import { useState } from 'react';
import { db } from '../firebase';
import SelectSmall from '../components/SelectSmall';
import { format } from 'date-fns';

const typeItems = ['Email', 'Text Message'];
const frequencyItems = ['Daily', 'Weekly'];

export default function AlertPage() {
  const [alertType, setAlertType] = useState('');
  const [frequency, setFrequency] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [mailNumber, setMailNumber] = useState({ mail: '', number: '' });
  const [required, setrequired] = useState(false);
  // console.log(item);
  const handleClick = async () => {
    if (alertType && frequency && firstName && lastName && (mailNumber.number || mailNumber.mail)) {
      const key = format(new Date(), 'yMMdd');
      try {
        await updateDoc(doc(db, 'alerts', 'unregistered', key, key), {
          [+Date.now()]: {
            // item: item,
            firstName: firstName,
            lastName: lastName,
            email: mailNumber.mail,
            number: mailNumber.number,
            alertType: alertType,
            frequency: frequency,
          },
        });
        setrequired(false);
        setAlertType('');
        setFrequency('');
        setFirstName('');
        setLastName('');
        setMailNumber({ mail: '', number: '' });
      } catch (error) {
        await setDoc(doc(db, 'alerts', 'unregistered', key, key), {
          [+Date.now()]: {
            // item: item,
            firstName: firstName,
            lastName: lastName,
            email: mailNumber.mail,
            number: mailNumber.number,
            alertType: alertType,
            frequency: frequency,
          },
        });
        setrequired(false);
        setAlertType('');
        setFrequency('');
        setFirstName('');
        setLastName('');
        setMailNumber({ mail: '', number: '' });
      }
    } else if (
      !alertType ||
      !frequency ||
      !firstName ||
      !lastName ||
      !mailNumber.number ||
      !mailNumber.mail
    ) {
      console.log(alertType, frequency, firstName, lastName, mailNumber.number, mailNumber.mail);
      console.log(alertType && frequency && firstName && lastName && (mailNumber.number || mailNumber.mail));
      setrequired(true);
      // return;
    }
  };
  return (
    <Grid item xs={12} container>
      <Grid item xs={6} container direction="column" p="10px">
        <Typography fontSize="18px" fontWeight={700} pb="20px">
          Don’t see the vehicle you want? Sign up for Buy It Now Vehicle Alerts.
        </Typography>
        <Typography fontSize="16px" pb="20px">
          Vehicle Alerts are emails or text messages notifying you of the latest vehicles we add to our
          inventory based on what you're looking for.
        </Typography>
        <Typography fontSize="16px" pb="20px">
          You can cancel alerts at any time or change the frequency to suit your needs. You can also set up as
          many alerts as you want.
        </Typography>
        <Typography fontSize="16px" pb="20px">
          By signing up for Vehicle Alerts, you are consenting to receive Vehicle Alert emails or text
          messages. To edit or remove/unsubscribe from a Vehicle Alert email, use the links within the “Manage
          Alerts” section of that email. To unsubscribe from a Vehicle Alert text message, simply text “STOP”
          to the Copart text message you receive.
        </Typography>
      </Grid>
      <Grid item xs={6} container direction="column" p="10px">
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            // alignContent
            flexWrap: 'wrap',
            alignItems: 'flex-start',
            // width: '100%',
            p: '15px 8px 8px 8px',
            maxWidth: { xs: '100%', sm: 360 },
          }}
        >
          <SelectSmall
            required={required}
            items={typeItems}
            state={alertType}
            setState={setAlertType}
            name={'Alert Type'}
          />
          <SelectSmall
            required={required}
            items={frequencyItems}
            state={frequency}
            setState={setFrequency}
            name={'Frequency'}
          />
          <TextField
            sx={{
              width: '48%',
              mb: '12px',
              '& .MuiFormHelperText-root': { color: 'red', margin: '4px 0 0 0' },
            }}
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            size="small"
            name="First Name"
            type="name"
            label="First Name"
            helperText={!firstName && required && 'First Name Required'}
          />
          <TextField
            sx={{
              width: '48%',
              mb: '12px',
              '& .MuiFormHelperText-root': { color: 'red', margin: '4px 0 0 0' },
            }}
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            size="small"
            name="Last Name"
            // fullWidth
            label="Last Name"
            helperText={!lastName && required && 'Last Name Required'}
          />

          <Collapse sx={{ width: '100%' }} in={!!alertType} timeout="auto" unmountOnExit>
            {alertType === 'Email' ? (
              <div>
                <TextField
                  sx={{
                    '& .MuiFormHelperText-root': { color: 'red', margin: '4px 0 0 0' },
                  }}
                  value={mailNumber.mail}
                  onChange={(e) => setMailNumber({ ...mailNumber, mail: e.target.value })}
                  size="small"
                  fullWidth
                  label={alertType === 'Email' ? 'Email' : 'Arm Number Only'}
                  helperText={!mailNumber.mail && required && 'Email Required'}
                />
                <Typography pt="8px" fontSize="12px">
                  I consent to receiving text messages from Copart. I understand that message & data rates may
                  apply and that I can unsubscribe at any time by texting "STOP" to any Copart text message I
                  receive. You may receive up to thirty-one (31) text messages per month. For more
                  information, please read our Terms and Conditions and Privacy Policy.
                </Typography>
              </div>
            ) : (
              <div>
                <TextField
                  sx={{
                    '& .MuiFormHelperText-root': { color: 'red', margin: '4px 0 0 0' },
                  }}
                  value={mailNumber.number}
                  onChange={(e) => setMailNumber({ ...mailNumber, number: e.target.value })}
                  size="small"
                  fullWidth
                  label={alertType === 'Email' ? 'Email' : 'Arm Number Only'}
                  helperText={!mailNumber.number && required && 'Phone Number Required'}
                />
                <Typography pt="8px" fontSize="12px">
                  By signing up for Vehicle Alerts, you are consenting to receive Vehicle Alert emails. To
                  edit or remove/unsubscribe from a Vehicle Alert email, use the links within the “Manage
                  Alerts” section of that email.
                </Typography>
              </div>
            )}

            {/* <TextField size="small" fullWidth label="fullWidth" /> */}
          </Collapse>
        </Box>
        {/* <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            flexWrap: 'wrap',
            alignItems: 'flex-end',
            width: '100%',
            p: '8px',
            // maxWidth: { xs: '100%', sm: 360 },
          }}
        > */}
        <Button onClick={handleClick} size="small">
          Set Alert
        </Button>
        {/* </Box> */}
      </Grid>
      {/* <Typography>Alert page</Typography> */}
    </Grid>
  );
}
