Siap! Berikut **tutor lengkap cara kolaborasi dengan Git & GitHub** yang bisa kamu tempel di file `README.md` untuk tim kamu 👇

---

## 👥 Git Collaboration Workflow

Panduan ini digunakan untuk berkolaborasi dalam satu repository GitHub, agar kerja tim lebih teratur dan tidak konflik.

---

### ⚙️ 1. Clone Repository (hanya sekali di awal)

```bash
git clone https://github.com/username-nama/repo.git
cd nama-repo
```

---

### 🌱 2. Buat Branch Baru

Setiap fitur/tugas dibuat di branch sendiri agar tidak mengganggu pekerjaan orang lain.

```bash
git checkout -b nama-branch
# atau
git switch -c nama-branch
```

> Contoh: `git checkout -b fitur-login`

---

### 💻 3. Kerja & Simpan Perubahan

Setelah coding, simpan perubahanmu:

```bash
git add .
git commit -m "Deskripsi perubahan"
```

---

### ⬆️ 4. Push Branch ke GitHub

```bash
git push -u origin nama-branch
```

> Contoh: `git push -u origin fitur-login`

---

### 🔁 5. Merge Branch ke `main` via Pull Request (PR)

1. Buka GitHub repo
2. Akan muncul tombol: **“Compare & pull request”** → klik
3. Tambahkan deskripsi → klik **“Create pull request”**
4. Reviewer lain bisa cek dan klik **“Merge pull request”**

---

### 🔃 6. Sinkronkan Branch Lokal

Sebelum mulai kerja, selalu sync dengan branch utama (`main`):

```bash
git checkout main
git pull origin main
```

Jika ingin update branch-mu dengan `main` (agar tetap up-to-date):

```bash
git checkout nama-branch
git merge main
```

---

### ❌ 7. Hapus Branch (Opsional)

Setelah merge, hapus branch lama:

- **Lokal**:
  ```bash
  git branch -d nama-branch
  ```
- **Remote**:
  ```bash
  git push origin --delete nama-branch.
  ```

---

### ⚠️ Tips Hindari Konflik:

- Selalu **pull dulu sebelum kerja**
- Jangan kerja langsung di `main`
- Commit dengan pesan jelas
- Komunikasikan perubahan besar dengan tim

---

> 📌 Jangan lupa install dependency project setelah clone:  
```bash
npm install
# atau
yarn install
```

---

 `backend/` dan `frontend/`  setup masing-masing folder.
