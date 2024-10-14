const express = require('express');
const fs = require('fs');
const app = express();

app.use(express.json());

// API to serve the current links from var.js
app.get('/links', (req, res) => {
    const links = require('./data.json'); // You will store links in this file
    res.json(links);
});

// API to update the links in var.js via admin panel
app.post('/update-links', (req, res) => {
    const updatedLinks = req.body;

    // Save the updated links to data.json
    fs.writeFileSync('data.json', JSON.stringify(updatedLinks, null, 2));

    // Update the var.js file
    const varJsContent = `
       // 2025
       var BS2025 = "${updatedLinks.BS2025}";
       var econ2025 = "${updatedLinks.econ2025}";
       var acc2025 = "${updatedLinks.acc2025}";

       // 2026
       var BS2026 = "${updatedLinks.BS2026}";
       var econ2026 = "${updatedLinks.econ2026}";
       var acc2026 = "${updatedLinks.acc2026}";
    `;

    // Write updated links to var.js
    fs.writeFileSync('public/var.js', varJsContent);
    res.send({ message: 'Links updated successfully' });
});

// Run the server
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});