'use client'

import React, { useState } from 'react'
import { X } from 'lucide-react'

export default function GalleryPage() {
    const [selectedImage, setSelectedImage] = useState<number | null>(null)
    const [selectedCategory, setSelectedCategory] = useState('All')

    const categories = ['All', 'Rooms', 'Dining', 'Facilities', 'Exterior', 'Events']

    const images = [
        { id: 1, category: 'Rooms', url: 'photo-1611892440504-64d4d9e4e3e8', title: 'Standard Room' },
        { id: 2, category: 'Rooms', url: 'photo-1618773928121-c32242e63f39', title: 'Deluxe Room' },
        { id: 3, category: 'Rooms', url: 'photo-1582719478250-c89cae4dc85b', title: 'Balcony Room' },
        { id: 4, category: 'Rooms', url: 'photo-1591088398332-8a5791db843b', title: 'Executive Suite' },
        { id: 5, category: 'Rooms', url: 'photo-1590490360182-c33d57733427', title: 'Bathroom' },
        { id: 6, category: 'Rooms', url: 'photo-1595526114035-0d45ed16cfbf', title: 'Room Interior' },

        { id: 7, category: 'Dining', url: 'photo-1414235077428-338989a2e8c0', title: 'Restaurant' },
        { id: 8, category: 'Dining', url: 'photo-1559339352-11d035aa65de', title: 'Breakfast Buffet' },
        { id: 9, category: 'Dining', url: 'photo-1550966871-3ed3cdb5ed0c', title: 'Fine Dining' },
        { id: 10, category: 'Dining', url: 'photo-1551632436-cbf8dd35adfa', title: 'Gourmet Cuisine' },

        { id: 11, category: 'Facilities', url: 'photo-1576013551627-0cc20b96c2a7', title: 'Swimming Pool' },
        { id: 12, category: 'Facilities', url: 'photo-1540555700478-4be289fbecef', title: 'Gym' },
        { id: 13, category: 'Facilities', url: 'photo-1582719508461-905c673771fd', title: 'Lobby' },
        { id: 14, category: 'Facilities', url: 'photo-1571896349842-33c89424de2d', title: 'Reception' },

        { id: 15, category: 'Exterior', url: 'photo-1566073771259-6a8506099945', title: 'Hotel Exterior' },
        { id: 16, category: 'Exterior', url: 'photo-1542314831-068cd1dbfeeb', title: 'Building' },
        { id: 17, category: 'Exterior', url: 'photo-1520250497591-112f2f40a3f4', title: 'Entrance' },
        { id: 18, category: 'Exterior', url: 'photo-1551882547-ff40c63fe5fa', title: 'Garden' },

        { id: 19, category: 'Events', url: 'photo-1519167758481-83f29da8c2b0', title: 'Conference Room' },
        { id: 20, category: 'Events', url: 'photo-1540575467063-178a50c2df87', title: 'Meeting Space' },
        { id: 21, category: 'Events', url: 'photo-1587825140708-dfaf72ae4b04', title: 'Event Hall' },
        { id: 22, category: 'Events', url: 'photo-1464366400600-7168b8af9bc3', title: 'Banquet' },
    ]

    const filteredImages = selectedCategory === 'All'
        ? images
        : images.filter(img => img.category === selectedCategory)

    return (
        <div className="min-h-screen bg-background">
            {/* Hero Section */}
            <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-hero z-10"></div>
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                        backgroundImage: 'url(https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1920&q=80)',
                    }}
                ></div>
                <div className="relative z-20 container-custom text-center text-white">
                    <h1 className="text-5xl md:text-6xl font-bold mb-4 animate-fade-in">
                        Gallery
                    </h1>
                    <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto animate-fade-in" style={{ animationDelay: '0.2s' }}>
                        Explore our beautiful property and facilities
                    </p>
                </div>
            </section>

            {/* Filter Section */}
            <section className="bg-white py-8 shadow-md -mt-16 relative z-30">
                <div className="container-custom">
                    <div className="flex flex-wrap gap-4 justify-center">
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${selectedCategory === category
                                        ? 'bg-primary text-white shadow-md'
                                        : 'bg-muted text-foreground hover:bg-border'
                                    }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Gallery Grid */}
            <section className="py-20">
                <div className="container-custom">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {filteredImages.map((image, index) => (
                            <div
                                key={image.id}
                                onClick={() => setSelectedImage(index)}
                                className="relative aspect-square overflow-hidden rounded-xl cursor-pointer group animate-scale-in"
                                style={{ animationDelay: `${index * 0.05}s` }}
                            >
                                <img
                                    src={`https://images.unsplash.com/${image.url}?w=600&q=80`}
                                    alt={image.title}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <div className="absolute bottom-0 left-0 right-0 p-4">
                                        <h3 className="text-white font-semibold text-lg">{image.title}</h3>
                                        <p className="text-white/80 text-sm">{image.category}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {filteredImages.length === 0 && (
                        <div className="text-center py-20">
                            <p className="text-xl text-muted-foreground">No images found in this category.</p>
                        </div>
                    )}
                </div>
            </section>

            {/* Lightbox */}
            {selectedImage !== null && (
                <div
                    className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 animate-fade-in"
                    onClick={() => setSelectedImage(null)}
                >
                    <button
                        onClick={() => setSelectedImage(null)}
                        className="absolute top-4 right-4 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
                    >
                        <X className="text-white" size={24} />
                    </button>

                    <button
                        onClick={(e) => {
                            e.stopPropagation()
                            setSelectedImage(selectedImage > 0 ? selectedImage - 1 : filteredImages.length - 1)
                        }}
                        className="absolute left-4 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
                    >
                        <span className="text-white text-2xl">‹</span>
                    </button>

                    <button
                        onClick={(e) => {
                            e.stopPropagation()
                            setSelectedImage(selectedImage < filteredImages.length - 1 ? selectedImage + 1 : 0)
                        }}
                        className="absolute right-4 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
                    >
                        <span className="text-white text-2xl">›</span>
                    </button>

                    <div className="max-w-7xl max-h-[90vh] relative" onClick={(e) => e.stopPropagation()}>
                        <img
                            src={`https://images.unsplash.com/${filteredImages[selectedImage].url}?w=1920&q=90`}
                            alt={filteredImages[selectedImage].title}
                            className="max-w-full max-h-[90vh] object-contain rounded-lg"
                        />
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 rounded-b-lg">
                            <h3 className="text-white font-bold text-2xl mb-1">
                                {filteredImages[selectedImage].title}
                            </h3>
                            <p className="text-white/80">{filteredImages[selectedImage].category}</p>
                        </div>
                    </div>

                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/60 text-sm">
                        {selectedImage + 1} / {filteredImages.length}
                    </div>
                </div>
            )}

            {/* CTA Section */}
            <section className="py-20 bg-gradient-primary text-white">
                <div className="container-custom text-center">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Experience This?</h2>
                    <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
                        Book your stay and enjoy all these amazing facilities and more.
                    </p>
                    <a href="/book">
                        <button className="inline-flex items-center justify-center rounded-lg font-medium transition-all duration-300 bg-accent text-white hover:bg-accent-dark shadow-md px-8 py-4 text-lg btn-hover-lift">
                            Book Your Stay Now
                        </button>
                    </a>
                </div>
            </section>
        </div>
    )
}
