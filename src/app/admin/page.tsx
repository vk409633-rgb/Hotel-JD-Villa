'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Card, CardHeader, CardContent } from '@/components/ui/Card'
import { useHotelStore } from '@/store/hotelStore'
import { formatCurrency, formatDate } from '@/lib/utils'
import {
    LayoutDashboard,
    Calendar,
    Users,
    DollarSign,
    Bed,
    Tag,
    Star,
    TrendingUp,
    CheckCircle,
    XCircle,
    Clock
} from 'lucide-react'
import { format } from 'date-fns'

export default function AdminPage() {
    const { bookings, rooms, guests, promoCodes, reviews } = useHotelStore()
    const [activeTab, setActiveTab] = useState('dashboard')

    // Calculate analytics
    const totalBookings = bookings.length
    const confirmedBookings = bookings.filter(b => b.status === 'Confirmed').length
    const totalRevenue = bookings
        .filter(b => b.paymentStatus === 'Paid')
        .reduce((sum, b) => sum + b.totalPrice, 0)
    const directBookings = bookings.filter(b => b.source === 'Direct').length
    const otaBookings = bookings.filter(b => b.source !== 'Direct').length
    const averageRating = reviews.length > 0
        ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
        : '5.0'

    const tabs = [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { id: 'bookings', label: 'Bookings', icon: Calendar },
        { id: 'rooms', label: 'Rooms', icon: Bed },
        { id: 'guests', label: 'Guests', icon: Users },
        { id: 'pricing', label: 'Pricing', icon: DollarSign },
        { id: 'promos', label: 'Promo Codes', icon: Tag },
        { id: 'reviews', label: 'Reviews', icon: Star },
    ]

    return (
        <div className="min-h-screen bg-muted">
            <div className="bg-primary text-white py-8">
                <div className="container-custom">
                    <h1 className="text-4xl font-bold mb-2">Admin Dashboard</h1>
                    <p className="text-white/80">Manage your hotel operations</p>
                </div>
            </div>

            <div className="container-custom py-8">
                {/* Tabs */}
                <div className="bg-white rounded-xl shadow-md mb-8 overflow-x-auto">
                    <div className="flex border-b border-border">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center gap-2 px-6 py-4 font-medium transition-colors whitespace-nowrap ${activeTab === tab.id
                                        ? 'text-primary border-b-2 border-primary'
                                        : 'text-muted-foreground hover:text-foreground'
                                    }`}
                            >
                                <tab.icon size={20} />
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Dashboard Tab */}
                {activeTab === 'dashboard' && (
                    <div className="space-y-8 animate-fade-in">
                        {/* Stats Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            <Card>
                                <CardContent className="p-6">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                                            <Calendar className="text-primary" size={24} />
                                        </div>
                                        <TrendingUp className="text-success" size={20} />
                                    </div>
                                    <h3 className="text-3xl font-bold mb-1">{totalBookings}</h3>
                                    <p className="text-sm text-muted-foreground">Total Bookings</p>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardContent className="p-6">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center">
                                            <DollarSign className="text-success" size={24} />
                                        </div>
                                        <TrendingUp className="text-success" size={20} />
                                    </div>
                                    <h3 className="text-3xl font-bold mb-1">{formatCurrency(totalRevenue)}</h3>
                                    <p className="text-sm text-muted-foreground">Total Revenue</p>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardContent className="p-6">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                                            <Users className="text-accent" size={24} />
                                        </div>
                                    </div>
                                    <h3 className="text-3xl font-bold mb-1">{guests.length}</h3>
                                    <p className="text-sm text-muted-foreground">Total Guests</p>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardContent className="p-6">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="w-12 h-12 bg-warning/10 rounded-lg flex items-center justify-center">
                                            <Star className="text-warning" size={24} />
                                        </div>
                                    </div>
                                    <h3 className="text-3xl font-bold mb-1">{averageRating}★</h3>
                                    <p className="text-sm text-muted-foreground">Average Rating</p>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Booking Sources */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <Card>
                                <CardHeader>
                                    <h3 className="text-xl font-bold">Booking Sources</h3>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        <div>
                                            <div className="flex justify-between mb-2">
                                                <span className="font-medium">Direct Bookings</span>
                                                <span className="font-bold text-primary">{directBookings}</span>
                                            </div>
                                            <div className="h-3 bg-muted rounded-full overflow-hidden">
                                                <div
                                                    className="h-full bg-primary"
                                                    style={{ width: `${(directBookings / totalBookings) * 100}%` }}
                                                ></div>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="flex justify-between mb-2">
                                                <span className="font-medium">OTA Bookings</span>
                                                <span className="font-bold text-accent">{otaBookings}</span>
                                            </div>
                                            <div className="h-3 bg-muted rounded-full overflow-hidden">
                                                <div
                                                    className="h-full bg-accent"
                                                    style={{ width: `${(otaBookings / totalBookings) * 100}%` }}
                                                ></div>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <h3 className="text-xl font-bold">Room Inventory</h3>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-3">
                                        {rooms.map((room) => (
                                            <div key={room.id} className="flex justify-between items-center p-3 bg-muted rounded-lg">
                                                <div>
                                                    <p className="font-medium">{room.name}</p>
                                                    <p className="text-sm text-muted-foreground">{room.category}</p>
                                                </div>
                                                <div className="text-right">
                                                    <p className="font-bold text-primary">{formatCurrency(room.basePrice)}</p>
                                                    <p className="text-xs text-muted-foreground">per night</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                )}

                {/* Bookings Tab */}
                {activeTab === 'bookings' && (
                    <div className="space-y-6 animate-fade-in">
                        <Card>
                            <CardHeader>
                                <div className="flex justify-between items-center">
                                    <h3 className="text-2xl font-bold">All Bookings</h3>
                                    <div className="flex gap-2">
                                        <Button variant="outline" size="sm">Filter</Button>
                                        <Button variant="primary" size="sm">New Booking</Button>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead>
                                            <tr className="border-b border-border">
                                                <th className="text-left py-3 px-4 font-semibold">Booking ID</th>
                                                <th className="text-left py-3 px-4 font-semibold">Guest</th>
                                                <th className="text-left py-3 px-4 font-semibold">Room</th>
                                                <th className="text-left py-3 px-4 font-semibold">Check-in</th>
                                                <th className="text-left py-3 px-4 font-semibold">Check-out</th>
                                                <th className="text-left py-3 px-4 font-semibold">Amount</th>
                                                <th className="text-left py-3 px-4 font-semibold">Status</th>
                                                <th className="text-left py-3 px-4 font-semibold">Source</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {bookings.map((booking) => {
                                                const room = rooms.find(r => r.id === booking.roomId)
                                                return (
                                                    <tr key={booking.id} className="border-b border-border hover:bg-muted/50">
                                                        <td className="py-3 px-4 font-mono text-sm">{booking.id}</td>
                                                        <td className="py-3 px-4">
                                                            <div>
                                                                <p className="font-medium">{booking.guestName}</p>
                                                                <p className="text-sm text-muted-foreground">{booking.guestEmail}</p>
                                                            </div>
                                                        </td>
                                                        <td className="py-3 px-4">{room?.name}</td>
                                                        <td className="py-3 px-4">{format(new Date(booking.checkIn), 'MMM dd, yyyy')}</td>
                                                        <td className="py-3 px-4">{format(new Date(booking.checkOut), 'MMM dd, yyyy')}</td>
                                                        <td className="py-3 px-4 font-semibold">{formatCurrency(booking.totalPrice)}</td>
                                                        <td className="py-3 px-4">
                                                            <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${booking.status === 'Confirmed' ? 'bg-success/10 text-success' :
                                                                    booking.status === 'Cancelled' ? 'bg-error/10 text-error' :
                                                                        'bg-warning/10 text-warning'
                                                                }`}>
                                                                {booking.status === 'Confirmed' && <CheckCircle size={12} />}
                                                                {booking.status === 'Cancelled' && <XCircle size={12} />}
                                                                {booking.status}
                                                            </span>
                                                        </td>
                                                        <td className="py-3 px-4">
                                                            <span className={`px-2 py-1 rounded text-xs font-medium ${booking.source === 'Direct' ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'
                                                                }`}>
                                                                {booking.source}
                                                            </span>
                                                        </td>
                                                    </tr>
                                                )
                                            })}
                                        </tbody>
                                    </table>
                                    {bookings.length === 0 && (
                                        <div className="text-center py-12 text-muted-foreground">
                                            No bookings yet. Create your first booking to get started.
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                )}

                {/* Guests Tab */}
                {activeTab === 'guests' && (
                    <div className="space-y-6 animate-fade-in">
                        <Card>
                            <CardHeader>
                                <h3 className="text-2xl font-bold">Guest Database</h3>
                            </CardHeader>
                            <CardContent>
                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead>
                                            <tr className="border-b border-border">
                                                <th className="text-left py-3 px-4 font-semibold">Name</th>
                                                <th className="text-left py-3 px-4 font-semibold">Email</th>
                                                <th className="text-left py-3 px-4 font-semibold">Phone</th>
                                                <th className="text-left py-3 px-4 font-semibold">Total Bookings</th>
                                                <th className="text-left py-3 px-4 font-semibold">Joined</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {guests.map((guest) => (
                                                <tr key={guest.id} className="border-b border-border hover:bg-muted/50">
                                                    <td className="py-3 px-4 font-medium">{guest.name}</td>
                                                    <td className="py-3 px-4 text-muted-foreground">{guest.email}</td>
                                                    <td className="py-3 px-4 text-muted-foreground">{guest.phone}</td>
                                                    <td className="py-3 px-4">{guest.bookingHistory.length}</td>
                                                    <td className="py-3 px-4 text-muted-foreground">
                                                        {format(new Date(guest.createdAt), 'MMM dd, yyyy')}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                    {guests.length === 0 && (
                                        <div className="text-center py-12 text-muted-foreground">
                                            No guests registered yet.
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                )}

                {/* Promo Codes Tab */}
                {activeTab === 'promos' && (
                    <div className="space-y-6 animate-fade-in">
                        <Card>
                            <CardHeader>
                                <div className="flex justify-between items-center">
                                    <h3 className="text-2xl font-bold">Promo Codes</h3>
                                    <Button variant="primary" size="sm">Create New Promo</Button>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {promoCodes.map((promo) => (
                                        <div
                                            key={promo.id}
                                            className={`p-6 rounded-xl border-2 ${promo.active ? 'border-primary bg-primary/5' : 'border-border bg-muted'
                                                }`}
                                        >
                                            <div className="flex justify-between items-start mb-4">
                                                <div className="px-3 py-1 bg-accent text-white rounded-lg font-bold text-lg">
                                                    {promo.code}
                                                </div>
                                                <span className={`px-2 py-1 rounded text-xs font-medium ${promo.active ? 'bg-success/10 text-success' : 'bg-error/10 text-error'
                                                    }`}>
                                                    {promo.active ? 'Active' : 'Inactive'}
                                                </span>
                                            </div>
                                            <div className="space-y-2 text-sm">
                                                <div className="flex justify-between">
                                                    <span className="text-muted-foreground">Discount</span>
                                                    <span className="font-semibold">
                                                        {promo.discountType === 'Percentage'
                                                            ? `${promo.discountValue}%`
                                                            : formatCurrency(promo.discountValue)}
                                                    </span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-muted-foreground">Used</span>
                                                    <span className="font-semibold">
                                                        {promo.usedCount} / {promo.maxUses || '∞'}
                                                    </span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-muted-foreground">Valid Until</span>
                                                    <span className="font-semibold">
                                                        {format(new Date(promo.validTo), 'MMM dd, yyyy')}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                )}

                {/* Reviews Tab */}
                {activeTab === 'reviews' && (
                    <div className="space-y-6 animate-fade-in">
                        <Card>
                            <CardHeader>
                                <div className="flex justify-between items-center">
                                    <div>
                                        <h3 className="text-2xl font-bold mb-2">Guest Reviews</h3>
                                        <div className="flex items-center gap-2">
                                            <div className="flex">
                                                {[1, 2, 3, 4, 5].map((star) => (
                                                    <Star key={star} className="text-accent" fill="currentColor" size={20} />
                                                ))}
                                            </div>
                                            <span className="text-xl font-bold">{averageRating}</span>
                                            <span className="text-muted-foreground">({reviews.length} reviews)</span>
                                        </div>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {reviews.map((review) => (
                                        <div key={review.id} className="p-6 bg-muted rounded-xl">
                                            <div className="flex justify-between items-start mb-4">
                                                <div>
                                                    <h4 className="font-semibold text-lg">{review.guestName}</h4>
                                                    <div className="flex items-center gap-2 mt-1">
                                                        <div className="flex">
                                                            {[...Array(5)].map((_, i) => (
                                                                <Star
                                                                    key={i}
                                                                    size={16}
                                                                    className={i < review.rating ? 'text-accent fill-accent' : 'text-gray-300'}
                                                                />
                                                            ))}
                                                        </div>
                                                        <span className="text-sm text-muted-foreground">
                                                            {format(new Date(review.date), 'MMM dd, yyyy')}
                                                        </span>
                                                    </div>
                                                </div>
                                                <span className="px-2 py-1 bg-white rounded text-xs font-medium">
                                                    {review.source}
                                                </span>
                                            </div>
                                            <p className="text-muted-foreground mb-4">"{review.comment}"</p>
                                            {review.response ? (
                                                <div className="p-4 bg-white rounded-lg">
                                                    <p className="text-sm font-semibold mb-1">Your Response:</p>
                                                    <p className="text-sm text-muted-foreground">{review.response}</p>
                                                </div>
                                            ) : (
                                                <Button variant="outline" size="sm">Respond to Review</Button>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                )}
            </div>
        </div>
    )
}
