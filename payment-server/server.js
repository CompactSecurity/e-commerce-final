const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

// Configure dotenv with the specific path
dotenv.config({ path: path.join(__dirname, '.env') });

const paymentRoutes = require('./routes/payment');

const app = express();

const allowedOrigins = [
    'http://localhost:3000',
    'http://192.168.18.29:3000'
];

app.use(cors({
    origin: function(origin, callback) {
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST'],
    credentials: true
}));

app.use(express.json());
app.use('/api', paymentRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`El servidor de pago esta corriendo en el puerto ${PORT}`);
});