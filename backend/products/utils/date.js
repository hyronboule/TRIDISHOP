// function for formatting dates
const formatDate = (date) => {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); 
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

//  date => DD/MM/YYYY
const defaultDate = () => {
  return formatDate(new Date());
};

module.exports =  { defaultDate };

