import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Home, Menu, X, Search, User, LogIn } from 'lucide-react';
import { SignInButton, SignedIn, SignedOut, useUser, UserButton } from "@clerk/clerk-react";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const { user } = useUser();
  const navigate = useNavigate();
  
  return (
    <nav className="bg-gradient-to-r from-blue-600 to-blue-700 shadow-lg">
      <div className="container mx-auto px-4">
        {/* Main Navbar */}
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center space-x-2 text-white transform hover:scale-105 transition-transform duration-200"
          >
            <span className="text-2xl font-bold">AI Shop</span>
          </Link>

          {/* Search Bar - Hidden on mobile */}
          <div className="hidden md:block flex-1 max-w-md mx-8">
            <div className={`relative ${isSearchFocused ? 'ring-2 ring-white/50' : ''} rounded-lg`}>
              <input
                type="text"
                placeholder="Search products..."
                className="w-full py-2 px-4 pl-10 bg-white/10 text-white placeholder-white/70 rounded-lg focus:outline-none focus:bg-white/20 transition-all duration-200"
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-white/70" />
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link 
              to="/" 
              className="flex items-center space-x-1 text-white hover:text-blue-200 transition-colors duration-200"
            >
              <Home className="h-5 w-5" />
              <span>Home</span>
            </Link>
            
            {/* Authenticated Navigation Items */}
            <SignedIn>
              <Link 
                to="/cart" 
                className="flex items-center space-x-1 text-white hover:text-blue-200 transition-colors duration-200"
              >
                <div className="relative">
                  <ShoppingCart className="h-5 w-5" />
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                    2
                  </span>
                </div>
                <span>Cart</span>
              </Link>

              <div className="flex items-center space-x-2">
                <UserButton 
                  afterSignOutUrl="/"
                  appearance={{
                    elements: {
                      avatarBox: "w-8 h-8"
                    }
                  }}
                />
              </div>
            </SignedIn>

            {/* Login Button for Non-Authenticated Users */}
            <SignedOut>
              <SignInButton mode="modal">
                <button className="flex items-center space-x-2 bg-white text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors duration-200">
                  <LogIn className="h-5 w-5" />
                  <span>Sign In</span>
                </button>
              </SignInButton>
            </SignedOut>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-white hover:text-blue-200 transition-colors duration-200"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-4">
            {/* Mobile Search */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full py-2 px-4 pl-10 bg-white/10 text-white placeholder-white/70 rounded-lg focus:outline-none focus:bg-white/20 transition-all duration-200"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-white/70" />
            </div>
            
            {/* Mobile Navigation Links */}
            <div className="space-y-2">
              <Link 
                to="/"
                className="flex items-center space-x-2 text-white hover:text-blue-200 transition-colors duration-200 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                <Home className="h-5 w-5" />
                <span>Home</span>
              </Link>
              
              {/* Authenticated Mobile Navigation Items */}
              <SignedIn>
                <Link 
                  to="/cart"
                  className="flex items-center space-x-2 text-white hover:text-blue-200 transition-colors duration-200 py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <div className="relative">
                    <ShoppingCart className="h-5 w-5" />
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                      2
                    </span>
                  </div>
                  <span>Cart</span>
                </Link>

                <div className="flex items-center space-x-2 py-2">
                  <UserButton 
                    afterSignOutUrl="/"
                    appearance={{
                      elements: {
                        avatarBox: "w-8 h-8"
                      }
                    }}
                  />
                  <span className="text-white">{user?.firstName || 'Profile'}</span>
                </div>
              </SignedIn>

              {/* Login Button for Non-Authenticated Mobile Users */}
              <SignedOut>
                <SignInButton mode="modal">
                  <button className="flex items-center space-x-2 bg-white text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors duration-200 w-full">
                    <LogIn className="h-5 w-5" />
                    <span>Sign In</span>
                  </button>
                </SignInButton>
              </SignedOut>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;