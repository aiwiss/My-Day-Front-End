 const getUIDate = dateString => {

  // TODO: refactor and add support for 'hours ago'
  const months = [
    'Januar',
    'Februar',
    'Mars',
    'April',
    'Mai',
    'Juni',     
    'Juli',     
    'August',   
    'September',
    'Oktober',  
    'November', 
    'Desember'
  ];

  const dt = new Date();
  const currentYear = dt.getFullYear();
  const currentMonth = dt.getMonth();
  const currentDay = dt.getDate();
  const currentMinutes = dt.getMinutes();

  const date = new Date(dateString);
  const isValidDate = dt instanceof Date && !isNaN(date);
  if (!isValidDate) return '';

  const hours = date.getHours();
  const minutes = date.getMinutes();
  
  const year = date.getFullYear();
  const month = date.getMonth();
  const monthString = months[currentMonth];
  const day = date.getDate();

  const sameYear = currentYear === year;
  const sameMonth = sameYear && currentMonth === month;
  const sameDay = sameYear && sameMonth && currentDay === day;
  const yesterday = sameDay && currentDay - day === 1;
  const minDiff = Math.abs(currentMinutes - minutes);
  const lessThanTwentyMinutesAgo = minDiff < 20;

  let dateShortcut = '';
  
  if (sameDay) {
    if (lessThanTwentyMinutesAgo && minDiff > 1) dateShortcut = `${minDiff} minutter siden`;
    else if (minDiff === 0) dateShortcut = 'Akkurat nå'
    else dateShortcut = `${minDiff} minutt siden`;
  }
  
  if (sameDay && lessThanTwentyMinutesAgo) return dateShortcut;

  const twoDigitMinutes = minutes < 10 ? '0'+minutes : minutes;
  const uiTime = `${hours}:${twoDigitMinutes}`;

  let uiDate = '';
  if (sameDay) uiDate = 'I dag';
  else if (yesterday) uiDate = 'I går';
  else if (sameYear) uiDate = `${monthString} ${day}`;
  else uiDate = `${monthString} ${day} ${year}`;
  
  const uiFullDate = `${uiDate} på ${uiTime}`;

  return uiFullDate;
}

export default getUIDate;