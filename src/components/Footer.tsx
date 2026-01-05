import React from 'react'
import Link from 'next/link'
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin, MessageCircle } from 'lucide-react'

export function Footer() {
    return (
        <footer className="bg-primary text-white">
            <div className="container-custom section">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {/* About */}
                    <div>
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-xl">JD</span>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold">Hotel JD Villa</h3>
                                <p className="text-sm text-white/80">Luxury & Comfort</p>
                            </div>
                        </div>
                        <p className="text-white/80 mb-6">
                            Experience the perfect blend of luxury and comfort at Hotel JD Villa.
                            Your home away from home in the heart of Khandala.
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="w-10 h-10 bg-white/10 hover:bg-accent rounded-lg flex items-center justify-center transition-colors">
                                <Facebook size={20} />
                            </a>
                            <a href="#" className="w-10 h-10 bg-white/10 hover:bg-accent rounded-lg flex items-center justify-center transition-colors">
                                <Instagram size={20} />
                            </a>
                            <a href="#" className="w-10 h-10 bg-white/10 hover:bg-accent rounded-lg flex items-center justify-center transition-colors">
                                <Twitter size={20} />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
                        <ul className="space-y-3">
                            <li><Link href="/" className="text-white/80 hover:text-accent transition-colors">Home</Link></li>
                            <li><Link href="/rooms" className="text-white/80 hover:text-accent transition-colors">Rooms</Link></li>
                            <li><Link href="/amenities" className="text-white/80 hover:text-accent transition-colors">Amenities</Link></li>
                            <li><Link href="/gallery" className="text-white/80 hover:text-accent transition-colors">Gallery</Link></li>
                            <li><Link href="/about" className="text-white/80 hover:text-accent transition-colors">About Us</Link></li>
                            <li><Link href="/contact" className="text-white/80 hover:text-accent transition-colors">Contact</Link></li>
                        </ul>
                    </div>

                    {/* Policies */}
                    <div>
                        <h4 className="text-lg font-semibold mb-6">Policies</h4>
                        <ul className="space-y-3">
                            <li><Link href="/policies/cancellation" className="text-white/80 hover:text-accent transition-colors">Cancellation Policy</Link></li>
                            <li><Link href="/policies/privacy" className="text-white/80 hover:text-accent transition-colors">Privacy Policy</Link></li>
                            <li><Link href="/policies/terms" className="text-white/80 hover:text-accent transition-colors">Terms & Conditions</Link></li>
                            <li><Link href="/faq" className="text-white/80 hover:text-accent transition-colors">FAQs</Link></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="text-lg font-semibold mb-6">Contact Us</h4>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3">
                                <MapPin size={20} className="text-accent flex-shrink-0 mt-1" />
                                <span className="text-white/80">
                                    Ambience Villa, Khandala, Lonavala<br />
                                    Opp. Kamat Hotel, Behind Elight Hotel<br />
                                    Maharashtra 410401
                                </span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone size={20} className="text-accent flex-shrink-0" />
                                <a href="tel:+919876543210" className="text-white/80 hover:text-accent transition-colors">
                                    +91 98765 43210
                                </a>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail size={20} className="text-accent flex-shrink-0" />
                                <a href="mailto:info@hoteljdvilla.com" className="text-white/80 hover:text-accent transition-colors">
                                    info@hoteljdvilla.com
                                </a>
                            </li>
                            <li className="flex items-center gap-3">
                                <MessageCircle size={20} className="text-accent flex-shrink-0" />
                                <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-accent transition-colors">
                                    WhatsApp Us
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-white/10">
                <div className="container-custom py-6">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/60">
                        <p>&copy; {new Date().getFullYear()} Hotel JD Villa. All rights reserved.</p>
                        <p>Designed with ❤️ for exceptional hospitality</p>
                    </div>
                </div>
            </div>
        </footer>
    )
}
