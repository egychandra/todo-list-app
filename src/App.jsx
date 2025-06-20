import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';
import ChecklistPage from './pages/ChecklistPage';
import ChecklistDetailPage from './pages/ChecklistDetailPage';
import CreateChecklistPage from './pages/CreateChecklistPage';
import CreateItemPage from './pages/CreateItemPage';
import ChecklistItemDetailPage from './pages/ChecklistItemDetailPage';
import EditItemPage from './pages/EditItemPage';
import Header from './components/Layout/Header';
import PrivateRoute from './components/Layout/PrivateRoute';

function App() {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  return (
    <Router>
      <Header />
      <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
        <Routes>
          <Route
            path="/"
            element={
              isAuthenticated ? (
                <Navigate to="/checklists" replace />
              ) : (
                <HomePage />
              )
            }
          />
          <Route
            path="/auth"
            element={
              isAuthenticated ? (
                <Navigate to="/checklists" replace />
              ) : (
                <AuthPage />
              )
            }
          />
          
          <Route element={<PrivateRoute />}>
            <Route path="/checklists" element={<ChecklistPage />} />
            <Route path="/checklists/:checklistId" element={<ChecklistDetailPage />} />
            <Route path="/checklists/:checklistId/items/new" element={<CreateItemPage />} />
            <Route path="/checklists/:checklistId/items/:itemId" element={<ChecklistItemDetailPage />} />
            <Route path="/checklists/:checklistId/items/:itemId/edit" element={<EditItemPage />} />
            <Route path="/checklists/new" element={<CreateChecklistPage />} />
          </Route>
          
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;