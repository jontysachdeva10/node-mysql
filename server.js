const express = require('express');
const app = express();
const userRoutes = require('./routes/user');
const productRoutes = require('./routes/product');
const orderRoutes = require('./routes/order');

app.use(express.json());

app.use('/register', userRoutes);
app.use('/product', productRoutes);
app.use('/order', orderRoutes);

app.listen(3000, () => {
    console.log('Server is running on port 3000..');   
});
