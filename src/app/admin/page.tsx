'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Card, CardHeader, CardContent } from '@/components/ui/Card'
import { useHotelStore } from '@/store/hotelStore'
import { formatCurrency } from '@/lib/utils'
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
    ArrowUpRight,
    ArrowDownRight,
    BarChart3,
    PieChart
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
    const directPercentage = totalBookings > 0 ? ((directBookings / totalBookings) * 100).toFixed(0) : 0

    const tabs = [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { id: 'bookings', label: 'Bookings', icon: Calendar },
        { id: 'rooms', label: 'Rooms', icon: Bed },
        { id: 'guests', label: 'Guests', icon: Users },
        { id: 'promos', label: 'Promotions', icon: Tag },
        { id: 'reviews', label: 'Reviews', icon: Star },
    ]

    return (
        <div className="min-h-screen bg-gradient-to-br from-muted via-white to-muted">
            {/* Header */}
            <div className="bg-gradient-primary text-white">
                <div className="container-custom section-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-4xl font-bold mb-2">Admin Dashboard</h1>
                            <p className="text-white/80 text-lg">Manage your hotel operations efficiently</p>
                        </div>
                        <div className="bg-white/10 backdrop-blur-sm px-6 py-3 rounded-xl">
                            <p className="text-sm text-white/80">Today's Date</p>
                            <p className="text-lg font-semibold">{format(new Date(), 'MMM dd, yyyy')}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container-custom section-sm">
                {/* Tabs */}
                <div className="bg-white rounded-2xl shadow-lg mb-8 overflow-hidden">
                    <div className="flex overflow-x-auto">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center gap-3 px-8 py-5 font-semibold transition-all whitespace-nowrap border-b-4 ${activeTab === tab.id
                                    ? 'text-primary border-primary bg-primary/5'
                                    : 'text-muted-foreground border-transparent hover:text-foreground hover:bg-muted/50'
                                    }`}
                            >
                                <tab.icon size={22} />
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
                            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                                <CardContent className="p-6">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center">
                                            <Calendar className="text-primary" size={28} />
                                        </div>
                                        <div className="flex items-center gap-1 text-success text-sm font-semibold">
                                            <ArrowUpRight size={16} />
                                            12%
                                        </div>
                                    </div>
                                    <h3 className="text-4xl font-bold mb-2">{totalBookings}</h3>
                                    <p className="text-sm text-muted-foreground font-medium">Total Bookings</p>
                                    <p className="text-xs text-muted-foreground mt-2">{confirmedBookings} confirmed</p>
                                </CardContent>
                            </Card>

                            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                                <CardContent className="p-6">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="w-14 h-14 bg-success/10 rounded-2xl flex items-center justify-center">
                                            <DollarSign className="text-success" size={28} />
                                        </div>
                                        <div className="flex items-center gap-1 text-success text-sm font-semibold">
                                            <ArrowUpRight size={16} />
                                            8%
                                        </div>
                                    </div>
                                    <h3 className="text-4xl font-bold mb-2">{formatCurrency(totalRevenue)}</h3>
                                    <p className="text-sm text-muted-foreground font-medium">Total Revenue</p>
                                    <p className="text-xs text-muted-foreground mt-2">This month</p>
                                </CardContent>
                            </Card>

                            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                                <CardContent className="p-6">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="w-14 h-14 bg-accent/10 rounded-2xl flex items-center justify-center">
                                            <Users className="text-accent" size={28} />
                                        </div>
                                        <div className="flex items-center gap-1 text-success text-sm font-semibold">
                                            <ArrowUpRight size={16} />
                                            5%
                                        </div>
                                    </div>
                                    <h3 className="text-4xl font-bold mb-2">{guests.length}</h3>
                                    <p className="text-sm text-muted-foreground font-medium">Total Guests</p>
                                    <p className="text-xs text-muted-foreground mt-2">Registered users</p>
                                </CardContent>
                            </Card>

                            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                                <CardContent className="p-6">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="w-14 h-14 bg-warning/10 rounded-2xl flex items-center justify-center">
                                            <Star className="text-warning" size={28} />
                                        </div>
                                        <div className="flex items-center gap-1 text-success text-sm font-semibold">
                                            <ArrowUpRight size={16} />
                                            0.2
                                        </div>
                                    </div>
                                    <h3 className="text-4xl font-bold mb-2">{averageRating}★</h3>
                                    <p className="text-sm text-muted-foreground font-medium">Average Rating</p>
                                    <p className="text-xs text-muted-foreground mt-2">{reviews.length} reviews</p>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Charts Row */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <Card className="border-0 shadow-lg">
                                <CardHeader className="border-b bg-gradient-to-r from-primary/5 to-accent/5">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                                                <PieChart className="text-primary" size={20} />
                                            </div>
                                            <h3 className="text-xl font-bold">Booking Sources</h3>
                                        </div>
                                        <span className="text-sm text-muted-foreground">{totalBookings} total</span>
                                    </div>
                                </CardHeader>
                                <CardContent className="p-6">
                                    <div className="space-y-6">
                                        <div>
                                            <div className="flex justify-between mb-3">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-3 h-3 bg-primary rounded-full"></div>
                                                    <span className="font-semibold">Direct Bookings</span>
                                                </div>
                                                <div className="text-right">
                                                    <span className="font-bold text-primary text-lg">{directBookings}</span>
                                                    <span className="text-sm text-muted-foreground ml-2">({directPercentage}%)</span>
                                                </div>
                                            </div>
                                            <div className="h-4 bg-muted rounded-full overflow-hidden">
                                                <div
                                                    className="h-full bg-gradient-to-r from-primary to-primary-light rounded-full transition-all duration-500"
                                                    style={{ width: `${directPercentage}%` }}
                                                ></div>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="flex justify-between mb-3">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-3 h-3 bg-accent rounded-full"></div>
                                                    <span className="font-semibold">OTA Bookings</span>
                                                </div>
                                                <div className="text-right">
                                                    <span className="font-bold text-accent text-lg">{otaBookings}</span>
                                                    <span className="text-sm text-muted-foreground ml-2">({100 - Number(directPercentage)}%)</span>
                                                </div>
                                            </div>
                                            <div className="h-4 bg-muted rounded-full overflow-hidden">
                                                <div
                                                    className="h-full bg-gradient-to-r from-accent to-accent-light rounded-full transition-all duration-500"
                                                    style={{ width: `${100 - Number(directPercentage)}%` }}
                                                ></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-6 pt-6 border-t border-border">
                                        <p className="text-sm text-muted-foreground text-center">
                                            Direct bookings save commission fees and increase profit margins
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="border-0 shadow-lg">
                                <CardHeader className="border-b bg-gradient-to-r from-primary/5 to-accent/5">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                                                <BarChart3 className="text-primary" size={20} />
                                            </div>
                                            <h3 className="text-xl font-bold">Room Inventory</h3>
                                        </div>
                                        <span className="text-sm text-muted-foreground">{rooms.length} rooms</span>
                                    </div>
                                </CardHeader>
                                <CardContent className="p-6">
                                    <div className="space-y-4">
                                        {rooms.map((room) => (
                                            <div key={room.id} className="flex items-center justify-between p-4 bg-gradient-to-r from-muted/50 to-transparent rounded-xl hover:from-muted transition-all">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                                                        <Bed className="text-primary" size={20} />
                                                    </div>
                                                    <div>
                                                        <p className="font-semibold text-lg">{room.name}</p>
                                                        <p className="text-sm text-muted-foreground">{room.category} • {room.size}</p>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <p className="font-bold text-primary text-xl">{formatCurrency(room.basePrice)}</p>
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
                        <Card className="border-0 shadow-lg">
                            <CardHeader className="border-b bg-gradient-to-r from-primary/5 to-accent/5">
                                <div className="flex justify-between items-center">
                                    <h3 className="text-2xl font-bold">All Bookings</h3>
                                    <div className="flex gap-3">
                                        <Button variant="outline" size="sm">
                                            <Calendar size={16} className="mr-2" />
                                            Filter
                                        </Button>
                                        <Button variant="primary" size="sm">+ New Booking</Button>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="p-0">
                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead className="bg-muted/50">
                                            <tr>
                                                <th className="text-left py-4 px-6 font-semibold text-sm">Booking ID</th>
                                                <th className="text-left py-4 px-6 font-semibold text-sm">Guest</th>
                                                <th className="text-left py-4 px-6 font-semibold text-sm">Room</th>
                                                <th className="text-left py-4 px-6 font-semibold text-sm">Dates</th>
                                                <th className="text-left py-4 px-6 font-semibold text-sm">Amount</th>
                                                <th className="text-left py-4 px-6 font-semibold text-sm">Status</th>
                                                <th className="text-left py-4 px-6 font-semibold text-sm">Source</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {bookings.map((booking, idx) => {
                                                const room = rooms.find(r => r.id === booking.roomId)
                                                return (
                                                    <tr key={booking.id} className={`border-b border-border hover:bg-muted/30 transition-colors ${idx % 2 === 0 ? 'bg-white' : 'bg-muted/10'}`}>
                                                        <td className="py-4 px-6">
                                                            <span className="font-mono text-sm font-semibold text-primary">{booking.id}</span>
                                                        </td>
                                                        <td className="py-4 px-6">
                                                            <div>
                                                                <p className="font-semibold">{booking.guestName}</p>
                                                                <p className="text-sm text-muted-foreground">{booking.guestEmail}</p>
                                                            </div>
                                                        </td>
                                                        <td className="py-4 px-6">
                                                            <span className="font-medium">{room?.name}</span>
                                                        </td>
                                                        <td className="py-4 px-6">
                                                            <div className="text-sm">
                                                                <p className="font-medium">{format(new Date(booking.checkIn), 'MMM dd')}</p>
                                                                <p className="text-muted-foreground">{format(new Date(booking.checkOut), 'MMM dd, yyyy')}</p>
                                                            </div>
                                                        </td>
                                                        <td className="py-4 px-6">
                                                            <span className="font-bold text-lg">{formatCurrency(booking.totalPrice)}</span>
                                                        </td>
                                                        <td className="py-4 px-6">
                                                            <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold ${booking.status === 'Confirmed' ? 'bg-success/10 text-success' :
                                                                booking.status === 'Cancelled' ? 'bg-error/10 text-error' :
                                                                    'bg-warning/10 text-warning'
                                                                }`}>
                                                                {booking.status === 'Confirmed' && <CheckCircle size={14} />}
                                                                {booking.status === 'Cancelled' && <XCircle size={14} />}
                                                                {booking.status}
                                                            </span>
                                                        </td>
                                                        <td className="py-4 px-6">
                                                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${booking.source === 'Direct' ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'
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
                                        <div className="text-center py-16">
                                            <Calendar className="mx-auto text-muted-foreground mb-4" size={48} />
                                            <p className="text-lg text-muted-foreground">No bookings yet</p>
                                            <p className="text-sm text-muted-foreground mt-2">Create your first booking to get started</p>
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
                        <Card className="border-0 shadow-lg">
                            <CardHeader className="border-b bg-gradient-to-r from-primary/5 to-accent/5">
                                <h3 className="text-2xl font-bold">Guest Database</h3>
                            </CardHeader>
                            <CardContent className="p-0">
                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead className="bg-muted/50">
                                            <tr>
                                                <th className="text-left py-4 px-6 font-semibold text-sm">Name</th>
                                                <th className="text-left py-4 px-6 font-semibold text-sm">Email</th>
                                                <th className="text-left py-4 px-6 font-semibold text-sm">Phone</th>
                                                <th className="text-left py-4 px-6 font-semibold text-sm">Bookings</th>
                                                <th className="text-left py-4 px-6 font-semibold text-sm">Joined</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {guests.map((guest, idx) => (
                                                <tr key={guest.id} className={`border-b border-border hover:bg-muted/30 transition-colors ${idx % 2 === 0 ? 'bg-white' : 'bg-muted/10'}`}>
                                                    <td className="py-4 px-6 font-semibold">{guest.name}</td>
                                                    <td className="py-4 px-6 text-muted-foreground">{guest.email}</td>
                                                    <td className="py-4 px-6 text-muted-foreground">{guest.phone}</td>
                                                    <td className="py-4 px-6">
                                                        <span className="inline-flex items-center justify-center w-8 h-8 bg-primary/10 text-primary rounded-full font-bold text-sm">
                                                            {guest.bookingHistory.length}
                                                        </span>
                                                    </td>
                                                    <td className="py-4 px-6 text-muted-foreground">
                                                        {format(new Date(guest.createdAt), 'MMM dd, yyyy')}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                    {guests.length === 0 && (
                                        <div className="text-center py-16">
                                            <Users className="mx-auto text-muted-foreground mb-4" size={48} />
                                            <p className="text-lg text-muted-foreground">No guests registered yet</p>
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
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold">Promotional Codes</h2>
                            <Button variant="primary" size="sm">+ Create New Promo</Button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {promoCodes.map((promo) => (
                                <Card
                                    key={promo.id}
                                    className={`border-0 shadow-lg hover:shadow-xl transition-all duration-300 ${promo.active ? 'ring-2 ring-primary' : 'opacity-60'
                                        }`}
                                >
                                    <CardContent className="p-6">
                                        <div className="flex justify-between items-start mb-4">
                                            <div className="px-4 py-2 bg-gradient-to-r from-accent to-accent-light text-white rounded-lg font-bold text-xl">
                                                {promo.code}
                                            </div>
                                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${promo.active ? 'bg-success/10 text-success' : 'bg-error/10 text-error'
                                                }`}>
                                                {promo.active ? 'Active' : 'Inactive'}
                                            </span>
                                        </div>
                                        <div className="space-y-3 text-sm">
                                            <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                                                <span className="text-muted-foreground">Discount</span>
                                                <span className="font-bold text-lg text-primary">
                                                    {promo.discountType === 'Percentage'
                                                        ? `${promo.discountValue}%`
                                                        : formatCurrency(promo.discountValue)}
                                                </span>
                                            </div>
                                            <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                                                <span className="text-muted-foreground">Used</span>
                                                <span className="font-semibold">
                                                    {promo.usedCount} / {promo.maxUses || '∞'}
                                                </span>
                                            </div>
                                            <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                                                <span className="text-muted-foreground">Valid Until</span>
                                                <span className="font-semibold">
                                                    {format(new Date(promo.validTo), 'MMM dd, yyyy')}
                                                </span>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                )}

                {/* Reviews Tab */}
                {activeTab === 'reviews' && (
                    <div className="space-y-6 animate-fade-in">
                        <Card className="border-0 shadow-lg">
                            <CardHeader className="border-b bg-gradient-to-r from-primary/5 to-accent/5">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <h3 className="text-2xl font-bold mb-2">Guest Reviews</h3>
                                        <div className="flex items-center gap-3">
                                            <div className="flex">
                                                {[1, 2, 3, 4, 5].map((star) => (
                                                    <Star key={star} className="text-accent" fill="currentColor" size={20} />
                                                ))}
                                            </div>
                                            <span className="text-2xl font-bold">{averageRating}</span>
                                            <span className="text-muted-foreground">({reviews.length} reviews)</span>
                                        </div>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="p-6">
                                <div className="space-y-4">
                                    {reviews.map((review) => (
                                        <div key={review.id} className="p-6 bg-gradient-to-r from-muted/50 to-transparent rounded-xl border border-border hover:shadow-md transition-all">
                                            <div className="flex justify-between items-start mb-4">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold text-lg">
                                                        {review.guestName.charAt(0)}
                                                    </div>
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
                                                </div>
                                                <span className="px-3 py-1 bg-white rounded-lg text-xs font-semibold border border-border">
                                                    {review.source}
                                                </span>
                                            </div>
                                            <p className="text-muted-foreground mb-4 italic">"{review.comment}"</p>
                                            {review.response ? (
                                                <div className="p-4 bg-white rounded-lg border border-border">
                                                    <p className="text-sm font-semibold mb-1 text-primary">Your Response:</p>
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
