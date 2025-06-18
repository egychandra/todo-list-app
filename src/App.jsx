import { useState, useEffect, useCallback, useRef, use } from 'react';
import { ChevronLeft, Plus, Edit2, Trash2, Check, X, User, Lock, Mail, LogOut } from 'lucide-react';

const API_BASE_URL = 'http://94.74.86.174:8080/api';

function App() {
  const [currentPage, setCurrentPage] = useState('login');
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [checklists, setChecklists] = useState([]);
  const [currentChecklist, setCurrentChecklist] = useState(null);
  const [checklistItems, setChecklistItems] = useState([]);
  const [currentItem, setCurrentItem] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const hasFetchedChecklists = useRef(false);


  const apiCall = async (endpoint, options = {}) => {
    const headers = {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` }),
      ...options.headers
    };

    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        headers
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const text = await response.text();
      return text ? JSON.parse(text) : {};
    } catch (error) {
      console.error('API call error:', error);
      throw error;
    }
  };

  const LoginPage = () => {
    const [formData, setFormData] = useState({ username: '', password: '' });

    const handleLogin = async (e) => {
      e.preventDefault();
      setLoading(true);
      setError('');

      try {
        const response = await apiCall('/login', {
          method: 'POST',
          body: JSON.stringify(formData)
        });

        if (response.data?.token) {
          setToken(response.data.token);
          setUser({ username: formData.username });
        }
      } catch (error) {
        setError('Login gagal. Periksa username dan password Anda.');
      } finally {
        setLoading(false);
      }
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">To-Do List</h1>
            <p className="text-gray-600">Masuk ke akun Anda</p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <User className="inline w-4 h-4 mr-2" />
                Username
              </label>
              <input
                type="text"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={formData.username}
                onChange={(e) => setFormData({...formData, username: e.target.value})}
                placeholder="Masukkan username"
                onKeyPress={(e) => e.key === 'Enter' && handleLogin(e)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Lock className="inline w-4 h-4 mr-2" />
                Password
              </label>
              <input
                type="password"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                placeholder="Masukkan password"
                onKeyPress={(e) => e.key === 'Enter' && handleLogin(e)}
              />
            </div>

            <button
              onClick={handleLogin}
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50 font-medium transition-colors"
            >
              {loading ? 'Masuk...' : 'Masuk'}
            </button>
          </div>

          <div className="mt-6 text-center">
            <button
              onClick={() => setCurrentPage('register')}
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              Belum punya akun? Daftar di sini
            </button>
          </div>
        </div>
      </div>
    );
  };

  useEffect(() => {
    if (token && currentPage === 'login') {
      setCurrentPage('dashboard');
    }
  }, [token, currentPage]);

  const RegisterPage = () => {
    const [formData, setFormData] = useState({ username: '', email: '', password: '' });

    const handleRegister = async (e) => {
      e.preventDefault();
      setLoading(true);
      setError('');

      try {
        await apiCall('/register', {
          method: 'POST',
          body: JSON.stringify(formData)
        });

        alert('Registrasi berhasil! Silakan login.');
        setCurrentPage('login');
      } catch (error) {
        setError('Registrasi gagal. Coba lagi.');
      } finally {
        setLoading(false);
      }
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Daftar Baru</h1>
            <p className="text-gray-600">Buat akun baru Anda</p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <User className="inline w-4 h-4 mr-2" />
                Username
              </label>
              <input
                type="text"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                value={formData.username}
                onChange={(e) => setFormData({...formData, username: e.target.value})}
                placeholder="Masukkan username"
                onKeyPress={(e) => e.key === 'Enter' && handleRegister(e)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Mail className="inline w-4 h-4 mr-2" />
                Email
              </label>
              <input
                type="email"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                placeholder="Masukkan email"
                onKeyPress={(e) => e.key === 'Enter' && handleRegister(e)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Lock className="inline w-4 h-4 mr-2" />
                Password
              </label>
              <input
                type="password"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                placeholder="Masukkan password"
                onKeyPress={(e) => e.key === 'Enter' && handleRegister(e)}
              />
            </div>

            <button
              onClick={handleRegister}
              disabled={loading}
              className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 disabled:opacity-50 font-medium transition-colors"
            >
              {loading ? 'Mendaftar...' : 'Daftar'}
            </button>
          </div>

          <div className="mt-6 text-center">
            <button
              onClick={() => setCurrentPage('login')}
              className="text-green-600 hover:text-green-800 font-medium"
            >
              Sudah punya akun? Masuk di sini
            </button>
          </div>
        </div>
      </div>
    );
  };

  const DashboardPage = () => {
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [newChecklistName, setNewChecklistName] = useState('');

    const fetchChecklists = useCallback(async () => {
      if (!token || hasFetchedChecklists.current) return;
      try {
        hasFetchedChecklists.current = true;
        const data = await apiCall('/checklist');
        setChecklists(data.data || []);
      } catch (error) {
        setError('Gagal memuat checklist');
      }
    }, [token]);

    useEffect(() => {
      if (!token || currentPage !== 'dashboard') return;
      fetchChecklists();
    }, [fetchChecklists, token, currentPage]);

    const handleCreateChecklist = async (e) => {
      e.preventDefault();
      if (!newChecklistName.trim()) return;

      try {
        await apiCall('/checklist', {
          method: 'POST',
          body: JSON.stringify({ name: newChecklistName })
        });

        setNewChecklistName('');
        setShowCreateForm(false);
        fetchChecklists();
      } catch (error) {
        setError('Gagal membuat checklist');
      }
    };

    const handleDeleteChecklist = async (id) => {
      if (!window.confirm('Yakin ingin menghapus checklist ini?')) return;

      try {
        await apiCall(`/checklist/${id}`, { method: 'DELETE' });
        fetchChecklists();
      } catch (error) {
        setError('Gagal menghapus checklist');
      }
    };

    const handleLogout = () => {
      setUser(null);
      setToken(null);
      setCurrentPage('login');
    };

    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-800">Checklist Saya</h1>
            <div className="flex items-center space-x-4">
              <span className="text-gray-600">Halo, {user?.username}</span>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 text-red-600 hover:text-red-800"
              >
                <LogOut className="w-4 h-4" />
                <span>Keluar</span>
              </button>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 py-8">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          <div className="mb-6">
            <button
              onClick={() => setShowCreateForm(true)}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 flex items-center space-x-2 font-medium transition-colors"
            >
              <Plus className="w-5 h-5" />
              <span>Buat Checklist Baru</span>
            </button>
          </div>

          {showCreateForm && (
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <div className="flex space-x-4">
                <input
                  type="text"
                  placeholder="Nama checklist..."
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={newChecklistName}
                  onChange={(e) => setNewChecklistName(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleCreateChecklist(e)}
                  autoFocus
                />
                <button
                  onClick={handleCreateChecklist}
                  className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 font-medium"
                >
                  Simpan
                </button>
                <button
                  onClick={() => {
                    setShowCreateForm(false);
                    setNewChecklistName('');
                  }}
                  className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 font-medium"
                >
                  Batal
                </button>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {checklists.map((checklist) => (
              <div key={checklist.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-semibold text-gray-800 truncate">{checklist.name}</h3>
                  <button
                    onClick={() => handleDeleteChecklist(checklist.id)}
                    className="text-red-500 hover:text-red-700 p-1"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <button
                  onClick={() => {
                    setCurrentChecklist(checklist);
                    setCurrentPage('checklist-detail');
                  }}
                  className="w-full bg-blue-50 text-blue-700 py-2 rounded-lg hover:bg-blue-100 font-medium transition-colors"
                >
                  Lihat Detail
                </button>
              </div>
            ))}
          </div>

          {checklists.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">Belum ada checklist. Buat yang pertama!</p>
            </div>
          )}
        </main>
      </div>
    );
  };

  const ChecklistDetailPage = () => {
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [newItemName, setNewItemName] = useState('');

    const fetchChecklistItems = useCallback(async () => {
      if (!token || hasFetchedChecklists.current) return;
      try {
        hasFetchedChecklists.current = true;
        const data = await apiCall(`/checklist/${currentChecklist.id}/item`);
        setChecklistItems(data.data || []);
      } catch (error) {
        setError('Gagal memuat item checklist');
      }
    }, [token]);

    useEffect(() => {
      if (!token || currentPage !== 'checklist-detail') return;
      fetchChecklistItems();
    }, [fetchChecklistItems, token, currentPage]);

    const handleCreateItem = async (e) => {
      e.preventDefault();
      if (!newItemName.trim()) return;

      try {
        await apiCall(`/checklist/${currentChecklist.id}/item`, {
          method: 'POST',
          body: JSON.stringify({ itemName: newItemName })
        });

        setNewItemName('');
        setShowCreateForm(false);
        fetchChecklistItems();
      } catch (error) {
        setError('Gagal membuat item');
      }
    };

    const handleToggleItemStatus = async (itemId) => {
      try {
        await apiCall(`/checklist/${currentChecklist.id}/item/${itemId}`, {
          method: 'PUT'
        });
        fetchChecklistItems();
      } catch (error) {
        setError('Gagal mengubah status item');
      }
    };

    const handleDeleteItem = async (itemId) => {
      if (!window.confirm('Yakin ingin menghapus item ini?')) return;

      try {
        await apiCall(`/checklist/${currentChecklist.id}/item/${itemId}`, {
          method: 'DELETE'
        });
        fetchChecklistItems();
      } catch (error) {
        setError('Gagal menghapus item');
      }
    };

    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 py-4 flex items-center space-x-4">
            <button
              onClick={() => setCurrentPage('dashboard')}
              className="text-gray-600 hover:text-gray-800"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <h1 className="text-2xl font-bold text-gray-800">{currentChecklist?.name}</h1>
          </div>
        </header>

        <main className="max-w-4xl mx-auto px-4 py-8">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          <div className="mb-6">
            <button
              onClick={() => setShowCreateForm(true)}
              className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 flex items-center space-x-2 font-medium transition-colors"
            >
              <Plus className="w-5 h-5" />
              <span>Tambah Item</span>
            </button>
          </div>

          {showCreateForm && (
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <div className="flex space-x-4">
                <input
                  type="text"
                  placeholder="Nama item..."
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  value={newItemName}
                  onChange={(e) => setNewItemName(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleCreateItem(e)}
                  autoFocus
                />
                <button
                  onClick={handleCreateItem}
                  className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 font-medium"
                >
                  Simpan
                </button>
                <button
                  onClick={() => {
                    setShowCreateForm(false);
                    setNewItemName('');
                  }}
                  className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 font-medium"
                >
                  Batal
                </button>
              </div>
            </div>
          )}

          <div className="space-y-4">
            {checklistItems.map((item) => (
              <div key={item.id} className="bg-white rounded-lg shadow-md p-4 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => handleToggleItemStatus(item.id)}
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      item.itemCompletionStatus 
                        ? 'bg-green-500 border-green-500 text-white' 
                        : 'border-gray-300 hover:border-green-500'
                    }`}
                  >
                    {item.itemCompletionStatus && <Check className="w-4 h-4" />}
                  </button>
                  <span className={`text-lg ${item.itemCompletionStatus ? 'line-through text-gray-500' : 'text-gray-800'}`}>
                    {item.name}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => {
                      setCurrentItem(item);
                      setCurrentPage('item-detail');
                    }}
                    className="text-blue-600 hover:text-blue-800 p-2"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteItem(item.id)}
                    className="text-red-500 hover:text-red-700 p-2"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {checklistItems.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">Belum ada item dalam checklist ini. Tambah item pertama!</p>
            </div>
          )}
        </main>
      </div>
    );
  };

  const ItemDetailPage = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [editName, setEditName] = useState(currentItem?.name || '');

    const handleUpdateItemName = async (e) => {
      e.preventDefault();
      if (!editName.trim()) return;

      try {
        await apiCall(`/checklist/${currentChecklist.id}/item/rename/${currentItem.id}`, {
          method: 'PUT',
          body: JSON.stringify({ itemName: editName })
        });

        setCurrentItem({ ...currentItem, name: editName });
        setIsEditing(false);
      } catch (error) {
        setError('Gagal mengubah nama item');
      }
    };

    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 py-4 flex items-center space-x-4">
            <button
              onClick={() => setCurrentPage('checklist-detail')}
              className="text-gray-600 hover:text-gray-800"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <h1 className="text-2xl font-bold text-gray-800">Detail Item</h1>
          </div>
        </header>

        <main className="max-w-2xl mx-auto px-4 py-8">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Nama Item</label>
              {isEditing ? (
                <div className="flex space-x-4">
                  <input
                    type="text"
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleUpdateItemName(e)}
                    autoFocus
                  />
                  <button
                    onClick={handleUpdateItemName}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                  >
                    <Check className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => {
                      setIsEditing(false);
                      setEditName(currentItem?.name || '');
                    }}
                    className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  <span className="text-lg text-gray-800">{currentItem?.name}</span>
                  <button
                    onClick={() => setIsEditing(true)}
                    className="text-blue-600 hover:text-blue-800 p-2"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
              <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                currentItem?.itemCompletionStatus 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-yellow-100 text-yellow-800'
              }`}>
                {currentItem?.itemCompletionStatus ? 'Selesai' : 'Belum Selesai'}
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">ID Item</label>
              <span className="text-gray-600">{currentItem?.id}</span>
            </div>

            <div className="flex space-x-4">
              <button
                onClick={() => setCurrentPage('checklist-detail')}
                className="flex-1 bg-gray-600 text-white py-2 rounded-lg hover:bg-gray-700 font-medium"
              >
                Kembali ke Checklist
              </button>
            </div>
          </div>
        </main>
      </div>
    );
  };


  if (currentPage === 'login') return <LoginPage />;
  if (currentPage === 'register') return <RegisterPage />;
  if (currentPage === 'dashboard') return <DashboardPage />;
  if (currentPage === 'checklist-detail') return <ChecklistDetailPage />;
  if (currentPage === 'item-detail') return <ItemDetailPage />;

  return <LoginPage />;
}

export default App;