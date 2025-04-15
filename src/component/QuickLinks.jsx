import { useNavigate } from 'react-router-dom';

const links = [
  { label: 'Quick Link -1', to: '/link1' },
  { label: 'Quick Link -2', to: '/link2' },
  { label: 'Quick Link -3', to: '/link3' },
  { label: 'Quick Link -4', to: '/link4' },
  { label: 'Quick Link -5', to: '/link5' },
];

const QuickLinks = () => {
  const navigate = useNavigate();

  return (
    <div className="mt-6 text-center">
      <h2 className="text-xl font-semibold mb-6">Quick Links</h2>
      <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
        {links.map((link, i) => (
          <button
            key={i}
            onClick={() => navigate(link.to)}
            className="bg-gray-100 p-3 rounded-md text-center hover:bg-blue-100 hover:scale-105 transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer"
          >
            {link.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickLinks;
