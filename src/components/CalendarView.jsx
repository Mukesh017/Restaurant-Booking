import React, { useState } from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css'; 
import './CalendarView.css'; 

const CalendarView = ({ onDateSelect, availableSlots }) => { 
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
    onDateSelect(date); 
  };

  const isDateAvailable = (date) => {
    if (!availableSlots) {
      return false; 
    }

    const dateString = date.toISOString().split('T')[0]; 
    return availableSlots.some((slot) => slot.date === dateString);
  };

  return (
    <div className="calendar-container">
      <h2>Select Date</h2>
      <div className="day-picker-wrapper"> 
        <DayPicker 
          onDayClick={handleDateChange} 
          selected={selectedDate} 
          monthPicker 
          yearPicker
          modifiers={{ 
            available: isDateAvailable 
          }} 
        /> 
      </div>
    </div>
  );
};

export default CalendarView;