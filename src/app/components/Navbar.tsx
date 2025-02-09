import { Link } from 'react-router-dom';
import { Primitive } from '@radix-ui/react-primitive';

export function Navbar() {
  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">
          CodeLearn
        </Link>
        <nav className="space-x-4">
          <Primitive.button className="px-4 py-2 hover:bg-gray-100 rounded-md">
            <Link to="/login">Login</Link>
          </Primitive.button>
          <Primitive.button className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-md">
            <Link to="/signup">Sign Up</Link>
          </Primitive.button>
        </nav>
      </div>
    </header>
  );
} 