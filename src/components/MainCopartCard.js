import { Box, Divider, Link, List, ListItem, ListItemText, Paper, Typography } from '@mui/material';
import { format } from 'date-fns';

export default function MainCopartCard({ item }) {
  return (
    <Box
      sx={{
        display: 'flex',
        mt: { xs: 1, sm: 0 },
        width: '100%',
        maxWidth: { xs: '100%', sm: 360 },
        '& > :not(style)': {
          width: '100%',
          p: 1,
        },
      }}
    >
      <Paper elevation={3}>
        <Box sx={{ width: '100%', maxWidth: { xs: '100%', sm: 360 } }}>
          <Link
            href={`https://www.copart.com/lot/${item['Lot number']}`}
            sx={{ cursor: 'pointer' }}
            target="_blank"
          >
            Go to copart lot# {item['Lot number']}
          </Link>
          <nav aria-label="main mailbox folders">
            <List>
              <ListItem disablePadding>
                <Typography sx={{ fontWeight: 700 }}>
                  {item.Year} {item.Make} {item['Model Group']} {item.Trim}
                </Typography>
              </ListItem>
              <Divider />
              <ListItem
                disablePadding
                secondaryAction={
                  <ListItemText sx={{ '.MuiListItemText-primary': { fontWeight: 500 } }} primary={item.VIN} />
                }
              >
                <ListItemText sx={{ '.MuiListItemText-primary': { fontSize: '14px' } }} primary="VIN:" />
              </ListItem>
              <Divider />
              <ListItem
                disablePadding
                secondaryAction={
                  <ListItemText
                    sx={{ '.MuiListItemText-primary': { fontWeight: 500 } }}
                    primary={item['High Bid =non-vix,Sealed=Vix'] + '0$'}
                  />
                }
              >
                <ListItemText
                  sx={{ '.MuiListItemText-primary': { fontSize: '14px' } }}
                  primary="Current Bid:"
                />
              </ListItem>
              <Divider />
              <ListItem
                disablePadding
                secondaryAction={
                  <ListItemText
                    sx={{ '.MuiListItemText-primary': { fontWeight: 500, color: 'red' } }}
                    primary={item['Buy-It-Now Price'] + '0$'}
                  />
                }
              >
                <ListItemText
                  sx={{ '.MuiListItemText-primary': { fontWeight: 500, fontSize: '16px' } }}
                  primary="Buy It Now:"
                />
              </ListItem>
              <Divider />
              <ListItem
                disablePadding
                secondaryAction={
                  <ListItemText
                    sx={{ '.MuiListItemText-primary': { fontSize: '14px' } }}
                    primary={item['Lot number']}
                  />
                }
              >
                <ListItemText sx={{ '.MuiListItemText-primary': { fontSize: '14px' } }} primary="Lot#" />
              </ListItem>
              <Divider />
              <ListItem
                disablePadding
                secondaryAction={
                  <ListItemText
                    sx={{ '.MuiListItemText-primary': { fontWeight: 500 } }}
                    primary={format(new Date(item['Create Date/Time'].slice(0, 10)), 'P - hh:mm')}
                  />
                }
              >
                <ListItemText
                  sx={{ '.MuiListItemText-primary': { fontSize: '14px' } }}
                  primary="Item Added"
                />
              </ListItem>
              <Divider />

              <ListItem
                disablePadding
                secondaryAction={
                  <ListItemText
                    sx={{ '.MuiListItemText-primary': { fontSize: '13px' } }}
                    primary={`${item['Location state']} - ${
                      item['Sale Title Type'] === 'SC'
                        ? 'SALVAGE CERTIFICATE'
                        : item['Sale Title Type'] === 'CD'
                        ? 'CERTIFICATE OF DESTRUCTION'
                        : item['Sale Title Type'] === 'ST'
                        ? 'CERT OF TITLE-SALVAGE'
                        : item['Sale Title Type'] === 'R1'
                        ? 'CERT OF TITLE-SLVG REBLD'
                        : item['Sale Title Type'] === 'SV'
                        ? 'SALVAGE VEHICLE TITLE'
                        : item['Sale Title Type'] === 'CQ'
                        ? 'CERT OF TITLE OR SALVAGE ACQ'
                        : item['Sale Title Type'] === 'CT'
                        ? 'CERTIFICATE OF TITLE'
                        : item['Sale Title Type'] === 'SM'
                        ? ' MV-907A SALVAGE CERTIFICATE'
                        : item['Sale Title Type'] === 'SH'
                        ? ' CLEAN TITLE W/SALVAGE HISTORY'
                        : 'BILL OF SALE'
                    }`}
                  />
                }
              >
                <ListItemText
                  sx={{ '.MuiListItemText-primary': { fontSize: '14px' } }}
                  primary="Title Code:"
                />
              </ListItem>
              <Divider />

              <ListItem
                disablePadding
                secondaryAction={
                  <ListItemText
                    sx={{ '.MuiListItemText-primary': { fontSize: '14px' } }}
                    primary={`${+item.Odometer} ${
                      item['Odometer Brand'] === 'A' ? '(ACTUAL)' : '(NOT ACTUAL)'
                    }`}
                  />
                }
              >
                <ListItemText sx={{ '.MuiListItemText-primary': { fontSize: '14px' } }} primary="Odometer:" />
              </ListItem>
              <Divider />
              <ListItem
                disablePadding
                secondaryAction={
                  <ListItemText
                    sx={{ '.MuiListItemText-primary': { fontSize: '14px' } }}
                    primary={`${item['Runs/Drives'] === 'DEFAULT' ? 'Enhanced Vehicles' : 'Run and Drive'}`}
                  />
                }
              >
                <ListItemText
                  sx={{ '.MuiListItemText-primary': { fontSize: '14px' } }}
                  primary="Highlights:"
                />
              </ListItem>
              <Divider />
              <ListItem
                disablePadding
                secondaryAction={
                  <ListItemText
                    sx={{ '.MuiListItemText-primary': { fontSize: '14px' } }}
                    primary={item['Damage Description']}
                  />
                }
              >
                <ListItemText
                  sx={{ '.MuiListItemText-primary': { fontSize: '14px' } }}
                  primary="Primary Damage:"
                />
              </ListItem>
              <Divider />
              <ListItem
                disablePadding
                secondaryAction={
                  <ListItemText
                    sx={{ '.MuiListItemText-primary': { fontSize: '14px' } }}
                    primary={item['Secondary Damage'] || 'unknown'}
                  />
                }
              >
                <ListItemText
                  sx={{ '.MuiListItemText-primary': { fontSize: '14px' } }}
                  primary="Secondary Damage:"
                />
              </ListItem>
              <Divider />
              <ListItem
                disablePadding
                secondaryAction={
                  <ListItemText
                    sx={{ '.MuiListItemText-primary': { fontSize: '14px' } }}
                    primary={item.Color || 'unknown'}
                  />
                }
              >
                <ListItemText sx={{ '.MuiListItemText-primary': { fontSize: '14px' } }} primary="Color:" />
              </ListItem>
              <Divider />
              <ListItem
                disablePadding
                secondaryAction={
                  <ListItemText
                    sx={{ '.MuiListItemText-primary': { fontSize: '14px' } }}
                    primary={item.Engine || 'unknown'}
                  />
                }
              >
                <ListItemText
                  sx={{ '.MuiListItemText-primary': { fontSize: '14px' } }}
                  primary="Engine Type:"
                />
              </ListItem>
              <Divider />
              <ListItem
                disablePadding
                secondaryAction={
                  <ListItemText
                    sx={{ '.MuiListItemText-primary': { fontSize: '14px' } }}
                    primary={item.Cylinders || 'unknown'}
                  />
                }
              >
                <ListItemText
                  sx={{ '.MuiListItemText-primary': { fontSize: '14px' } }}
                  primary="Cylinders:"
                />
              </ListItem>
              <Divider />
              <ListItem
                disablePadding
                secondaryAction={
                  <ListItemText
                    sx={{ '.MuiListItemText-primary': { fontSize: '14px' } }}
                    primary={item.Drive || 'unknown'}
                  />
                }
              >
                <ListItemText sx={{ '.MuiListItemText-primary': { fontSize: '14px' } }} primary="Drive:" />
              </ListItem>
              <Divider />
              <ListItem
                disablePadding
                secondaryAction={
                  <ListItemText
                    sx={{ '.MuiListItemText-primary': { fontSize: '14px' } }}
                    primary={item['Has Keys-Yes or No'] || 'unknown'}
                  />
                }
              >
                <ListItemText sx={{ '.MuiListItemText-primary': { fontSize: '14px' } }} primary="Keys:" />
              </ListItem>
            </List>
          </nav>
        </Box>
      </Paper>
    </Box>
  );
}
