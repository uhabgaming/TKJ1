## 🎨 PANDUAN CUSTOMIZATION - GOYAL GAYIL SNACK

### Cara Mengubah & Customize Website

---

## 1. 📞 MENGUBAH NOMOR WHATSAPP

### Lokasi 1: Script.js (Line 18)

```javascript
const WHATSAPP_NUMBER = "6285808778641"; // Ganti ini dengan nomor Anda
```

**Format**: 62 + nomor tanpa 0

- Contoh: 0858-0877-8641 → 6285808778641

### Lokasi 2: Footer (HTML - Line 203)

```html
<a
  href="https://wa.me/6285808778641"
  class="text-white text-decoration-none"
></a>
```

Ganti nomor dalam `wa.me/` URL

---

## 2. 🎨 MENGUBAH WARNA

### File: style.css (Line 1-7)

```css
:root {
  --primary-color: #ff6b6b; /* Warna merah utama */
  --secondary-color: #ff9800; /* Warna orange */
  --dark-color: #1a1a1a; /* Warna text gelap */
  --light-color: #f8f9fa; /* Warna background terang */
  --accent-color: #4ecdc4; /* Warna accent teal */
  --warning-color: #ffe66d; /* Warna warning kuning */
}
```

### Contoh Perubahan:

- Ubah `#ff6b6b` menjadi `#e91e63` untuk pink
- Ubah `#ff9800` menjadi `#2196f3` untuk biru
- Ubah `#4ecdc4` menjadi `#9c27b0` untuk ungu

---

## 3. 🖼️ MENGUBAH GAMBAR

### Gambar Hero Section

**File**: index.html (Line 82)

```html
<img
  src="https://via.placeholder.com/600x400/ff9800/ffffff?text=Snack+Premium+Goyal+Gayil"
  alt="Snack"
  class="img-fluid rounded-4 shadow-lg"
/>
```

Ganti URL dengan:

- **Placeholder dari URL lain**: `https://via.placeholder.com/600x400/[color]/ffffff?text=[teks]`
- **Gambar sendiri**: `img/snack-hero.jpg` (upload file ke folder img/)
- **Gambar online**: Direct link ke gambar di internet

### Gambar Produk

**File**: script.js (Product Array)

```javascript
{
  id: 1,
  image: "https://via.placeholder.com/300x200/ff6b6b/ffffff?text=Snack+Pedas",
  ...
}
```

Setiap produk punya `image` property. Ganti dengan URL gambar sendiri.

---

## 4. 📝 MENGUBAH TEXT & CONTENT

### Judul Website

**File**: index.html (Line 5)

```html
<title>Goyal Gayil Snack - Toko Online</title>
```

### Logo/Nama di Navbar

**File**: index.html (Line 27)

```html
<a class="navbar-brand fw-bold" href="#">
  <i class="fas fa-store"></i> Goyal Gayil Snack
</a>
```

### Hero Section Title

**File**: index.html (Line 76)

```html
<h1 class="display-3 fw-bold mb-3">🍟 Goyal Gayil Snack</h1>
```

### Promo Banner

**File**: index.html (Line 67)

```html
<p class="mb-0 fw-bold">
  <i class="fas fa-tag"></i> Spesial Bulan Ini: Beli 2 Gratis 1 untuk Kategori
  Tertentu!
</p>
```

### Footer Text

**File**: index.html (Line 194)

```html
<p>
  Menyediakan snack berkualitas dengan harga terjangkau untuk semua keluarga.
</p>
```

---

## 5. 🛍️ MENAMBAH/MENGUBAH PRODUK

**File**: script.js (Line 2-53)

```javascript
const products = [
  {
    id: 1,
    name: "Snack Pedas",
    price: 10000,
    category: "pedas",
    description: "Snack pedas yang gurih dan nikmat",
    emoji: "🌶️",
    image: "https://via.placeholder.com/...",
    rating: 4.8,
  },
  // ... tambah produk baru di sini
];
```

### Cara Menambah Produk:

1. Copy object produk terakhir
2. Ubah `id` dengan nomor baru
3. Ubah nama, harga, kategori, deskripsi
4. Ganti emoji dengan yang sesuai
5. Ganti image URL
6. Set rating 1-5

### Contoh Produk Baru:

```javascript
{
  id: 9,
  name: "Donut Cokelat",
  price: 14000,
  category: "manis",
  description: "Donut empuk dengan selai cokelat",
  emoji: "🍩",
  image: "https://via.placeholder.com/300x200/8b4513/ffffff?text=Donut+Cokelat",
  rating: 4.9,
}
```

