import React from 'react'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'
import { Award, Users, Heart, Shield, Star, Clock } from 'lucide-react'

export default function AboutPage() {
    const values = [
        {
            icon: Heart,
            title: 'Hospitality First',
            description: 'We treat every guest like family, ensuring a warm and welcoming experience.'
        },
        {
            icon: Award,
            title: 'Excellence',
            description: 'Committed to maintaining the highest standards in service and accommodation.'
        },
        {
            icon: Shield,
            title: 'Trust & Safety',
            description: '24/7 security and safety measures for complete peace of mind.'
        },
        {
            icon: Star,
            title: 'Quality Service',
            description: 'Dedicated staff ensuring your comfort and satisfaction at all times.'
        }
    ]

    const team = [
        { name: 'Rajesh Patel', role: 'General Manager', image: '1472099645785-5658abf4ff4e' },
        { name: 'Priya Sharma', role: 'Front Desk Manager', image: '1580489944761-15a19d654956' },
        { name: 'Amit Kumar', role: 'Chef', image: '1577219491135-ce391730fb2c' },
        { name: 'Sneha Desai', role: 'Housekeeping Manager', image: '1573497019940-1c28c88b4f3e' }
    ]

    return (
        <div className="min-h-screen bg-background">
            {/* Hero Section */}
            <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-hero z-10"></div>
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                        backgroundImage: 'url(https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1920&q=80)',
                    }}
                ></div>
                <div className="relative z-20 container-custom text-center text-white">
                    <h1 className="text-5xl md:text-6xl font-bold mb-4 animate-fade-in">
                        About Hotel JD Villa
                    </h1>
                    <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto animate-fade-in" style={{ animationDelay: '0.2s' }}>
                        Your trusted partner for memorable stays in Goa
                    </p>
                </div>
            </section>

            {/* Story Section */}
            <section className="py-20 bg-white">
                <div className="container-custom">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div className="animate-slide-in-left">
                            <h2 className="text-4xl md:text-5xl font-bold mb-6">
                                Our <span className="gradient-text">Story</span>
                            </h2>
                            <div className="space-y-4 text-lg text-muted-foreground">
                                <p>
                                    Founded in 2015, Hotel JD Villa has been a beacon of hospitality in the heart of Goa.
                                    What started as a small family-run establishment has grown into one of the most trusted
                                    names in Goan hospitality.
                                </p>
                                <p>
                                    Our journey has been driven by a simple philosophy: treat every guest like family.
                                    This commitment to personalized service and genuine care has earned us countless
                                    loyal guests who return year after year.
                                </p>
                                <p>
                                    Today, we continue to blend traditional Goan warmth with modern amenities, creating
                                    a unique experience that captures the essence of this beautiful coastal paradise.
                                </p>
                            </div>
                            <div className="mt-8 flex gap-8">
                                <div>
                                    <p className="text-4xl font-bold text-primary">10+</p>
                                    <p className="text-muted-foreground">Years of Service</p>
                                </div>
                                <div>
                                    <p className="text-4xl font-bold text-primary">5000+</p>
                                    <p className="text-muted-foreground">Happy Guests</p>
                                </div>
                                <div>
                                    <p className="text-4xl font-bold text-primary">4.8★</p>
                                    <p className="text-muted-foreground">Average Rating</p>
                                </div>
                            </div>
                        </div>
                        <div className="relative h-[600px] rounded-2xl overflow-hidden shadow-xl animate-slide-in-right">
                            <img
                                src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&q=80"
                                alt="Hotel Building"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="py-20 bg-muted">
                <div className="container-custom">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl md:text-5xl font-bold mb-4">Our Values</h2>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            The principles that guide everything we do
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {values.map((value, index) => (
                            <div
                                key={index}
                                className="bg-white p-8 rounded-xl text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-2 animate-scale-in"
                                style={{ animationDelay: `${index * 0.1}s` }}
                            >
                                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <value.icon className="text-accent" size={32} />
                                </div>
                                <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                                <p className="text-muted-foreground">{value.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className="py-20 bg-white">
                <div className="container-custom">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl md:text-5xl font-bold mb-4">Meet Our Team</h2>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            Dedicated professionals committed to making your stay exceptional
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {team.map((member, index) => (
                            <div
                                key={index}
                                className="text-center animate-fade-in"
                                style={{ animationDelay: `${index * 0.1}s` }}
                            >
                                <div className="relative w-48 h-48 mx-auto mb-4 rounded-full overflow-hidden shadow-lg">
                                    <img
                                        src={`https://images.unsplash.com/photo-${member.image}?w=400&q=80`}
                                        alt={member.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                                <p className="text-muted-foreground">{member.role}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why Choose Us */}
            <section className="py-20 bg-muted">
                <div className="container-custom">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl md:text-5xl font-bold mb-4">Why Choose Us?</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        <div className="bg-white p-8 rounded-xl">
                            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                                <Clock className="text-primary" size={24} />
                            </div>
                            <h3 className="text-xl font-bold mb-3">24/7 Service</h3>
                            <p className="text-muted-foreground">
                                Our team is always available to assist you, any time of day or night.
                            </p>
                        </div>

                        <div className="bg-white p-8 rounded-xl">
                            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                                <Star className="text-primary" size={24} />
                            </div>
                            <h3 className="text-xl font-bold mb-3">Best Rates</h3>
                            <p className="text-muted-foreground">
                                Book directly with us for guaranteed best prices and exclusive offers.
                            </p>
                        </div>

                        <div className="bg-white p-8 rounded-xl">
                            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                                <Users className="text-primary" size={24} />
                            </div>
                            <h3 className="text-xl font-bold mb-3">Personalized Care</h3>
                            <p className="text-muted-foreground">
                                Every guest receives individual attention and customized service.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-gradient-primary text-white">
                <div className="container-custom text-center">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">Experience the JD Villa Difference</h2>
                    <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
                        Join thousands of satisfied guests who have made us their home in Goa.
                    </p>
                    <Link href="/book">
                        <Button variant="accent" size="lg" className="text-lg px-10">
                            Book Your Stay Today
                        </Button>
                    </Link>
                </div>
            </section>
        </div>
    )
}
