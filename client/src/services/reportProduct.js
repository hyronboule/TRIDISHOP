// import Swal from 'sweetalert2';

// // form for reporting a product
// export const reportForm = (nameFile) => {
//   Swal.fire({
//     // form template
//     title: 'Signaler une publication',
//     html: `
//       <p>Merci de décrire la raison pour laquelle vous signalez cette publication :</p>
//       <textarea id="description" class="swal2-textarea" placeholder="Entrez votre description ici"></textarea>
//     `,
//     focusConfirm: false, // Prevents autofocus on the confirm button when the modal opens
//     showCancelButton: true,  // Shows an additional cancel button
//     confirmButtonText: 'Envoyer', // Label for the confirm/submit button
//     cancelButtonText: 'Annuler', // Label for the cancel button

//     // return the description
//     preConfirm: () => {
//       const description = Swal.getPopup().querySelector('#description').value;
      
//       if (!description) {
//         Swal.showValidationMessage('La description est obligatoire');
//       }

//       return { description };
//     }
//   }).then((result) => {
//     if (result.isConfirmed) {
//       console.log('Données soumises :', result.value);
//       sendEmail(nameFile, result.value)
//     }
//   });
// };

// export default reportForm;


// const sendEmail = (nameFile, result) => {
//     const emailTridi = import.meta.env.VITE_EMAIL_SUPPORT

//     // send email
// }