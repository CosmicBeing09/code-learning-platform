export function Footer() {
  return (
    <footer className="border-t mt-auto">
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-3 gap-8">
          <div>
            <h3 className="font-semibold mb-2">About</h3>
            <p className="text-sm text-gray-600">
              Learn programming through interactive lessons and practice
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Contact</h3>
            <p className="text-sm text-gray-600">support@codelearn.com</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Follow Us</h3>
            <p className="text-sm text-gray-600">Twitter • GitHub • LinkedIn</p>
          </div>
        </div>
      </div>
    </footer>
  );
} 