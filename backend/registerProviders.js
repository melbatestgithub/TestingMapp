const axios = require('axios');

const providers = [
    { id: '1', type: 'electrician', location: { lat: 51.505, lng: -0.09 } },
    { id: '2', type: 'plumber', location: { lat: 51.51, lng: -0.1 } },
    { id: '3', type: 'carpenter', location: { lat: 51.515, lng: -0.11 } },
    // Add more providers as needed
];

providers.forEach(provider => {
    axios.post('http://localhost:4000/register', provider)
        .then(() => console.log(`Registered provider ${provider.id}`))
        .catch(err => console.error(err));
});
