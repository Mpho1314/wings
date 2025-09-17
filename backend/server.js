const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5001; // dynamic port for Render

app.use(cors());
app.use(bodyParser.json());

// Safe read/write helpers with absolute paths
const readData = (file) => {
  try {
    const dataPath = path.join(__dirname, file);
    const data = fs.readFileSync(dataPath, 'utf8');
    return data ? JSON.parse(data) : [];
  } catch (err) {
    console.error(`Error reading ${file}:`, err);
    return [];
  }
};

const writeData = (file, data) => {
  try {
    const dataPath = path.join(__dirname, file);
    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
  } catch (err) {
    console.error(`Error writing ${file}:`, err);
  }
};

// ---------------- Products ----------------
app.get('/products', (req, res) => {
  res.json(readData('products.json'));
});

app.post('/products', (req, res) => {
  try {
    const products = readData('products.json');
    const newProduct = { id: Date.now(), ...req.body };
    products.push(newProduct);
    writeData('products.json', products);
    res.json({ success: true, product: newProduct });
  } catch (err) {
    console.error('Error in POST /products:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

app.put('/products/:id', (req, res) => {
  try {
    let products = readData('products.json');
    products = products.map(p => p.id == req.params.id ? { ...p, ...req.body } : p);
    writeData('products.json', products);
    res.json({ success: true });
  } catch (err) {
    console.error('Error in PUT /products:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

app.delete('/products/:id', (req, res) => {
  try {
    let products = readData('products.json');
    products = products.filter(p => p.id != req.params.id);
    writeData('products.json', products);
    res.json({ success: true });
  } catch (err) {
    console.error('Error in DELETE /products:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// ---------------- Transactions ----------------
app.get('/transactions', (req, res) => {
  res.json(readData('transactions.json'));
});

app.post('/transactions', (req, res) => {
  try {
    const transactions = readData('transactions.json');
    const transaction = { id: Date.now(), ...req.body, date: new Date() };
    transactions.push(transaction);
    writeData('transactions.json', transactions);

    // Update stock
    const products = readData('products.json');
    const updatedProducts = products.map(p => {
      if (p.id == transaction.productId) {
        const newStock = transaction.type === 'in'
          ? p.stock + transaction.quantity
          : p.stock - transaction.quantity;
        return { ...p, stock: newStock };
      }
      return p;
    });
    writeData('products.json', updatedProducts);

    res.json({ success: true });
  } catch (err) {
    console.error('Error in POST /transactions:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
