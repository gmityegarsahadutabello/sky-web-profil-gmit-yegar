// API Client untuk frontend
// Gunakan di semua file HTML yang perlu komunikasi dengan backend

const getDefaultApiBaseUrl = () => {
  const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
  return isLocalhost
    ? 'http://localhost:5000/api'
    : 'https://web-profil-gmit-yegar-api.vercel.app/api';
};

class APIClient {
  constructor(baseUrl = getDefaultApiBaseUrl()) {
    this.baseUrl = baseUrl;
    this.token = localStorage.getItem('adminToken') || null;
  }

  // Set token setelah login
  setToken(token) {
    this.token = token;
    localStorage.setItem('adminToken', token);
  }

  // Hapus token (logout)
  clearToken() {
    this.token = null;
    localStorage.removeItem('adminToken');
  }

  // Helper untuk fetch dengan error handling
  async _fetch(url, options = {}) {
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers
    };

    // Tambah authorization header jika ada token
    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    const response = await fetch(url, {
      ...options,
      headers
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: response.statusText }));
      throw new Error(error.error || `HTTP ${response.status}`);
    }

    return response.json();
  }

  // ===== PASTORS ENDPOINTS =====

  // GET semua pastor (public)
  async getPastors() {
    return this._fetch(`${this.baseUrl}/pastors`);
  }

  // GET pastor by ID
  async getPastorById(id) {
    return this._fetch(`${this.baseUrl}/pastors/${id}`);
  }

  // CREATE pastor baru (admin)
  async createPastor(name, period, image_url = '') {
    return this._fetch(`${this.baseUrl}/pastors`, {
      method: 'POST',
      body: JSON.stringify({ name, period, image_url })
    });
  }

  // UPDATE pastor (admin)
  async updatePastor(id, { name, period, image_url, order }) {
    return this._fetch(`${this.baseUrl}/pastors/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ name, period, image_url, order })
    });
  }

  // DELETE pastor (admin)
  async deletePastor(id) {
    return this._fetch(`${this.baseUrl}/pastors/${id}`, {
      method: 'DELETE'
    });
  }

  // UPLOAD gambar ke S3
  async uploadImage(file) {
    const formData = new FormData();
    formData.append('image', file);

    const response = await fetch(`${this.baseUrl}/pastors/upload`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.token}`
      },
      body: formData
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Upload gagal');
    }

    return response.json();
  }

  // REORDER pastors
  async reorderPastors(pastorIds) {
    return this._fetch(`${this.baseUrl}/pastors/reorder`, {
      method: 'POST',
      body: JSON.stringify({ pastorIds })
    });
  }

  // ===== AUTH ENDPOINTS =====

  // LOGIN
  async login(username, password) {
    const result = await this._fetch(`${this.baseUrl.replace('/api', '')}/api/auth/login`, {
      method: 'POST',
      body: JSON.stringify({ username, password })
    });
    if (result.token) {
      this.setToken(result.token);
    }
    return result;
  }

  // Check if logged in
  isLoggedIn() {
    return !!this.token;
  }

  // ===== ANNOUNCEMENTS ENDPOINTS =====

  // GET pengumuman publik (hanya yang aktif)
  async getPublicAnnouncements() {
    return this._fetch(`${this.baseUrl}/announcements/public`);
  }

  // GET semua pengumuman (admin)
  async getAnnouncements() {
    return this._fetch(`${this.baseUrl}/announcements`);
  }

  // GET pengumuman by ID (admin)
  async getAnnouncementById(id) {
    return this._fetch(`${this.baseUrl}/announcements/${id}`);
  }

  // CREATE pengumuman (admin)
  async createAnnouncement(data) {
    return this._fetch(`${this.baseUrl}/announcements`, {
      method: 'POST',
      body: JSON.stringify(data)
    });
  }

  // UPDATE pengumuman (admin)
  async updateAnnouncement(id, data) {
    return this._fetch(`${this.baseUrl}/announcements/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data)
    });
  }

  // DELETE pengumuman (admin)
  async deleteAnnouncement(id) {
    return this._fetch(`${this.baseUrl}/announcements/${id}`, {
      method: 'DELETE'
    });
  }

  // ===== GALLERY ENDPOINTS =====

  // PUBLIC: GET gallery items by section (activities|building)
  async getPublicGallery(section) {
    const qs = new URLSearchParams({ section });
    return this._fetch(`${this.baseUrl}/gallery/public?${qs.toString()}`);
  }

  // ADMIN: GET gallery items (optional section)
  async getGallery(section) {
    const url = section ? `${this.baseUrl}/gallery?${new URLSearchParams({ section }).toString()}` : `${this.baseUrl}/gallery`;
    return this._fetch(url);
  }

  // ADMIN: CREATE gallery item
  async createGalleryItem(data) {
    return this._fetch(`${this.baseUrl}/gallery`, {
      method: 'POST',
      body: JSON.stringify(data)
    });
  }

  // ADMIN: UPDATE gallery item
  async updateGalleryItem(id, data) {
    return this._fetch(`${this.baseUrl}/gallery/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data)
    });
  }

  // ADMIN: DELETE gallery item
  async deleteGalleryItem(id) {
    return this._fetch(`${this.baseUrl}/gallery/${id}`, {
      method: 'DELETE'
    });
  }

  // ADMIN: REORDER gallery items
  async reorderGallery(section, itemIds) {
    return this._fetch(`${this.baseUrl}/gallery/reorder`, {
      method: 'POST',
      body: JSON.stringify({ section, itemIds })
    });
  }

  // ADMIN: UPLOAD gallery image (multipart)
  async uploadGalleryImage(file, section) {
    const formData = new FormData();
    formData.append('image', file);
    formData.append('section', section);

    const response = await fetch(`${this.baseUrl}/gallery/upload`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.token}`
      },
      body: formData
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: response.statusText }));
      throw new Error(error.error || `HTTP ${response.status}`);
    }

    return response.json();
  }
}

// Detect API base URL (browser environment)
// Priority: window.API_URL -> localStorage -> default
let apiBaseUrl = window.API_URL || localStorage.getItem('apiBaseUrl') || getDefaultApiBaseUrl();

// Export untuk digunakan di script
const api = new APIClient(apiBaseUrl);
