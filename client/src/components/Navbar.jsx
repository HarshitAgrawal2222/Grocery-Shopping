import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'
import { useAppContext } from '../context/AppContext'
import toast from 'react-hot-toast'

const Navbar = () => {
    const [open, setOpen] = React.useState(false)

    const {
        user,
        setUser,
        showUserLogin,
        setShowUserLogin,
        navigate,
        setSearchQuery,
        searchQuery,
        getCartCount,
        axios
    } = useAppContext()

    const logout = async () => {
        try {
            const { data } = await axios.get('/api/user/logout')

            if (data.success) {
                toast.success(data.message)
                setUser(null)
                setOpen(false)
                navigate('/')
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
            setUser(null)
            setOpen(false)
            navigate('/')
        }
    }

    useEffect(() => {
        if (searchQuery.length > 0) {
            navigate('/product')
        }
    }, [searchQuery])

    return (
        <nav className="relative z-50 flex items-center justify-between w-full px-4 sm:px-6 md:px-16 lg:px-24 xl:px-32 py-3 sm:py-4 border-b border-gray-300 bg-white">

            <NavLink to="/" onClick={() => setOpen(false)}>
                <img
                    className="h-8 sm:h-9 w-auto"
                    src={assets.logo}
                    alt="logo"
                />
            </NavLink>

            <div className="hidden sm:flex items-center gap-5 lg:gap-7 xl:gap-8">

                <NavLink to="/" className="hover:text-primary transition">
                    Home
                </NavLink>

                <NavLink to="/product" className="hover:text-primary transition">
                    All Products
                </NavLink>

                <NavLink to="/" className="hover:text-primary transition">
                    Contact
                </NavLink>

                <NavLink to="/" className="hover:text-primary transition">
                    About Us
                </NavLink>

                <div className="hidden lg:flex items-center text-sm gap-2 border border-gray-300 px-3 rounded-full w-44 xl:w-52">
                    <input
                        onChange={(e) => setSearchQuery(e.target.value)}
                        value={searchQuery}
                        className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500"
                        type="text"
                        placeholder="Search products"
                    />

                    <img
                        src={assets.search_icon}
                        alt="search"
                        className="w-4 h-4 shrink-0"
                    />
                </div>

                <div
                    onClick={() => navigate('/cart')}
                    className="relative cursor-pointer shrink-0"
                >
                    <img
                        src={assets.nav_cart_icon}
                        alt="cart"
                        className="w-6 opacity-80"
                    />

                    <span className="absolute -top-2 -right-3 flex items-center justify-center text-[10px] text-white bg-primary w-[18px] h-[18px] rounded-full">
                        {getCartCount()}
                    </span>
                </div>

                {!user ? (
                    <button
                        onClick={() => setShowUserLogin(true)}
                        className="cursor-pointer px-6 lg:px-8 py-2 bg-primary hover:bg-primary-dull transition text-white rounded-full whitespace-nowrap"
                    >
                        Login
                    </button>
                ) : (
                    <div className="relative group">
                        <img
                            src={assets.profile_icon}
                            className="w-9 lg:w-10 cursor-pointer"
                            alt="profile"
                        />

                        <ul className="hidden group-hover:block absolute top-9 right-0 bg-white shadow-lg border border-gray-200 py-2 w-32 rounded-md text-sm z-50">
                            <li
                                onClick={() => navigate('/my-orders')}
                                className="p-2 pl-3 hover:bg-primary/10 cursor-pointer"
                            >
                                My Orders
                            </li>

                            <li
                                onClick={logout}
                                className="p-2 pl-3 hover:bg-primary/10 cursor-pointer"
                            >
                                Logout
                            </li>
                        </ul>
                    </div>
                )}
            </div>

            <div className="flex sm:hidden items-center gap-4">

                <div
                    onClick={() => navigate('/cart')}
                    className="relative cursor-pointer"
                >
                    <img
                        src={assets.nav_cart_icon}
                        alt="cart"
                        className="w-6 opacity-80"
                    />

                    <span className="absolute -top-2 -right-3 flex items-center justify-center text-[10px] text-white bg-primary w-[18px] h-[18px] rounded-full">
                        {getCartCount()}
                    </span>
                </div>

                <button
                    onClick={() => setOpen(!open)}
                    aria-label="Menu"
                    className="p-1 cursor-pointer"
                >
                    <img
                        src={assets.menu_icon}
                        alt="menu"
                        className="w-6 h-6"
                    />
                </button>
            </div>

            {open && (
                <div className="absolute top-full left-0 w-full bg-white shadow-lg border-t border-gray-100 px-5 py-5 flex flex-col gap-1 sm:hidden z-50">

                    <NavLink
                        to="/"
                        onClick={() => setOpen(false)}
                        className="w-full py-3 px-3 rounded-md hover:bg-primary/10"
                    >
                        Home
                    </NavLink>

                    <NavLink
                        to="/product"
                        onClick={() => setOpen(false)}
                        className="w-full py-3 px-3 rounded-md hover:bg-primary/10"
                    >
                        All Products
                    </NavLink>

                    {user && (
                        <NavLink
                            to="/my-orders"
                            onClick={() => setOpen(false)}
                            className="w-full py-3 px-3 rounded-md hover:bg-primary/10"
                        >
                            My Orders
                        </NavLink>
                    )}

                    <NavLink
                        to="/"
                        onClick={() => setOpen(false)}
                        className="w-full py-3 px-3 rounded-md hover:bg-primary/10"
                    >
                        Contact
                    </NavLink>

                    <NavLink
                        to="/"
                        onClick={() => setOpen(false)}
                        className="w-full py-3 px-3 rounded-md hover:bg-primary/10"
                    >
                        About Us
                    </NavLink>

                    {!user ? (
                        <button
                            onClick={() => {
                                setOpen(false)
                                setShowUserLogin(true)
                            }}
                            className="w-full mt-3 py-2.5 bg-primary hover:bg-primary-dull transition text-white rounded-full cursor-pointer"
                        >
                            Login
                        </button>
                    ) : (
                        <button
                            onClick={logout}
                            className="w-full mt-3 py-2.5 bg-primary hover:bg-primary-dull transition text-white rounded-full cursor-pointer"
                        >
                            Logout
                        </button>
                    )}
                </div>
            )}
        </nav>
    )
}

export default Navbar