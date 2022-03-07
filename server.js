const express = require('express');

const app = new express();
app.get('/', (req, res) => {
    res.send('Hello');
})
app.listen(process.env.PORT || 5000, () => {
    console.log('App ready')
});