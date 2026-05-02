# Rangkuman Proyek & Kredensial Rumah Bintaro

Gunakan dokumen ini sebagai **konteks** saat Anda membuka percakapan (chat) baru dengan saya, agar saya (atau AI lain) bisa langsung memahami status proyek dan kredensial yang dibutuhkan tanpa harus bertanya lagi.

---

## 1. Kredensial & Informasi Akses

**Akses VPS (Production)**
- **IP Address**: `103.126.116.103`
- **Username**: `Steven1`
- **SSH Key**: Menggunakan file `Halim1234.pem` (sudah ada di folder proyek Anda)
- **Command Masuk VPS**: `ssh -i Halim1234.pem Steven1@103.126.116.103`
- **Direktori Proyek di VPS**: `~/rumahbintaro`
- **Command Update (Deploy)**: `cd ~/rumahbintaro && git pull origin master && npm run build && pm2 restart 0`

**Kredensial Email (SMTP & Lead)**
- **Email Pengirim & Penerima**: `bintarojayarumah@gmail.com`
- **App Password (Sandi Aplikasi)**: `tnmn crls tyzv king`
- **SMTP Host**: `smtp.gmail.com` (Port 587)

**Kredensial Aplikasi (CMS Admin)**
- **Password Admin**: `admin123` (Disimpan di `.env` lokal & VPS sebagai `ADMIN_PASSWORD`)

**Google Analytics**
- **Measurement ID (GA4)**: `G-1RT80SWT4V` (Disimpan sebagai `NEXT_PUBLIC_GA_ID`)

---

## 2. Rangkuman Pekerjaan yang Sudah Diselesaikan

Berikut adalah fitur dan perbaikan yang telah kita selesaikan di sesi ini:

1. **Infrastruktur & Stabilitas**:
   - Memperbaiki `dev.db` yang terhapus saat _git pull_ dengan memulihkannya dari _history_ dan memasukannya ke dalam `.gitignore`.
   - Mengatasi Error 500 (Internal Server Error) dan Error 502 (Bad Gateway) di VPS terkait pembacaan _headers()_ domain.
   - Mengatur Nginx di VPS untuk membaca file statis (gambar) dari folder `/uploads/`.

2. **Pengembangan Fitur Admin (CMS)**:
   - Menambahkan fitur **Auto-Slug**: Setiap kali Anda mengetik nama properti/kavling baru, sistem otomatis membuat versi link-nya (slug) yang aman dan tanpa spasi (mengatasi Error 404).
   - Menyederhanakan form "Fasilitas" dan "Tipe Unit" dengan menghilangkan fitur upload gambar yang tidak perlu.
   - **Fitur Baru**: Mengubah halaman "Tambah Cluster Baru" menjadi *2-kolom layout*, sehingga Anda bisa langsung memasukkan dan menyimpan *Tipe-tipe Unit* secara bersamaan saat mendaftarkan cluster baru.

3. **Perbaikan Tampilan Publik (Frontend)**:
   - Memasang pelacakan **Google Analytics 4** di seluruh halaman website.
   - Mengganti Favicon website (ikon di tab browser) menjadi logo Bintaro Jaya.
   - Memperbarui nomor WhatsApp dan Email di komponen Footer.
   - **Redesign Promo Terbaru**: Mengubah tampilan komponen promo (`CtaFormPromo`) menjadi bentuk galeri 4 kolom, menambahkan fitur *slider* horizontal khusus di tampilan mobile, serta merapikan dan menambahkan efek *glow* mewah pada formulir Pendaftaran Digital.

4. **Perbaikan Formulir**:
   - Memperbaiki pengiriman email pada form Promo dengan memasukkan kredensial SMTP yang benar ke dalam lingkungan VPS.

---

**Saran saat memulai percakapan baru:**
Cukup *copy-paste* seluruh teks di dokumen ini pada chat pertama Anda nanti, atau gunakan kalimat seperti:
> *"Lanjutkan proyek Rumah Bintaro, berikut detail konfigurasi dan status terakhirnya: [paste semua isi dokumen ini]"*
