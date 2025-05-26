const express = require('express');
const router = express.Router();
const { MercadoPagoConfig, Preference } = require('mercadopago');
const dotenv = require('dotenv');
const path = require('path');

// Configure dotenv again in this file
dotenv.config({ path: path.join(__dirname, '..', '.env') });


const client = new MercadoPagoConfig({ 
    accessToken: process.env.MERCADO_PAGO_ACCESS_TOKEN
});

router.post('/create-preference', async (req, res) => {
    try {
        const { cartItems } = req.body;
        
        if (!cartItems || cartItems.length === 0) {
            return res.status(400).json({ error: 'Cart items are required' });
        }

        const items = cartItems.map(item => ({
            id: item.id_producto.toString(),
            title: item.nombre,
            unit_price: Number(item.precio),
            quantity: Number(item.cantidad),
            currency_id: "PEN",
            description: `Producto: ${item.nombre}`
        }));

        const preferenceData = {
            body: {
                items,
                back_urls: {
                    success: "https://www.google.com",
                    failure: "https://www.google.com",
                    pending: "https://www.google.com"
                },
                
                auto_return: "approved",
                notification_url: "http://localhost:3000/api/notifications",
                statement_descriptor: "Compact Seguridad | Tienda",
                external_reference: Date.now().toString()
            }
        };

        console.log('Attempting to create preference with data:', JSON.stringify(preferenceData, null, 2));

        const preference = new Preference(client);
        let response;
        try {
            response = await preference.create(preferenceData);
            console.log('Mercado Pago Response:', JSON.stringify(response, null, 2));
        } catch (mpError) {
            console.error('Mercado Pago Error:', {
                message: mpError.message,
                name: mpError.name,
                stack: mpError.stack,
                cause: mpError.cause,
                status: mpError.status,
                idempotencyKey: mpError.idempotencyKey,
                requestId: mpError.requestId
            });
            throw mpError;
        }

        if (!response || !response.id) {
            console.error('Invalid response from Mercado Pago:', response);
            throw new Error('No preference ID received from Mercado Pago');
        }

        console.log('Preference created successfully with ID:', response.id);

        res.json({ 
            preferenceId: response.id,
            message: 'Preference created successfully'
        });
    } catch (error) {
        console.error('Detailed error information:', {
            name: error.name,
            message: error.message,
            stack: error.stack,
            cause: error.cause,
            response: error.response?.data,
            status: error.status,
            raw: error
        });
        
        res.status(500).json({ 
            error: 'Error creating preference',
            details: error.message,
            name: error.name,
            cause: error.cause,
            status: error.status
        });
    }
});

module.exports = router;