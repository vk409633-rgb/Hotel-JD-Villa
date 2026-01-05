import React from 'react'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'
import {
    Wifi,
    Coffee,
    Car,
    Utensils,
    Wind,
    Tv,
    Dumbbell,
    Waves,
    Shirt,
    Shield,
    Clock,
    Headphones,
    Briefcase,
    Baby,
    Dog,
    Cigarette
} from 'lucide-react'

export default function AmenitiesPage() {
    const amenities = [
        {
            category: 'Room Amenities',
            items: [
                { icon: Wind, name: 'Air Conditioning', description: 'Climate-controlled rooms for your comfort' },
                { icon: Tv, name: 'Smart TV', description: 'Entertainment with streaming services' },
                { icon: Wifi, name: 'Free Wi-Fi', description: 'High-speed internet throughout the property' },
                { icon: Coffee, name: 'Tea/Coffee Maker', description: 'Complimentary tea and coffee in rooms' },
            ]
        },
        {
            category: 'Dining',
            items: [
                { icon: Utensils, name: 'Restaurant', description: 'On-site restaurant serving local and international cuisine' },
                { icon: Coffee, name: 'Breakfast Included', description: 'Complimentary breakfast buffet' },
                { icon: Clock, name: 'Room Service', description: '24/7 in-room dining service' },
            ]
        },
        {
            category: 'Services',
            items: [
                { icon: Car, name: 'Free Parking', description: 'Secure parking space for guests' },
                { icon: Shirt, name: 'Laundry Service', description: 'Professional laundry and dry cleaning' },
                { icon: Headphones, name: '24/7 Front Desk', description: 'Round-the-clock assistance' },
                { icon: Shield, name: 'Security', description: 'CCTV surveillance and secure premises' },
            ]
        },
        {
            category: 'Recreation',
            items: [
                { icon: Waves, name: 'Swimming Pool', description: 'Outdoor pool with loungers' },
                { icon: Dumbbell, name: 'Fitness Center', description: 'Well-equipped gym facilities' },
            ]
        },
        {
            category: 'Business',
            items: [
                { icon: Briefcase, name: 'Business Center', description: 'Meeting rooms and business facilities' },
                { icon: Wifi, name: 'High-Speed Internet', description: 'Dedicated business-class connectivity' },
            ]
        },
        {
            category: 'Family Friendly',
            items: [
                { icon: Baby, name: 'Kids Welcome', description: 'Family rooms and child-friendly facilities' },
                { icon: Dog, name: 'Pet Friendly', description: 'Pets allowed (with prior notice)' },
            ]
        }
    ]

    const policies = [
        { icon: Clock, title: 'Check-in', description: '2:00 PM onwards' },
        { icon: Clock, title: 'Check-out', description: '11:00 AM' },
        { icon: Cigarette, title: 'No Smoking', description: 'Smoking only in designated areas' },
    ]

    return (
        <div className="min-h-screen bg-background">
            {/* Hero Section */}
            <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-hero z-10"></div>
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                        backgroundImage: 'url(https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=1920&q=80)',
                    }}
                ></div>
                <div className="relative z-20 container-custom text-center text-white">
                    <h1 className="text-5xl md:text-6xl font-bold mb-4 animate-fade-in">
                        Amenities & Services
                    </h1>
                    <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto animate-fade-in" style={{ animationDelay: '0.2s' }}>
                        Everything you need for a comfortable and memorable stay
                    </p>
                </div>
            </section>

            {/* Amenities Grid */}
            <section className="py-20 bg-white">
                <div className="container-custom">
                    {amenities.map((category, catIndex) => (
                        <div key={catIndex} className="mb-16 last:mb-0">
                            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
                                {category.category}
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                                {category.items.map((item, index) => (
                                    <div
                                        key={index}
                                        className="bg-muted p-8 rounded-xl text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-2 animate-scale-in"
                                        style={{ animationDelay: `${index * 0.1}s` }}
                                    >
                                        <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <item.icon className="text-accent" size={32} />
                                        </div>
                                        <h3 className="text-xl font-bold mb-2">{item.name}</h3>
                                        <p className="text-muted-foreground text-sm">{item.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Policies Section */}
            <section className="py-20 bg-muted">
                <div className="container-custom">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl md:text-5xl font-bold mb-4">Hotel Policies</h2>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            Important information for your stay
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                        {policies.map((policy, index) => (
                            <div key={index} className="bg-white p-8 rounded-xl text-center">
                                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <policy.icon className="text-primary" size={32} />
                                </div>
                                <h3 className="text-xl font-bold mb-2">{policy.title}</h3>
                                <p className="text-muted-foreground">{policy.description}</p>
                            </div>
                        ))}
                    </div>

                    <div className="mt-12 max-w-3xl mx-auto bg-white p-8 rounded-xl">
                        <h3 className="text-2xl font-bold mb-4">Additional Policies</h3>
                        <ul className="space-y-3 text-muted-foreground">
                            <li className="flex items-start gap-3">
                                <span className="text-accent mt-1">•</span>
                                <span>Valid ID proof required at check-in</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-accent mt-1">•</span>
                                <span>Cancellation allowed up to 24 hours before check-in</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-accent mt-1">•</span>
                                <span>Extra bed available on request (charges apply)</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-accent mt-1">•</span>
                                <span>Pets allowed with prior notice and additional fee</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-accent mt-1">•</span>
                                <span>Early check-in and late check-out subject to availability</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-gradient-primary text-white">
                <div className="container-custom text-center">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">Experience Premium Comfort</h2>
                    <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
                        Book your stay today and enjoy all our world-class amenities and services.
                    </p>
                    <Link href="/book">
                        <Button variant="accent" size="lg" className="text-lg px-10">
                            Book Your Stay Now
                        </Button>
                    </Link>
                </div>
            </section>
        </div>
    )
}
