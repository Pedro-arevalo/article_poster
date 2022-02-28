const express = require('express');
const path = require('path');
const routes_api = require('./routes/api');
const PORT = 5000;
const app = express();

app.use('/api', routes_api);
app.use(express.static(path.join(__dirname, 'public_html')));
app.listen(PORT, (error) => {
    if (error) {
        console.log(error);
    } else {
        console.log(`Server successfully running on port ${PORT}`);
    }
});
