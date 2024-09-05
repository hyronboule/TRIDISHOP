// Fonction pour formater la date au format DD/MM/YYYY
const formatDate = (date) => {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Mois est basé sur 0
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

// Fonction pour obtenir la date actuelle au format DD/MM/YYYY
const defaultDate = () => {
  return formatDate(new Date());
};

module.exports =  { defaultDate };

