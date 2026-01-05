'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Card, CardContent } from '@/components/ui/Card'
import { useHotelStore } from '@/store/hotelStore'
import { formatCurrency } from '@/lib/utils'
import { Users, Maximize, Wifi, Coffee, Tv, Wind, Calendar } from 'lucide-react'

export default function RoomsPage() {
    const { rooms } = useHotelStore()
    const [filter, setFilter] = useState<string>('All')

    const categories = ['All', 'Standard', 'Deluxe', 'Balcony', 'Suite']
    const filteredRooms = filter === 'All' ? rooms : rooms.filter(r => r.category === filter)

    const amenityIcons: { [key: string]: any } = {
        'Free Wi-Fi': Wifi,
        'Breakfast': Coffee,
        'Smart TV': Tv,
        'TV': Tv,
        'Air Conditioning': Wind,
    }

    return (
        <div className="min-h-screen bg-background">
            {/* Hero Section */}
            <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-hero z-10"></div>
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                        backgroundImage: 'url(https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=1920&q=80)',
                    }}
                ></div>
                <div className="relative z-20 container-custom text-center text-white">
                    <h1 className="text-5xl md:text-6xl font-bold mb-4 animate-fade-in">
                        Our Rooms & Suites
                    </h1>
                    <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto animate-fade-in" style={{ animationDelay: '0.2s' }}>
                        Discover comfort and luxury in every room
                    </p>
                </div>
            </section>

            {/* Filter Section */}
            <section className="bg-white py-8 shadow-md -mt-16 relative z-30">
                <div className="container-custom">
                    <div className="flex flex-wrap gap-4 justify-center">
                        {categories.map((category) => (
                            <Button
                                key={category}
                                variant={filter === category ? 'primary' : 'outline'}
                                onClick={() => setFilter(category)}
                            >
                                {category}
                            </Button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Rooms Grid */}
            <section className="section">
                <div className="container-custom">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {filteredRooms.map((room, index) => (
                            <Card key={room.id} hover className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                                <div className="grid grid-cols-1 md:grid-cols-2">
                                    {/* Image */}
                                    <div className="relative h-80 md:h-auto overflow-hidden">
                                        <img
                                            src={room.images[0]}
                                            alt={room.name}
                                            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                                        />
                                        <div className="absolute top-4 right-4 bg-accent text-white px-4 py-2 rounded-full font-semibold shadow-lg">
                                            {formatCurrency(room.basePrice)}/night
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <CardContent className="p-8 flex flex-col justify-between">
                                        <div>
                                            <div className="mb-4">
                                                <span className="text-sm font-medium text-accent uppercase tracking-wide">
                                                    {room.category}
                                                </span>
                                                <h3 className="text-2xl font-bold mt-1 mb-3">{room.name}</h3>
                                                <p className="text-muted-foreground mb-4">{room.description}</p>
                                            </div>

                                            {/* Room Info */}
                                            <div className="flex gap-6 mb-6 text-sm text-muted-foreground">
                                                <div className="flex items-center gap-2">
                                                    <Maximize size={18} className="text-primary" />
                                                    <span>{room.size}</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Users size={18} className="text-primary" />
                                                    <span>Up to {room.maxOccupancy}</span>
                                                </div>
                                            </div>

                                            {/* Amenities */}
                                            <div className="mb-6">
                                                <h4 className="font-semibold mb-3">Amenities</h4>
                                                <div className="grid grid-cols-2 gap-2">
                                                    {room.amenities.slice(0, 6).map((amenity, i) => {
                                                        const Icon = amenityIcons[amenity] || Wifi
                                                        return (
                                                            <div key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                                                                <Icon size={16} className="text-accent" />
                                                                <span>{amenity}</span>
                                                            </div>
                                                        )
                                                    })}
                                                </div>
                                                {room.amenities.length > 6 && (
                                                    <p className="text-sm text-accent mt-2">+{room.amenities.length - 6} more</p>
                                                )}
                                            </div>
                                        </div>

                                        {/* Actions */}
                                        <div className="flex gap-3">
                                            <Link href={`/rooms/${room.id}`} className="flex-1">
                                                <Button variant="outline" className="w-full">View Details</Button>
                                            </Link>
                                            <Link href="/book" className="flex-1">
                                                <Button variant="accent" className="w-full">
                                                    <Calendar size={18} className="mr-2" />
                                                    Book Now
                                                </Button>
                                            </Link>
                                        </div>
                                    </CardContent>
                                </div>
                            </Card>
                        ))}
                    </div>

                    {filteredRooms.length === 0 && (
                        <div className="text-center py-20">
                            <p className="text-xl text-muted-foreground">No rooms found in this category.</p>
                        </div>
                    )}
                </div>
            </section>

            {/* CTA Section */}
            <section className="section bg-gradient-primary text-white">
                <div className="container-custom text-center">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">Can't Decide?</h2>
                    <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
                        Contact our team and we'll help you choose the perfect room for your stay.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/contact">
                            <Button variant="accent" size="lg" className="text-lg px-10">
                                Contact Us
                            </Button>
                        </Link>
                        <a href="tel:+919876543210">
                            <Button variant="outline" size="lg" className="text-lg px-10 bg-white/10 backdrop-blur-sm border-white text-white hover:bg-white hover:text-primary">
                                Call Now
                            </Button>
                        </a>
                    </div>
                </div>
            </section>
        </div>
    )
}
