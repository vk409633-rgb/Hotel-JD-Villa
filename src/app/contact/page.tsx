'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Card, CardContent } from '@/components/ui/Card'
import { MapPin, Phone, Mail, Clock, MessageCircle, Send } from 'lucide-react'

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
    })
    const [submitted, setSubmitted] = useState(false)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // In a real app, this would send the data to a backend
        console.log('Form submitted:', formData)
        setSubmitted(true)
        setTimeout(() => {
            setSubmitted(false)
            setFormData({ name: '', email: '', phone: '', subject: '', message: '' })
        }, 3000)
    }

    const contactInfo = [
        {
            icon: MapPin,
            title: 'Address',
            content: 'Ambience Villa, Khandala, Lonavala\nOpp. Kamat Hotel, Behind Elight Hotel\nMaharashtra 410401',
            link: 'https://maps.google.com/?q=Hotel+JD+Villa,+Khandala'
        },
        {
            icon: Phone,
            title: 'Phone',
            content: '+91 98765 43210',
            link: 'tel:+919876543210'
        },
        {
            icon: Mail,
            title: 'Email',
            content: 'info@hoteljdvilla.com',
            link: 'mailto:info@hoteljdvilla.com'
        },
        {
            icon: MessageCircle,
            title: 'WhatsApp',
            content: 'Chat with us',
            link: 'https://wa.me/919876543210'
        }
    ]

    return (
        <div className="min-h-screen bg-background">
            {/* Hero Section */}
            <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-hero z-10"></div>
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                        backgroundImage: 'url(https://images.unsplash.com/photo-1596524430615-b46475ddff6e?w=1920&q=80)',
                    }}
                ></div>
                <div className="relative z-20 container-custom text-center text-white">
                    <h1 className="text-5xl md:text-6xl font-bold mb-4 animate-fade-in">
                        Get in Touch
                    </h1>
                    <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto animate-fade-in" style={{ animationDelay: '0.2s' }}>
                        We're here to help and answer any questions you might have
                    </p>
                </div>
            </section>

            {/* Contact Info Cards */}
            <section className="bg-white py-8 shadow-md -mt-16 relative z-30">
                <div className="container-custom">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {contactInfo.map((info, index) => (
                            <a
                                key={index}
                                href={info.link}
                                target={info.link.startsWith('http') ? '_blank' : undefined}
                                rel={info.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                                className="flex items-start gap-4 p-6 rounded-xl hover:bg-muted transition-all duration-300 hover:-translate-y-1"
                            >
                                <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                                    <info.icon className="text-accent" size={24} />
                                </div>
                                <div>
                                    <h3 className="font-semibold mb-1">{info.title}</h3>
                                    <p className="text-sm text-muted-foreground whitespace-pre-line">{info.content}</p>
                                </div>
                            </a>
                        ))}
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <section className="section">
                <div className="container-custom">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* Contact Form */}
                        <div className="animate-slide-in-left">
                            <h2 className="text-4xl font-bold mb-6">Send Us a Message</h2>
                            <p className="text-lg text-muted-foreground mb-8">
                                Fill out the form below and we'll get back to you as soon as possible.
                            </p>

                            {submitted ? (
                                <Card className="bg-success/10 border-success animate-scale-in">
                                    <CardContent className="p-8 text-center">
                                        <div className="w-16 h-16 bg-success/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <Send className="text-success" size={32} />
                                        </div>
                                        <h3 className="text-2xl font-bold text-success mb-2">Message Sent!</h3>
                                        <p className="text-muted-foreground">
                                            Thank you for contacting us. We'll respond within 24 hours.
                                        </p>
                                    </CardContent>
                                </Card>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium mb-2">Your Name *</label>
                                            <input
                                                type="text"
                                                required
                                                value={formData.name}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                                placeholder="John Doe"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium mb-2">Email *</label>
                                            <input
                                                type="email"
                                                required
                                                value={formData.email}
                                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                                placeholder="john@example.com"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium mb-2">Phone</label>
                                            <input
                                                type="tel"
                                                value={formData.phone}
                                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                                placeholder="+91 98765 43210"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium mb-2">Subject *</label>
                                            <select
                                                required
                                                value={formData.subject}
                                                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                                className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                            >
                                                <option value="">Select a subject</option>
                                                <option value="booking">Booking Inquiry</option>
                                                <option value="general">General Question</option>
                                                <option value="feedback">Feedback</option>
                                                <option value="complaint">Complaint</option>
                                                <option value="other">Other</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium mb-2">Message *</label>
                                        <textarea
                                            required
                                            value={formData.message}
                                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                            rows={6}
                                            className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                            placeholder="Tell us how we can help you..."
                                        />
                                    </div>

                                    <Button type="submit" variant="accent" size="lg" className="w-full md:w-auto">
                                        <Send size={20} className="mr-2" />
                                        Send Message
                                    </Button>
                                </form>
                            )}
                        </div>

                        {/* Additional Info */}
                        <div className="animate-slide-in-right">
                            <Card className="mb-8">
                                <CardContent className="p-8">
                                    <div className="flex items-start gap-4 mb-6">
                                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                                            <Clock className="text-primary" size={24} />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold mb-2">Office Hours</h3>
                                            <div className="space-y-1 text-muted-foreground">
                                                <p>Monday - Friday: 9:00 AM - 8:00 PM</p>
                                                <p>Saturday: 10:00 AM - 6:00 PM</p>
                                                <p>Sunday: 10:00 AM - 4:00 PM</p>
                                                <p className="text-primary font-medium mt-2">24/7 Emergency Support Available</p>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardContent className="p-8">
                                    <h3 className="text-xl font-bold mb-4">Quick Response</h3>
                                    <p className="text-muted-foreground mb-6">
                                        For immediate assistance, we recommend using WhatsApp or calling us directly.
                                        We typically respond to emails within 24 hours.
                                    </p>
                                    <div className="space-y-3">
                                        <a
                                            href="https://wa.me/919876543210"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="block"
                                        >
                                            <Button variant="primary" className="w-full">
                                                <MessageCircle size={20} className="mr-2" />
                                                Chat on WhatsApp
                                            </Button>
                                        </a>
                                        <a href="tel:+919876543210" className="block">
                                            <Button variant="outline" className="w-full">
                                                <Phone size={20} className="mr-2" />
                                                Call Us Now
                                            </Button>
                                        </a>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </section>

            {/* Map Section */}
            <section className="section bg-muted">
                <div className="container-custom">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl md:text-5xl font-bold mb-4">Visit Us</h2>
                        <p className="text-lg text-muted-foreground">
                            Nestled in the scenic hills of Khandala, Lonavala
                        </p>
                    </div>
                    <div className="rounded-2xl overflow-hidden shadow-xl h-[500px]">
                        <iframe
                            src="https://maps.google.com/maps?q=Hotel+JD+Villa,+Ambience+Villa,+Khandala,+Lonavala&t=&z=15&ie=UTF8&iwloc=&output=embed"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                    </div>
                </div>
            </section>

            {/* FAQ Preview */}
            <section className="section bg-white">
                <div className="container-custom text-center">
                    <h2 className="text-4xl font-bold mb-4">Have Questions?</h2>
                    <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                        Check out our frequently asked questions for quick answers to common inquiries.
                    </p>
                    <Button variant="primary" size="lg">
                        View FAQs
                    </Button>
                </div>
            </section>
        </div>
    )
}
