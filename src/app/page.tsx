'use client'

import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Card, CardContent } from '@/components/ui/Card'
import { useHotelStore } from '@/store/hotelStore'
import { formatCurrency } from '@/lib/utils'
import {
  Wifi,
  Coffee,
  Car,
  Utensils,
  Wind,
  Tv,
  Star,
  MapPin,
  Calendar,
  Users,
  Shield,
  Award,
  Clock
} from 'lucide-react'

export default function HomePage() {
  const { rooms, reviews } = useHotelStore()

  // Calculate average rating
  const averageRating = reviews.length > 0
    ? (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1)
    : '5.0'

  const amenities = [
    { icon: Wifi, title: 'Free Wi-Fi', description: 'High-speed internet' },
    { icon: Coffee, title: 'Breakfast', description: 'Complimentary breakfast' },
    { icon: Car, title: 'Free Parking', description: 'Secure parking space' },
    { icon: Utensils, title: 'Restaurant', description: 'On-site dining' },
    { icon: Wind, title: 'AC Rooms', description: 'Climate controlled' },
    { icon: Tv, title: 'Smart TV', description: 'Entertainment' },
  ]

  const features = [
    { icon: Shield, title: 'Safe & Secure', description: '24/7 security' },
    { icon: Award, title: 'Best Rated', description: `${averageRating}★ on Google` },
    { icon: Clock, title: '24/7 Service', description: 'Always available' },
  ]

  return (
    <div className="bg-background">
      {/* Hero Section */}
      <section className="relative h-[90vh] min-h-[600px] flex items-center justify-center overflow-hidden">
        {/* Background with overlay */}
        <div className="absolute inset-0 bg-gradient-hero z-10"></div>
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1920&q=80)',
          }}
        ></div>

        {/* Content */}
        <div className="relative z-20 container-custom text-center text-white">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
            Welcome to Hotel JD Villa
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-3xl mx-auto animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Experience Luxury & Comfort in the Heart of Goa
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <Link href="/book">
              <Button variant="accent" size="lg" className="text-lg px-10">
                <Calendar className="mr-2" size={20} />
                Book Your Stay
              </Button>
            </Link>
            <Link href="/rooms">
              <Button variant="outline" size="lg" className="text-lg px-10 bg-white/10 backdrop-blur-sm border-white text-white hover:bg-white hover:text-primary">
                Explore Rooms
              </Button>
            </Link>
          </div>

          {/* Quick Info */}
          <div className="mt-12 flex flex-wrap justify-center gap-8 text-sm">
            <div className="flex items-center gap-2">
              <Star className="text-accent" fill="currentColor" />
              <span>{averageRating} Rating</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="text-accent" />
              <span>Prime Location</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="text-accent" />
              <span>Family Friendly</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Bar */}
      <section className="bg-white py-8 shadow-md -mt-20 relative z-30">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center gap-4 p-4 rounded-lg hover:bg-muted transition-colors">
                <div className="w-14 h-14 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <feature.icon className="text-accent" size={28} />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-muted">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-in-left">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Your Perfect <span className="gradient-text">Getaway</span> Awaits
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                Hotel JD Villa offers a perfect blend of luxury, comfort, and authentic Goan hospitality.
                Located in the heart of Goa, we provide easy access to beaches, markets, and local attractions.
              </p>
              <p className="text-lg text-muted-foreground mb-8">
                Our modern rooms, exceptional service, and competitive pricing make us the ideal choice
                for both leisure and business travelers. Book directly with us for the best rates and exclusive offers.
              </p>
              <Link href="/about">
                <Button variant="primary" size="lg">Learn More About Us</Button>
              </Link>
            </div>
            <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-xl animate-slide-in-right">
              <img
                src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80"
                alt="Hotel Interior"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Rooms Section */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Our Rooms & Suites</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Choose from our range of comfortable and luxurious accommodations,
              each designed to make your stay memorable.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {rooms.map((room, index) => (
              <Card key={room.id} hover className="animate-scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={`https://images.unsplash.com/photo-${room.category === 'Standard' ? '1611892440504-64d4d9e4e3e8' :
                        room.category === 'Deluxe' ? '1618773928121-c32242e63f39' :
                          room.category === 'Balcony' ? '1582719478250-c89cae4dc85b' :
                            '1591088398332-8a5791db843b'
                      }?w=600&q=80`}
                    alt={room.name}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                  />
                  <div className="absolute top-4 right-4 bg-accent text-white px-3 py-1 rounded-full text-sm font-semibold">
                    From {formatCurrency(room.basePrice)}/night
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-2">{room.name}</h3>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                    {room.description}
                  </p>
                  <div className="flex items-center justify-between mb-4 text-sm text-muted-foreground">
                    <span>{room.size}</span>
                    <span className="flex items-center gap-1">
                      <Users size={16} />
                      Up to {room.maxOccupancy}
                    </span>
                  </div>
                  <Link href={`/rooms/${room.id}`}>
                    <Button variant="outline" className="w-full">View Details</Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/rooms">
              <Button variant="primary" size="lg">View All Rooms</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Amenities Section */}
      <section className="py-20 bg-muted">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">World-Class Amenities</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Enjoy a wide range of facilities and services designed for your comfort and convenience.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {amenities.map((amenity, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-2"
              >
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <amenity.icon className="text-accent" size={32} />
                </div>
                <h3 className="font-semibold mb-1">{amenity.title}</h3>
                <p className="text-sm text-muted-foreground">{amenity.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">What Our Guests Say</h2>
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="text-accent" fill="currentColor" size={24} />
                ))}
              </div>
              <span className="text-2xl font-bold">{averageRating}</span>
              <span className="text-muted-foreground">({reviews.length} reviews)</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {reviews.slice(0, 4).map((review, index) => (
              <Card key={review.id} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold">
                      {review.guestName.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-semibold">{review.guestName}</h4>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={14}
                            className={i < review.rating ? 'text-accent fill-accent' : 'text-gray-300'}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-muted-foreground italic">"{review.comment}"</p>
                  {review.response && (
                    <div className="mt-4 p-4 bg-muted rounded-lg">
                      <p className="text-sm font-semibold mb-1">Hotel Response:</p>
                      <p className="text-sm text-muted-foreground">{review.response}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-primary text-white">
        <div className="container-custom text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Book Your Stay?</h2>
          <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
            Book directly with us and enjoy the best rates, exclusive offers, and personalized service.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/book">
              <Button variant="accent" size="lg" className="text-lg px-10">
                Book Now & Save
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" size="lg" className="text-lg px-10 bg-white/10 backdrop-blur-sm border-white text-white hover:bg-white hover:text-primary">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Find Us</h2>
            <p className="text-lg text-muted-foreground">
              Conveniently located in the heart of Goa
            </p>
          </div>
          <div className="rounded-2xl overflow-hidden shadow-xl h-[500px]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3844.5676789!2d73.7519!3d15.5527!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTXCsDMzJzA5LjciTiA3M8KwNDUnMDYuOCJF!5e0!3m2!1sen!2sin!4v1234567890"
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
    </div>
  )
}
