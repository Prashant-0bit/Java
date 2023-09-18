import React, { useState,useEffect } from 'react';
import moment from 'moment-timezone';
moment.tz.load(require('moment-timezone/data/packed/latest.json'));

const TimePicker = ({dateTime}) => {
  const timeZones = moment.tz.names();
  const [selectedTimeZone, setSelectedTimeZone] = useState('');
  const [selectedFormat, setSelectedFormat] = useState({
    date: 'DD.MM.YYYY', 
    time: 'HH:mm:ss',
  });
  const [is12HourFormat, setIs12HourFormat] = useState(false);

  const handleTimeZoneChange = (event) => {
    setSelectedTimeZone(event.target.value);
  };

  const handleDateFormatChange = (event) => {
    setSelectedFormat({ ...selectedFormat, date: event.target.value });
  };

  const handleTimeFormatChange = (event) => {
    setSelectedFormat({ ...selectedFormat, time: event.target.value });
  };

  const toggle12HourFormat = () => {
    setIs12HourFormat(!is12HourFormat);
  };

  const getTimeFormat = () => {
    return is12HourFormat ? 'hh:mm:ss A' : selectedFormat.time;
  };

  const [currentTime, setCurrentTime] = useState(moment().format(selectedFormat.time));


  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(moment().format(selectedFormat.time));
    }, 1000);

    return () => clearInterval(intervalId); // Clear interval on component unmount
  }, [selectedFormat.time]);

  return (
    <div className='TimePicker'>
      <label>Select a Time Zone:</label>
      <select value={selectedTimeZone} onChange={handleTimeZoneChange}>
        <option value="">Select a time zone</option>
        {timeZones.map((zone) => (
          <option key={zone} value={zone}>
            {zone}
          </option>
        ))}
      </select>

      <label>Select Date Format:</label>
      <select value={selectedFormat.date} onChange={handleDateFormatChange}>
        <option value="DD.MM.YYYY">(15.09.2023)</option>
        <option value="LL">(September 15, 2023)</option>

      </select>

      <label>Select Time Format:</label>
      <select value={selectedFormat.time} onChange={handleTimeFormatChange}>
        <option value="HH:mm:ss">24-Hour (23:59:59)</option>
        <option value="hh:mm:ss A">12-Hour (11:59:59 AM/PM)</option>
      </select>

      <p>Selected Time Zone: {selectedTimeZone}</p>
      <p>
         {moment.tz(selectedTimeZone).format (`${selectedFormat.date} ${getTimeFormat()}`)}
      </p>
    </div>
  );
};

export default TimePicker;
