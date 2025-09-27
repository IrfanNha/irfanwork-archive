# 🔍 Fitur Search - Panduan Lengkap

## 🎯 **Fitur yang Tersedia**

### **1. Universal Search**
- **Blog Posts** - Mencari artikel berdasarkan judul, excerpt, dan konten
- **Projects** - Mencari proyek berdasarkan nama, deskripsi, dan teknologi
- **Pages** - Mencari halaman seperti Home, About, Projects, Blog

### **2. Search Modal**
- **Modern UI** - Modal yang elegan dengan animasi smooth
- **Real-time Search** - Hasil muncul saat mengetik (debounced 300ms)
- **Keyboard Navigation** - Navigasi dengan keyboard
- **Loading States** - Indikator loading saat mencari

### **3. Keyboard Shortcuts**
- **⌘K / Ctrl+K** - Buka/tutup search modal
- **Escape** - Tutup search modal
- **Enter** - Pilih hasil pertama

## 🚀 **Cara Menggunakan**

### **Membuka Search**
1. **Klik tombol search** di header (ikon 🔍)
2. **Tekan ⌘K** (Mac) atau **Ctrl+K** (Windows/Linux)
3. **Hover tombol search** untuk melihat shortcut

### **Mencari Konten**
1. **Ketik kata kunci** di search box
2. **Lihat hasil real-time** yang muncul
3. **Klik hasil** untuk membuka halaman
4. **Tekan Escape** untuk menutup

## 🎨 **UI/UX Features**

### **Search Results**
- **Icons** - Setiap tipe konten punya icon berbeda
- **Badges** - Label tipe konten (blog, project, page)
- **Categories** - Menampilkan kategori untuk blog posts
- **Descriptions** - Preview konten yang relevan

### **Visual Feedback**
- **Loading spinner** saat mencari
- **Empty state** jika tidak ada hasil
- **Hover effects** pada hasil
- **Smooth animations** untuk semua transisi

## 🔧 **Technical Implementation**

### **Search API** (`/api/search`)
```typescript
// Endpoint: GET /api/search?q=query
// Mencari di:
// - Blog posts (Strapi)
// - Projects (constants)
// - Pages (hardcoded)
```

### **Search Context**
```typescript
// State management untuk search
const {
  isSearchOpen,
  searchQuery,
  searchResults,
  isLoading,
  openSearch,
  closeSearch,
  performSearch
} = useSearch()
```

### **Debounced Search**
- **300ms delay** untuk menghindari terlalu banyak request
- **Automatic search** saat user berhenti mengetik
- **Loading states** yang responsif

## 📊 **Search Results Structure**

```typescript
interface SearchResult {
  id: string
  title: string
  description: string
  url: string
  type: 'blog' | 'project' | 'page'
  category?: string
  publishedAt?: string
}
```

## 🎯 **Best Practices**

### **Performance**
- ✅ Debounced search (300ms)
- ✅ Limited results (max 10)
- ✅ Cached API responses
- ✅ Lazy loading

### **User Experience**
- ✅ Keyboard shortcuts
- ✅ Visual feedback
- ✅ Clear empty states
- ✅ Responsive design

### **Accessibility**
- ✅ Keyboard navigation
- ✅ Screen reader friendly
- ✅ Focus management
- ✅ ARIA labels

## 🔍 **Search Examples**

### **Blog Posts**
- "react" → Artikel tentang React
- "tutorial" → Tutorial articles
- "javascript" → JS-related posts

### **Projects**
- "portfolio" → Portfolio website
- "quran" → Quran app
- "nextjs" → Next.js projects

### **Pages**
- "home" → Homepage
- "about" → About page
- "contact" → Contact info

## 🚀 **Future Enhancements**

- [ ] **Search history** - Riwayat pencarian
- [ ] **Popular searches** - Pencarian populer
- [ ] **Search filters** - Filter berdasarkan tipe
- [ ] **Advanced search** - Pencarian lanjutan
- [ ] **Search analytics** - Analitik pencarian

## 🎉 **Ready to Use!**

Fitur search sudah siap digunakan dengan:
- ✅ Modern UI/UX
- ✅ Keyboard shortcuts
- ✅ Real-time search
- ✅ Multi-content search
- ✅ Responsive design
- ✅ Performance optimized
