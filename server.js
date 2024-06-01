const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(express.static('public'));

app.post('/chat', async (req, res) => {
    try {
        const response = await axios.post('http://localhost:1234/v1/chat/completions', {
            model: 'Meta-Llama-3-8B-Instruct-imatrix',
            messages: req.body.messages,
        });
        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error communicating with LM Studio');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
