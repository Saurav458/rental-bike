import { useState } from 'react';
import { Link } from 'react-router-dom';
import CityModal from '../common/Modal';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import cities from '../../data/cities.js';
import navLinks from '../../data/navLinks.js';
const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedCity, setSelectedCity] = useState('Bangalore');
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <nav className="sticky top-0 z-50 bg-black text-white shadow-lg">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link to="/" className="flex-shrink-0 flex items-center gap-2 hover:opacity-80 transition">
                        <div className="w-8 h-8 bg-white rounded flex items-center justify-center">
                            <span className="text-black font-bold text-sm">RJ</span>
                        </div>
                        <span className="text-primary font-bold text-lg">Raj Motors</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-8">
                        {navLinks.map((link, index) => (
                            <Link
                                key={index}
                                to={link.href}
                                className="text-white hover:text-gray-300 transition duration-200 text-sm font-medium"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    {/* City Selector */}
                    <div className="hidden md:flex items-center gap-2">
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="flex items-center gap-2 text-gray-300 hover:text-white transition duration-200"
                        >
                            <LocationOnIcon sx={{ fontSize: '20px' }} />
                            <span className="text-sm font-medium">{selectedCity}</span>
                        </button>
                    </div>

                    {/* Auth Button */}
                    <div className="hidden md:flex items-center gap-3">
                        <Link
                            to="/login"
                            className="bg-white text-black px-6 py-2 rounded font-medium hover:bg-gray-200 transition duration-200 text-sm"
                        >
                            Login
                        </Link>
                        <Link
                            to="/signup"
                            className="bg-white text-black px-6 py-2 rounded font-medium hover:bg-gray-200 transition duration-200 text-sm"
                        >
                            Register
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 focus:outline-none focus:bg-gray-800 focus:text-white transition duration-150 ease-in-out"
                        >
                            <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                {isOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isOpen && (
                    <div className="md:hidden pb-4">
                        <div className="px-2 pt-2 pb-3 space-y-1">
                            {navLinks.map((link, index) => (
                                <Link
                                    key={index}
                                    to={link.href}
                                    className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700 transition duration-200"
                                    onClick={() => setIsOpen(false)}
                                >
                                    {link.label}
                                </Link>
                            ))}
                                <button
                                    onClick={() => setIsModalOpen(true)}
                                    className="flex items-center gap-2 text-gray-300 hover:text-white transition duration-200"
                                >
                                    <LocationOnIcon sx={{ fontSize: '20px' }} />
                                    <span className="text-sm font-medium">{selectedCity}</span>
                                </button>
                                                    <div className="flex items-center gap-3 px-2 pt-2 pb-3 space-y-1">

                            <Link
                                to="/login"
                                className="bg-white text-black px-6 py-2 rounded font-medium hover:bg-gray-200 transition duration-200 text-sm"
                            >
                                Login
                            </Link>
                            <Link
                                to="/signup"
                                className="bg-white text-black px-6 py-2 rounded font-medium hover:bg-gray-200 transition duration-200 text-sm"
                            >
                                Register
                            </Link>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* City Selection Modal */}
            <CityModal
                open={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                cities={cities}
                setSelectedCity={setSelectedCity}
            />
        </nav>
    );
};

export default Navbar;