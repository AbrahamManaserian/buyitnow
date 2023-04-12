import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
// import { ArmFlag, GBFlag, RussianFlag } from './SVGIcons';
import { Box, Typography } from '@mui/material';
import { AppContext } from '../App';
import { ArmFlag, GBFlag, RussianFlag } from '../SVGIcons';

export default function FlagMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const context = React.useContext(AppContext);
  const [flag, setFlag] = React.useState(checkLanguage());
  function checkLanguage() {
    if (+context.language) {
      if (+context.language < 4 && +context.language > 0) {
        return +context.language;
      } else {
        return 1;
      }
    } else {
      return 1;
    }
  }
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (e) => {
    //   console.log(e.currentTarget.value);
    if (e.currentTarget.value) {
      setFlag(e.currentTarget.value);
      context.setLanguage(e.currentTarget.value + '');
      localStorage.setItem('language', e.currentTarget.value);
    }
    setAnchorEl(null);
  };
  //   console.log(flag);
  return (
    <div>
      {[<ArmFlag />, <GBFlag />, <RussianFlag />].map((item, index) => {
        if (flag === index + 1)
          return (
            <Box
              sx={{
                display: 'flex',
                cursor: 'pointer',
                // padding: '8px',
                // '&:hover': {
                //   bgcolor: 'neutral.light',
                //   justifyContent: 'center',
                //   //   padding: '10px',
                // },
                // borderRadius: '50%',
              }}
              //   id="basic-button"
              aria-controls={open ? 'basic-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
              key={index}
            >
              {item}
            </Box>
          );
      })}
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
        sx={{
          '& .MuiPaper-root': {
            borderRadius: '9px',
            // boxShadow:
            //   'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
          },
        }}
      >
        <MenuItem
          sx={{ margin: '5px', borderRadius: '9px', minWidth: '180px' }}
          value={1}
          onClick={handleClose}
          selected={flag === 1}
        >
          <ArmFlag />
          <Typography variant="body2" paddingLeft="15px">
            Armenia
          </Typography>
        </MenuItem>
        <MenuItem
          sx={{ margin: '5px', borderRadius: '9px', minWidth: '180px' }}
          value={2}
          onClick={handleClose}
          selected={flag === 2}
        >
          <GBFlag />
          <Typography variant="body2" paddingLeft="15px">
            English
          </Typography>
        </MenuItem>
        <MenuItem
          sx={{ margin: '5px', borderRadius: '9px', minWidth: '180px' }}
          value={3}
          onClick={handleClose}
          selected={flag === 3}
        >
          <RussianFlag />
          <Typography variant="body2" paddingLeft="15px">
            Russian
          </Typography>
        </MenuItem>
      </Menu>
    </div>
  );
}
