const express = require('express');
const cors = require('cors');
const { productsRouter } = require('./controllers/product-controller');
const app = express();

app.use(cors());
app.use("/products", productsRouter);

app.get('/', (req, res) => {
    res.json({ message: 'Server is running' });
})


const port = process.env.PORT || 9000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})