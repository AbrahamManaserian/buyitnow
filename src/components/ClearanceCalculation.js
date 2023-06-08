import { ExpandLess, ExpandMore } from '@mui/icons-material';
import {
  Box,
  Button,
  Collapse,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Typography,
} from '@mui/material';
import OrderDialog from './OrderDialog';

const years = [2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016];
const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

export default function ClearanceCalculation({
  handleCorrectDate,
  price,
  calculation,
  openCloapse,
  setOpenColapse,
  yearMonth,
  handleChangeYearMonth,
  item,
}) {
  return (
    <Grid
      sx={{
        mt: 2,
        '& > :not(style)': {
          width: '100%',
          overflow: 'hidden',
          //   p: 1,
        },
      }}
      item
      container
      xs={12}
    >
      <Paper elevation={3}>
        <Box
          sx={{
            display: 'flex',
            borderRadius: '3px 3px 0 0',
            width: '100%',
            bgcolor: 'success.main',
            p: '8px',
          }}
        >
          <Typography sx={{ fontWeight: 700, color: 'white' }}>Calculation To Armenia</Typography>
        </Box>
        <Grid p={{ xs: 1, sm: 2 }} item xs={12} container>
          <Grid item xs={12} sm={6} direction="column" container pr={{ xs: 1, sm: 3 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography sx={{ fontSize: '15px', fontWeight: 700 }}>Vehicle:</Typography>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', p: '2px 0 2px 9px' }}>
                <Typography sx={{ fontSize: '14px' }}>Car Price -</Typography>

                <form>
                  <input
                    style={{
                      border: 'none',
                      // borderBottom: '1px solid black',
                      backgroundColor: 'lightblue',
                      maxWidth: '100px',
                      padding: '3px',
                      margin: '1px',
                      textAlign: 'center',
                      fontSize: '14px',
                      fontWeight: 500,
                    }}
                    placeholder="price"
                    // type="number"
                    value={price}
                    onChange={(e) => handleCorrectDate(e, e.currentTarget.value)}
                  ></input>
                  $
                </form>
              </Box>
              <Divider sx={{ width: '100%' }} />
              <Box sx={{ display: 'flex', justifyContent: 'space-between', p: '2px 0 2px 9px' }}>
                <Typography sx={{ fontSize: '14px' }}>Fob -</Typography>
                <Typography sx={{ fontSize: '14px', fontWeight: 500, pl: '2px' }}>
                  {calculation.fee}$
                </Typography>
              </Box>
              <Divider sx={{ width: '100%' }} />
              <Box sx={{ display: 'flex', justifyContent: 'space-between', p: '2px 0 2px 9px' }}>
                <Typography sx={{ fontSize: '14px' }}>Shipment -</Typography>
                <Typography sx={{ fontSize: '14px', fontWeight: 500, pl: '2px' }}>
                  {calculation.shipment}$
                </Typography>
              </Box>
            </Box>
            <Divider sx={{ width: '100%' }} />
            <Box sx={{ display: 'flex', flexDirection: 'column', pt: '4px' }}>
              <Typography sx={{ fontSize: '15px', fontWeight: 700 }}>Customs clearance:</Typography>

              <Box sx={{ display: 'flex', justifyContent: 'space-between', p: '2px 0 1px 9px' }}>
                <Typography sx={{ fontSize: '14px' }}>Maqsaturq -</Typography>
                <Typography sx={{ fontSize: '14px', fontWeight: 500, pl: '2px' }}>
                  {calculation.max}$
                </Typography>
              </Box>
              <Divider sx={{ width: '100%' }} />
              <Box sx={{ display: 'flex', justifyContent: 'space-between', p: '2px 0 2px 9px' }}>
                <Typography sx={{ fontSize: '14px' }}>AAH -</Typography>
                <Typography sx={{ fontSize: '14px', fontWeight: 500, pl: '2px' }}>
                  {calculation.AAH}$
                </Typography>
              </Box>
              <Divider sx={{ width: '100%' }} />
              <Box sx={{ display: 'flex', justifyContent: 'space-between', p: '2px 0 2px 9px' }}>
                <Typography sx={{ fontSize: '14px' }}>Environmental tax -</Typography>
                <Typography sx={{ fontSize: '14px', fontWeight: 500, pl: '2px' }}>
                  {calculation.nature}$
                </Typography>
              </Box>
              <Divider sx={{ width: '100%' }} />
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} direction="column" container pt={1} pl={{ xs: 0, sm: 3 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography sx={{ fontSize: '15px', fontWeight: 700 }}>Other Expenses:</Typography>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', p: '2px 0 2px 9px' }}>
                <Typography sx={{ fontSize: '14px' }}>Taxes + Broker -</Typography>
                <Typography sx={{ fontSize: '14px', fontWeight: 500, pl: '2px' }}>300$</Typography>
              </Box>
              <Divider sx={{ width: '100%' }} />
              <Box sx={{ display: 'flex', justifyContent: 'space-between', p: '2px 0 2px 9px' }}>
                <Typography sx={{ fontSize: '14px' }}>Commissions -</Typography>
                <Typography sx={{ fontSize: '14px', fontWeight: 500, pl: '2px' }}>200$</Typography>
              </Box>
              <Divider sx={{ width: '100%' }} />
              <Box sx={{ display: 'flex', justifyContent: 'space-between', p: '4px 0 2px 0' }}>
                <Typography sx={{ fontSize: '15px', fontWeight: 700 }}>Total Summary -</Typography>
                <Typography sx={{ fontSize: '16px', fontWeight: 700, pl: '2px' }}>
                  {calculation.total}$
                </Typography>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-end',
                  p: '4px 0 2px 0',
                }}
              >
                <OrderDialog item={item} />
                <Box
                  onClick={() => setOpenColapse(!openCloapse)}
                  sx={{ display: 'flex', justifyContent: 'flex-end', cursor: 'pointer' }}
                >
                  {openCloapse ? <ExpandLess /> : <ExpandMore />}
                </Box>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} container>
            <Collapse sx={{ width: '100%' }} in={openCloapse} timeout="auto" unmountOnExit>
              <Grid item xs={12} container justifyContent="flex-end" alignItems="flex-end">
                <Typography
                  sx={{ width: '100%', textAlign: 'center', fontSize: '12px', color: 'red', py: 1 }}
                >
                  If the year of the vin code in the picture does not match, please correct it!
                </Typography>
                <FormControl variant="standard" sx={{ mx: 1, minWidth: 80 }}>
                  <InputLabel>Year</InputLabel>
                  <Select name="year" value={yearMonth.year} onChange={handleChangeYearMonth} label="Year">
                    {years.map((item, index) => {
                      return (
                        <MenuItem key={item} value={item}>
                          {item}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
                <FormControl variant="standard" sx={{ mx: 1, minWidth: 80 }}>
                  <InputLabel>Month</InputLabel>
                  <Select name="month" value={yearMonth.month} onChange={handleChangeYearMonth} label="Month">
                    {months.map((item, index) => {
                      return (
                        <MenuItem key={item} value={item}>
                          {item}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
                <Button onClick={handleCorrectDate} variant="contained">
                  Correct
                </Button>
              </Grid>
            </Collapse>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
}
