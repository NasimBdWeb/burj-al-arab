import 'date-fns';
import React, { useContext, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import { Button } from '@material-ui/core';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
  TimePicker,
} from '@material-ui/pickers';
import { UserContext } from '../../App';


export default function Book() {
  const[loggedInUser,setloggedInUser] =  useContext(UserContext);
  const [selectedDate, setSelectedDate] = useState({
           checkin : new Date(),
           checkout : new Date()
          
  });

  const handlecheckinDate = (date) => {
    const newDates = {...selectedDate}
    newDates.checkin = date;
    setSelectedDate(newDates);
  };
  const handleCheckoutDate = (date) => {
    const newDates = {...selectedDate}
    newDates.checkout = date;
    setSelectedDate(newDates);
  };
  
  const handleBooking=()=>{
    const newBookings = {...loggedInUser, ...selectedDate}
    fetch('http://localhost:4000/addBooking',{
        method: 'POST',
        headers :{'Content-type': 'application/json'},
        body: JSON.stringify(newBookings)

    })
    .then(response => response.json())
    .then(data => {
          console.log(data)
    })
  }
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container justifyContent="space-around">
        <KeyboardDatePicker
          disableToolbar
          variant="inline"
          format="dd/MM/yyyy"
          margin="normal"
          id="date-picker-inline"
          label="checkin Date"
          value={selectedDate.checkin}
          onChange={handlecheckinDate}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
        <KeyboardDatePicker
          margin="normal"
          id="date-picker-dialog"
          label="checkOut Date"
          format="dd/MM/yyyy"
          value={selectedDate.checkout}
          onChange={handleCheckoutDate}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />

          <Button onClick={handleBooking} variant="contained" color="secondary">
           Book Now
          </Button>

        {/* <KeyboardTimePicker
          margin="normal"
          id="time-picker"
          label="Time picker"
          value={selectedDate}
          onChange={ handleCheckoutDate}
          KeyboardButtonProps={{
            'aria-label': 'change time',
          }}
        /> */}
      </Grid>
    
    </MuiPickersUtilsProvider>
  );
}