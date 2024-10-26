const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const { PythonShell } = require('python-shell');
const axios = require('axios');

// Get recommendations based on user ID
router.get('/recommendations', async (req, res) => {
    const userId = req.params.userId; // Get user ID from the route parameter

    try {
        // Fetch user order information from the backend
        const userOrderInfo = await axios.get(`http://localhost:5000/api/users/${userId}/order`); // Replace with your backend URL
        const orderData = userOrderInfo.data;

        // Check if order data is valid
        if (!orderData || !orderData.items || orderData.items.length === 0) {
            return res.status(404).json({ message: 'No order information found for this user.' });
        }

        // Prepare the user ID for the Python script
        const userIdForPython = orderData.user;

        // Call the Python script to get product recommendations
        let pyshell = new PythonShell('./main.py');
        pyshell.send(userIdForPython);

        pyshell.on('message', (message) => {
            try {
                const recommendations = JSON.parse(message);

                // Check for any errors in the recommendations
                if (recommendations.error) {
                    return res.status(500).json({ message: recommendations.error });
                }

                // Send recommendations back to the client
                return res.status(200).json({
                    message: 'Product recommendations retrieved successfully',
                    recommendations: recommendations.recommended_products || [] // Return the recommended products
                });
            } catch (err) {
                return res.status(500).json({ message: 'Failed to parse recommendations', error: err.message });
            }
        });

        // Handle errors in executing the Python script
        pyshell.end((err) => {
            if (err) {
                return res.status(500).json({ message: 'Error executing Python script', error: err.message });
            }
        });
    } catch (error) {
        return res.status(500).json({ message: 'Error fetching user order information', error: error.message });
    }
});


// Sample endpoint to fetch random products (if needed)
router.get('/', async (req, res) => {
    try {
        // For this example, we're just returning random products
        const recommendations = await Product.aggregate([{ $sample: { size: 4 } }]);
        res.json(recommendations);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;