---

## 6. 🎭 MENGUBAH KATEGORI FILTER

**File 1**: script.js - Update kategori di products array

```javascript
category: "baru"; // tambah kategori baru
```

**File 2**: index.html - Update dropdown filter (Line 114-119)

```html
<select class="form-select form-select-lg" id="categoryFilter">
  <option value="all">📦 Semua Kategori</option>
  <option value="pedas">🌶️ Pedas</option>
  <option value="manis">🍬 Manis</option>
  <option value="gurih">🍿 Gurih</option>
  <option value="baru">🆕 Kategori Baru</option>
</select>
```

---

## 7. 💰 MENGUBAH HARGA & DISKON

### Mengubah Harga Produk

**File**: script.js - Ubah `price` di setiap produk

```javascript
price: 10000; // Ubah dengan harga baru
```

### Mengubah Diskon (5%)

**File**: script.js (Line ~273)

```javascript
const discount = Math.floor(total * 0.05); // 5% discount
// Ubah 0.05 menjadi 0.10 untuk 10% diskon
```

---

## 8. 🔤 MENGUBAH FONT

**File**: style.css (Line 11)

```css
font-family: "Poppins", "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
```

### Font dari Google Fonts:

1. Buka https://fonts.google.com
2. Pilih font
3. Copy link import
4. Tambah di `<head>` index.html (sebelum style.css)
5. Ubah font-family di CSS

Contoh:

```html
<link
  href="https://fonts.googleapis.com/css2?family=Raleway:wght@400;700&display=swap"
  rel="stylesheet"
/>
```

```css
font-family: "Raleway", sans-serif;
```

---

## 9. 📱 MENGUBAH RESPONSIVE BREAKPOINT

**File**: style.css (Line ~380)

```css
@media (max-width: 768px) {
  /* Mobile styles */
}

@media (max-width: 480px) {
  /* Very small mobile */
}
```

Ubah nilai pixel sesuai kebutuhan.

---

## 10. ⭐ FITUR LANJUTAN

### Menambah Rating

**File**: script.js - Ubah `rating` di setiap produk (1-5)

```javascript
rating: 4.8; // Ubah ke rating yang diinginkan
```

### Menambah Alert/Toast

**File**: script.js (Line ~410)

```javascript
function showToast(message, type = "success") {
  // Implementasi toast notification
}
```

### Mengubah Loading Time

**File**: script.js (Line 351-358) - Ubah `setTimeout` value

```javascript
setTimeout(() => {
  // ubah 500 dengan nilai baru (dalam milliseconds)
}, 500);
```

---

## 📦 STRUKTUR FILE

```
Web Toko/
├── index.html          (HTML - Main structure)
├── style.css           (CSS - Styling)
├── script.js           (JavaScript - Functionality)
├── README.md           (Documentation)
├── TESTING_CHECKLIST.md (Testing guide)
└── CUSTOMIZATION.md    (This file)
```

---

## 🚀 TIPS IMPORTANT

1. **Backup file sebelum edit**: Copy file sebelum mengubah
2. **Test di browser**: Setelah edit, refresh browser (Ctrl+F5)
3. **Check console**: Buka DevTools (F12) untuk lihat errors
4. **Mobile testing**: Test di mobile setelah setiap perubahan
5. **Save files**: Save semua perubahan sebelum menutup file

---

## 🆘 TROUBLESHOOTING

### Gambar tidak muncul

- Check URL gambar benar
- Buka URL di browser baru untuk verify
- Gunakan HTTPS bukan HTTP

### Warna tidak berubah

- Clear browser cache (Ctrl+Shift+Delete)
- Refresh page (Ctrl+F5)
- Check CSS syntax

### Produk tidak muncul

- Check `id` di array tidak duplikat
- Check semua comma (,) di place yang benar
- Buka console (F12) untuk lihat error

### WhatsApp tidak buka

- Check nomor format benar (62...)
- Test di browser baru
- Pastikan WhatsApp terpasang di device

---

## 📞 SUPPORT

Untuk bantuan lebih lanjut, cek:

- Browser Console (F12) untuk error message
- README.md untuk dokumentasi
- TESTING_CHECKLIST.md untuk testing guide

---

**Last Updated**: November 16, 2025
**Version**: 2.0 (Enhanced)
