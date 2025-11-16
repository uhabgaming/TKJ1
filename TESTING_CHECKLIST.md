## ✅ TESTING CHECKLIST - GOYAL GAYIL SNACK

### Fitur-Fitur yang Perlu Ditest:

#### Navigation & Layout

- [ ] Navbar muncul dengan logo dan menu (Produk, Kontak, Keranjang)
- [ ] Cart badge menunjukkan jumlah item (awalnya 0)
- [ ] Navbar sticky saat scroll
- [ ] Mobile menu toggle berfungsi
- [ ] Warna navbar gradient (merah ke merah muda)

#### Promo Banner

- [ ] Banner promo muncul di bawah navbar dengan pesan
- [ ] Background merah dengan text putih bold

#### Hero Section

- [ ] Hero section muncul dengan background gradient orange
- [ ] Gambar snack muncul di sebelah kanan
- [ ] Tombol "Belanja Sekarang" dan "Hubungi Kami" visible
- [ ] Animasi fade in saat page load
- [ ] Responsive di mobile (single column)

#### Search & Filter

- [ ] Input search placeholder "Cari snack favorit Anda..."
- [ ] Category filter dropdown dengan 4 opsi
- [ ] Search real-time filtering produk
- [ ] Category filter bekerja dengan benar
- [ ] Kombinasi search + filter bekerja

#### Product Listing

- [ ] Semua 8 produk muncul dalam grid
- [ ] Setiap produk punya gambar, emoji, rating
- [ ] Card hover effect (scale up, shadow)
- [ ] Rating menampilkan bintang (⭐)
- [ ] Price terformat dengan Rp
- [ ] Input quantity default 1
- [ ] Button "Tambah" berwarna gradient merah
- [ ] Background section light gray

#### Add to Cart

- [ ] Klik "Tambah" menambah ke keranjang
- [ ] Alert success "ditambahkan ke keranjang"
- [ ] Cart badge update dengan jumlah
- [ ] Quantity input reset ke 1
- [ ] Jika sudah ada di cart, quantity bertambah

#### Shopping Cart (Offcanvas)

- [ ] Click icon keranjang di navbar buka side panel
- [ ] Panel berwarna light gray dengan header merah
- [ ] List cart items menampilkan produk yang ada
- [ ] Setiap item punya tombol +/- untuk qty
- [ ] Tombol delete berfungsi
- [ ] Tampilkan Subtotal dan Total
- [ ] Total terhitung dengan benar
- [ ] Tombol checkout hijau (WhatsApp)
- [ ] Tombol "Hapus Semua" merah

#### Checkout to WhatsApp

- [ ] Klik tombol checkout (disabled jika cart kosong)
- [ ] Alert "Membuka WhatsApp..."
- [ ] Window baru terbuka menuju WhatsApp
- [ ] Pesan muncul dengan format:
  - Nama produk
  - Jumlah & harga
  - Subtotal setiap item
  - Total harga
  - Ucapan terima kasih
- [ ] Alert success "Pesanan Terkirim!"
- [ ] Cart kosong setelah checkout
- [ ] Offcanvas tertutup setelah checkout

#### Filter & Search "Not Found"

- [ ] Search produk yang tidak ada → "Produk tidak ditemukan"
- [ ] Filter kategori yang kosong → alert info
- [ ] Reset filter/search → produk kembali

#### Responsive Design

- [ ] Desktop (1200px+): 4 kolom produk
- [ ] Tablet (768px-1199px): 2-3 kolom produk
- [ ] Mobile (< 768px): 1-2 kolom produk
- [ ] Hero section stack di mobile
- [ ] Search/Filter responsive
- [ ] Footer responsive

#### Colors & Styling

- [ ] Navbar: gradient merah (#ff6b6b → #ff5252)
- [ ] Hero: gradient orange (#ff9800 → #ffb74d)
- [ ] Button add: gradient merah
- [ ] Button checkout: hijau WhatsApp (#25D366 atau bootstrap success)
- [ ] Footer: gradient merah
- [ ] Text readable dengan contrast baik

#### Animations & Effects

- [ ] Product card hover: scale up + shadow
- [ ] Cart badge: pulse animation
- [ ] Fade in animation saat product load
- [ ] Button hover smooth transition
- [ ] Loading spinner saat checkout

#### Footer

- [ ] 3 kolom footer visible
- [ ] Link WhatsApp clickable
- [ ] Social media icons visible
- [ ] Jam operasional terlihat
- [ ] Copyright text ada

#### Error Handling

- [ ] Tidak ada console error
- [ ] Input negative quantity alert warning
- [ ] Empty cart checkout alert warning
- [ ] All buttons responsive & clickable

---

### Test Environment:

- Browser: Chrome/Edge/Firefox
- Mobile: Safari iOS / Chrome Android
- Resolution: 1920x1080 (Desktop), 768x1024 (Tablet), 375x667 (Mobile)

### Known Issues (Jika Ada):

- N/A (All good!)

### Next Steps:

1. Test semua fitur di checklist
2. Uji di berbagai browser
3. Uji responsiveness di mobile device
4. Sesuaikan warna/gambar sesuai brand
5. Deploy ke hosting

---

**Date**: November 16, 2025
**Status**: Ready for Testing ✅
