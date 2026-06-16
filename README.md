# 🛒 Grocery Shop Manager

A simple, lightweight grocery shop management web app built with pure HTML, CSS, and JavaScript. No frameworks, no backend, no database setup required.

---

## 📸 Features

- ✅ Add products with name, price, and stock quantity
- ✅ View all products in a clean table
- ✅ Delete products
- ✅ Create bills by selecting products and quantity
- ✅ Auto stock reduction after a confirmed sale
- ✅ Total sales count and revenue tracker
- ✅ Data persists using browser LocalStorage (survives page refresh)

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| HTML | Page structure and layout |
| CSS | Styling and visual design |
| JavaScript | App logic and interactivity |
| LocalStorage | In-browser data persistence |

No Node.js. No database. No internet required after opening the file.

---

## 📁 Project Structure

```
grocery-shop/
├── index.html     # Main page structure
├── style.css      # All styling
├── app.js         # All JavaScript logic
└── README.md      # This file
```

---

## 🚀 How to Run

1. Clone or download this repository
2. Open the `grocery-shop` folder
3. Double-click `index.html`
4. Opens directly in your browser — no setup needed

```bash
# Or clone via git
git clone https://github.com/YOUR_USERNAME/grocery-shop.git
cd grocery-shop
# Open index.html in browser
```

---

## 📖 How to Use

### Add a Product
1. Enter product name, price, and stock quantity
2. Click **Add**
3. Product appears in the table below

### Create a Bill
1. Select a product from the dropdown
2. Enter quantity
3. Click **Add to Bill**
4. Repeat for multiple products
5. Click **Confirm Sale**
6. Stock automatically reduces

### View Sales
- Bottom section shows total number of sales and total revenue earned

---

## 💾 Data Storage

All data is saved in your browser's **LocalStorage**.

- Data survives page refresh and browser close
- Data is stored only on your device (not on any server)
- To reset all data, run this in browser console (F12):
```javascript
localStorage.clear();
```

---

## 🧠 What I Learned Building This

- HTML structure and semantic tags
- CSS layout with Flexbox
- JavaScript DOM manipulation
- Event handling (onclick, onchange)
- LocalStorage for data persistence
- CRUD operations (Create, Read, Update, Delete)

---

## 🔮 Future Improvements (Planned)

- [ ] Node.js + Express backend
- [ ] MongoDB database integration
- [ ] User authentication
- [ ] Print bill as PDF
- [ ] Deploy online

---

## 👤 Author

**Toru**
Built as a beginner web development learning project.

---

## 📄 License

This project is open source and free to use.
