import axios from 'axios';


const headers = {
  'Authorization': 'Bearer CHASECK_TEST-kdLyaIRGQkug9UjBlIvBFjgoDnja2vIl',
};

try {
  const response = axios.get(`https://api.chapa.co/v1/transaction/verify/txrkefgf`,  { headers });
  
  console.log(response);

} catch (error) {
  console.error('Error:', error.response);

}


//txrkefgf


// import axios from 'axios';

// const headers = {
//   'Authorization': 'Bearer CHASECK_TEST-kdLyaIRGQkug9UjBlIvBFjgoDnja2vIl',
//   'Content-Type': 'application/json',
// };

// const data = {
//   "amount": "100",
//   "currency": "ETB",
//   "email": "abebech_bekele@gmail.com",
//   "first_name": "Bilen",
//   "last_name": "Gizachew",
//   "phone_number": "0912345678",
//   "tx_ref": "chewatatest-6669",
//   "callback_url": "https://webhook.site/077164d6-29cb-40df-ba29-8a00e59a7e60",
//   "return_url": "https://www.google.com/",
//   "customization": {
//     "title": "Payment for",
//     "description": "I love online payments",
//   }
// };

// axios.post("https://api.chapa.co/v1/transaction/initialize", data, { headers })
//   .then(response => {
//     console.log(response.data);
//   })
//   .catch(error => {
//     console.error('Error:', error.response.data);
//   });

