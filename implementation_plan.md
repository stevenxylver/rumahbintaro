# Implementation Plan - Finalizing Website Structure (Phase 1 & 2)

Rencana ini bertujuan untuk melengkapi kodingan website sesuai dengan strategi pemasaran Anda, yaitu menyediakan halaman informasi perusahaan dan sistem artikel (blog) untuk mendatangkan traffic gratis dari Google.

## User Review Required

> [!IMPORTANT]
> **Konten Tentang Kami**: Apakah ada teks khusus mengenai profil tim/perusahaan Anda? Jika tidak, saya akan menggunakan teks placeholder profesional yang bisa Anda ubah nanti.
>
> **Halaman Kontak**: Apakah ada alamat kantor fisik atau link Social Media (IG/FB) yang ingin ditampilkan selain WhatsApp dan Email?

## Proposed Changes

### 1. Data Layer (Sistem Blog)

#### [NEW] [blog.ts](file:///c:/Users/stevm/Downloads/deploybintarojaya/rumahbintaro/src/data/blog.ts)
Membuat file data pusat untuk mengelola artikel blog. Struktur datanya meliputi:
- `slug`: Untuk URL yang rapi (SEO Friendly)
- `title`: Judul artikel
- `date`: Tanggal posting
- `image`: Gambar cover artikel
- `content`: Konten artikel (mendukung teks panjang)

### 2. New Pages (Routing)

#### [NEW] [/about/page.tsx](file:///c:/Users/stevm/Downloads/deploybintarojaya/rumahbintaro/src/app/about/page.tsx)
Halaman "Tentang Kami" dengan desain Clean:
- Hero section dengan judul besar.
- Visi & Misi perusahaan.
- Mengapa memilih Rumah Bintaro?

#### [NEW] [/contact/page.tsx](file:///c:/Users/stevm/Downloads/deploybintarojaya/rumahbintaro/src/app/contact/page.tsx)
Halaman "Kontak":
- Informasi Hubungi Kami (WA/Email).
- Form kontak yang terintegrasi.
- Informasi jam operasional.

#### [NEW] [/blog/page.tsx](file:///c:/Users/stevm/Downloads/deploybintarojaya/rumahbintaro/src/app/blog/page.tsx)
Halaman Index Blog:
- Menampilkan daftar artikel dalam bentuk Card yang rapi.
- Preview judul dan tanggal.

#### [NEW] [/blog/[slug]/page.tsx](file:///c:/Users/stevm/Downloads/deploybintarojaya/rumahbintaro/src/app/blog/%5Bslug%5D/page.tsx)
Halaman Detail Artikel:
- Membaca artikel lengkap.
- **Dynamic Metadata**: Judul halaman akan otomatis berubah sesuai judul artikel (Sangat penting untuk SEO).

### 3. Navigation & SEO Update

#### [MODIFY] [Navbar.tsx](file:///c:/Users/stevm/Downloads/deploybintarojaya/rumahbintaro/src/components/Navbar.tsx) & [Footer.tsx](file:///c:/Users/stevm/Downloads/deploybintarojaya/rumahbintaro/src/components/Footer.tsx)
- Menambahkan link Navigasi ke: **Tentang Kami**, **Artikel**, dan **Kontak**.

#### [MODIFY] [sitemap.ts](file:///c:/Users/stevm/Downloads/deploybintarojaya/rumahbintaro/src/app/sitemap.ts)
- Mendaftarkan semua link blog baru ke dalam sitemap agar Google otomatis meng-index setiap artikel yang Anda buat.

## Verification Plan

### Automated Tests
- Menjalankan `npm run build` untuk memastikan tidak ada link atau tipe data yang rusak.
- Mengecek sitemap perumahanbintarojaya.com/sitemap.xml untuk memastikan link blog muncul di sana.

### Manual Verification
- Navigasi melalui menu Navbar untuk memastikan semua halaman baru terbuka dengan benar.
- Mengisi form di halaman kontak (jika ada) untuk verifikasi pengiriman.
