import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PostList from './components/PostList';
import PostEdit from './components/PostEdit';
import PostCreate from './components/PostCreate';
import Header from './components/Header';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow p-4">
          <Routes>
            <Route path="/" element={<PostList />} />
            <Route path="/posts/edit/:id" element={<PostEdit />} />
            <Route path="/posts/new" element={<PostCreate />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;

