import { Link, useLocation, useNavigate } from 'react-router-dom';
import { MdOutlinePostAdd } from 'react-icons/md';
import { IoReturnUpBack } from "react-icons/io5";

function Header() {
  const location = useLocation();
  const navigate = useNavigate();

  const isFormPage = location.pathname.startsWith('/posts/new') || location.pathname.startsWith('/posts/edit');

  return (
    <header className="bg-zinc-700 text-white md:px-24 px-4 py-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold">Home</h1>
      <nav className="space-x-4">
        {isFormPage ? (
          <button
            onClick={() => navigate(-1)}
            className="hover:underline flex items-center space-x-1"
          >
            <IoReturnUpBack />
            <span>Zpět</span>
          </button>
        ) : (
          <Link to="/posts/new" className="hover:underline flex items-center space-x-1">
            <MdOutlinePostAdd />
            <span>Přidat příspěvek</span>
          </Link>
        )}
      </nav>
    </header>
  );
}

export default Header;
