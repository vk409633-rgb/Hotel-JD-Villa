'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X, Phone, Mail, MapPin } from 'lucide-react'
import { Button } from './ui/Button'
import { cn } from '@/lib/utils'

export function Header() {
    const [isScrolled, setIsScrolled] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const navLinks = [
        { href: '/', label: 'Home' },
        { href: '/rooms', label: 'Rooms' },
        { href: '/amenities', label: 'Amenities' },
        { href: '/gallery', label: 'Gallery' },
        { href: '/about', label: 'About' },
        { href: '/contact', label: 'Contact' },
    ]

    return (
        <>
            {/* Top Bar */}
            <div className="bg-primary text-white py-2 hidden md:block">
                <div className="container-custom">
                    <div className="flex justify-between items-center text-sm">
                        <div className="flex gap-6">
                            <a href="tel:+919876543210" className="flex items-center gap-2 hover:text-accent-light transition-colors">
                                <Phone size={14} />
                                <span>+91 98765 43210</span>
                            </a>
                            <a href="mailto:info@hoteljdvilla.com" className="flex items-center gap-2 hover:text-accent-light transition-colors">
                                <Mail size={14} />
                                <span>info@hoteljdvilla.com</span>
                            </a>
                        </div>
                        <div className="flex items-center gap-2">
                            <MapPin size={14} />
                            <span>Goa, India</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Header */}
            <header
                className={cn(
                    'sticky top-0 z-50 transition-all duration-300',
                    isScrolled
                        ? 'bg-white shadow-lg py-4'
                        : 'bg-white/95 backdrop-blur-sm py-6'
                )}
            >
                <div className="container-custom">
                    <div className="flex items-center justify-between">
                        {/* Logo */}
                        <Link href="/" className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-xl">JD</span>
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-primary">Hotel JD Villa</h1>
                                <p className="text-xs text-muted-foreground">Luxury & Comfort</p>
                            </div>
                        </Link>

                        {/* Desktop Navigation */}
                        <nav className="hidden lg:flex items-center gap-8">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="text-foreground hover:text-primary font-medium transition-colors relative group"
                                >
                                    {link.label}
                                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-300"></span>
                                </Link>
                            ))}
                        </nav>

                        {/* CTA Buttons */}
                        <div className="hidden lg:flex items-center gap-4">
                            <Link href="/admin">
                                <Button variant="ghost" size="sm">Admin</Button>
                            </Link>
                            <Link href="/book">
                                <Button variant="accent" size="md">Book Now</Button>
                            </Link>
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            className="lg:hidden p-2 hover:bg-muted rounded-lg transition-colors"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        >
                            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMobileMenuOpen && (
                    <div className="lg:hidden bg-white border-t border-border mt-4 animate-fade-in">
                        <nav className="container-custom py-4 flex flex-col gap-4">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="text-foreground hover:text-primary font-medium transition-colors py-2"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    {link.label}
                                </Link>
                            ))}
                            <div className="flex flex-col gap-2 pt-4 border-t border-border">
                                <Link href="/admin" onClick={() => setIsMobileMenuOpen(false)}>
                                    <Button variant="ghost" size="md" className="w-full">Admin</Button>
                                </Link>
                                <Link href="/book" onClick={() => setIsMobileMenuOpen(false)}>
                                    <Button variant="accent" size="md" className="w-full">Book Now</Button>
                                </Link>
                            </div>
                        </nav>
                    </div>
                )}
            </header>
        </>
    )
}
