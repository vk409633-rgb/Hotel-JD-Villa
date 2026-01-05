'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/Button'
import { Card, CardHeader, CardContent } from '@/components/ui/Card'
import { useHotelStore } from '@/store/hotelStore'
import { formatCurrency, formatDate } from '@/lib/utils'
import { Calendar, Users, Tag, CreditCard, CheckCircle, ArrowRight, ArrowLeft, Bed, Clock } from 'lucide-react'
import { format, differenceInDays, addDays } from 'date-fns'

export default function BookingPage() {
    const router = useRouter()
    const { rooms, getAvailableRooms, calculateBookingPrice, addBooking, addGuest, promoCodes, updatePromoCode } = useHotelStore()

    const [step, setStep] = useState(1)
    const [checkIn, setCheckIn] = useState('')
    const [checkOut, setCheckOut] = useState('')
    const [guests, setGuests] = useState(2)
    const [selectedRoom, setSelectedRoom] = useState<string | null>(null)
    const [promoCode, setPromoCode] = useState('')
    const [promoApplied, setPromoApplied] = useState(false)
    const [guestDetails, setGuestDetails] = useState({
        name: '',
        email: '',
        phone: '',
        specialRequests: ''
    })

    const availableRooms = checkIn && checkOut
        ? getAvailableRooms(new Date(checkIn), new Date(checkOut))
        : []

    const selectedRoomData = rooms.find(r => r.id === selectedRoom)
    const nights = checkIn && checkOut ? differenceInDays(new Date(checkOut), new Date(checkIn)) : 0
    const totalPrice = selectedRoom && checkIn && checkOut
        ? calculateBookingPrice(selectedRoom, new Date(checkIn), new Date(checkOut), promoApplied ? promoCode : undefined)
        : 0

    const handleApplyPromo = () => {
        const promo = promoCodes.find(
            p => p.code === promoCode && p.active &&
                new Date() >= new Date(p.validFrom) &&
                new Date() <= new Date(p.validTo) &&
                (!p.minBookingAmount || totalPrice >= p.minBookingAmount) &&
                (!p.maxUses || p.usedCount < p.maxUses)
        )

        if (promo) {
            setPromoApplied(true)
            alert(`✓ Promo code applied! You save ${promo.discountType === 'Percentage' ? promo.discountValue + '%' : formatCurrency(promo.discountValue)}`)
        } else {
            alert('Invalid or expired promo code')
        }
    }

    const handleBooking = () => {
        if (!selectedRoom || !checkIn || !checkOut) return

        const bookingId = `BK${Date.now()}`
        const guestId = `G${Date.now()}`

        addGuest({
            id: guestId,
            name: guestDetails.name,
            email: guestDetails.email,
            phone: guestDetails.phone,
            bookingHistory: [bookingId],
            createdAt: new Date()
        })

        addBooking({
            id: bookingId,
            guestName: guestDetails.name,
            guestEmail: guestDetails.email,
            guestPhone: guestDetails.phone,
            roomId: selectedRoom,
            checkIn: new Date(checkIn),
            checkOut: new Date(checkOut),
            guests,
            totalPrice,
            status: 'Confirmed',
            paymentStatus: 'Paid',
            source: 'Direct',
            promoCode: promoApplied ? promoCode : undefined,
            specialRequests: guestDetails.specialRequests,
            createdAt: new Date()
        })

        if (promoApplied) {
            const promo = promoCodes.find(p => p.code === promoCode)
            if (promo) {
                updatePromoCode(promo.id, { usedCount: promo.usedCount + 1 })
            }
        }

        setStep(4)
    }

    const minCheckIn = format(new Date(), 'yyyy-MM-dd')
    const minCheckOut = checkIn ? format(addDays(new Date(checkIn), 1), 'yyyy-MM-dd') : minCheckIn

    return (
        <div className="min-h-screen bg-gradient-to-br from-muted via-white to-muted">
            {/* Hero Header */}
            <div className="bg-gradient-primary text-white section">
                <div className="container-custom">
                    <div className="max-w-3xl mx-auto text-center">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">Book Your Perfect Stay</h1>
                        <p className="text-xl text-white/90">Experience luxury and comfort at Hotel JD Villa</p>
                    </div>
                </div>
            </div>

            <div className="container-custom section max-w-7xl">
                {/* Progress Steps */}
                <div className="mb-12">
                    <div className="flex items-center justify-center">
                        {[
                            { num: 1, label: 'Dates & Guests' },
                            { num: 2, label: 'Select Room' },
                            { num: 3, label: 'Guest Details' }
                        ].map((s, idx) => (
                            <React.Fragment key={s.num}>
                                <div className="flex flex-col items-center">
                                    <div className={`w-14 h-14 rounded-full flex items-center justify-center font-bold text-lg transition-all duration-300 ${step >= s.num
                                        ? 'bg-primary text-white shadow-lg scale-110'
                                        : 'bg-white text-muted-foreground border-2 border-border'
                                        }`}>
                                        {step > s.num ? <CheckCircle size={24} /> : s.num}
                                    </div>
                                    <span className={`mt-3 text-sm font-medium ${step >= s.num ? 'text-primary' : 'text-muted-foreground'}`}>
                                        {s.label}
                                    </span>
                                </div>
                                {idx < 2 && (
                                    <div className={`h-1 w-24 mx-4 rounded transition-all duration-300 ${step > s.num ? 'bg-primary' : 'bg-border'
                                        }`}></div>
                                )}
                            </React.Fragment>
                        ))}
                    </div>
                </div>

                {/* Step 1: Date Selection */}
                {step === 1 && (
                    <div className="max-w-4xl mx-auto animate-fade-in">
                        <Card className="shadow-xl border-0">
                            <CardHeader className="bg-gradient-to-r from-primary/5 to-accent/5 border-b">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                                        <Calendar className="text-primary" size={24} />
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-bold">When would you like to stay?</h2>
                                        <p className="text-muted-foreground">Select your check-in and check-out dates</p>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="p-8">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                                    <div>
                                        <label className="block text-sm font-semibold mb-3 text-foreground">Check-in Date</label>
                                        <div className="relative">
                                            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
                                            <input
                                                type="date"
                                                value={checkIn}
                                                onChange={(e) => setCheckIn(e.target.value)}
                                                min={minCheckIn}
                                                className="w-full pl-12 pr-4 py-4 border-2 border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all text-lg"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold mb-3 text-foreground">Check-out Date</label>
                                        <div className="relative">
                                            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
                                            <input
                                                type="date"
                                                value={checkOut}
                                                onChange={(e) => setCheckOut(e.target.value)}
                                                min={minCheckOut}
                                                disabled={!checkIn}
                                                className="w-full pl-12 pr-4 py-4 border-2 border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary disabled:bg-muted disabled:cursor-not-allowed transition-all text-lg"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold mb-3 text-foreground">Number of Guests</label>
                                        <div className="relative">
                                            <Users className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
                                            <select
                                                value={guests}
                                                onChange={(e) => setGuests(Number(e.target.value))}
                                                className="w-full pl-12 pr-4 py-4 border-2 border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all text-lg appearance-none bg-white"
                                            >
                                                {[1, 2, 3, 4].map(n => (
                                                    <option key={n} value={n}>{n} Guest{n > 1 ? 's' : ''}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                {checkIn && checkOut && (
                                    <div className="bg-gradient-to-r from-accent/10 to-primary/10 p-6 rounded-xl border-2 border-accent/20 mb-8">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <Clock className="text-accent" size={24} />
                                                <div>
                                                    <p className="font-semibold text-lg">Your Stay Duration</p>
                                                    <p className="text-muted-foreground">{format(new Date(checkIn), 'MMM dd')} - {format(new Date(checkOut), 'MMM dd, yyyy')}</p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-3xl font-bold text-primary">{nights}</p>
                                                <p className="text-sm text-muted-foreground">night{nights > 1 ? 's' : ''}</p>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                <div className="flex justify-end">
                                    <Button
                                        variant="primary"
                                        size="lg"
                                        onClick={() => setStep(2)}
                                        disabled={!checkIn || !checkOut}
                                        className="px-8"
                                    >
                                        Continue to Room Selection
                                        <ArrowRight className="ml-2" size={20} />
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                )}

                {/* Step 2: Room Selection */}
                {step === 2 && (
                    <div className="animate-fade-in">
                        <div className="text-center mb-8">
                            <h2 className="text-3xl font-bold mb-2">Choose Your Perfect Room</h2>
                            <p className="text-lg text-muted-foreground">
                                {availableRooms.filter(room => room.maxOccupancy >= guests).length} room{availableRooms.filter(room => room.maxOccupancy >= guests).length !== 1 ? 's' : ''} available for your dates
                            </p>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                            {availableRooms.filter(room => room.maxOccupancy >= guests).map((room) => {
                                const roomPrice = calculateBookingPrice(room.id, new Date(checkIn), new Date(checkOut))
                                const isSelected = selectedRoom === room.id
                                return (
                                    <Card
                                        key={room.id}
                                        onClick={() => setSelectedRoom(room.id)}
                                        className={`cursor-pointer transition-all duration-300 hover:shadow-2xl ${isSelected
                                            ? 'ring-4 ring-primary shadow-2xl scale-[1.02]'
                                            : 'hover:scale-[1.01]'
                                            }`}
                                    >
                                        <div className="relative h-56">
                                            <img
                                                src={room.images[0]}
                                                alt={room.name}
                                                className="w-full h-full object-cover"
                                            />
                                            {isSelected && (
                                                <div className="absolute top-4 right-4 bg-primary text-white px-4 py-2 rounded-full font-semibold flex items-center gap-2 shadow-lg">
                                                    <CheckCircle size={20} />
                                                    Selected
                                                </div>
                                            )}
                                        </div>
                                        <CardContent className="p-6">
                                            <div className="flex justify-between items-start mb-4">
                                                <div>
                                                    <span className="text-sm font-medium text-accent uppercase tracking-wide">{room.category}</span>
                                                    <h3 className="text-2xl font-bold mt-1">{room.name}</h3>
                                                </div>
                                            </div>
                                            <p className="text-muted-foreground mb-4">{room.description}</p>
                                            <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
                                                <span className="flex items-center gap-1">
                                                    <Bed size={16} />
                                                    {room.size}
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <Users size={16} />
                                                    Up to {room.maxOccupancy}
                                                </span>
                                            </div>
                                            <div className="flex flex-wrap gap-2 mb-6">
                                                {room.amenities.slice(0, 4).map((amenity, i) => (
                                                    <span key={i} className="text-xs bg-muted px-3 py-1 rounded-full">
                                                        {amenity}
                                                    </span>
                                                ))}
                                            </div>
                                            <div className="flex justify-between items-center pt-4 border-t border-border">
                                                <div>
                                                    <p className="text-sm text-muted-foreground">Total for {nights} night{nights > 1 ? 's' : ''}</p>
                                                    <p className="text-3xl font-bold text-primary">{formatCurrency(roomPrice)}</p>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                )
                            })}
                        </div>

                        {availableRooms.filter(room => room.maxOccupancy >= guests).length === 0 && (
                            <Card className="text-center py-16">
                                <CardContent>
                                    <p className="text-xl text-muted-foreground mb-4">
                                        No rooms available for {guests} guest{guests > 1 ? 's' : ''} on these dates.
                                    </p>
                                    <Button variant="outline" onClick={() => setStep(1)}>
                                        <ArrowLeft className="mr-2" size={20} />
                                        Change Dates or Guests
                                    </Button>
                                </CardContent>
                            </Card>
                        )}

                        <div className="flex justify-between max-w-4xl mx-auto">
                            <Button variant="outline" size="lg" onClick={() => setStep(1)}>
                                <ArrowLeft className="mr-2" size={20} />
                                Back
                            </Button>
                            <Button
                                variant="primary"
                                size="lg"
                                onClick={() => setStep(3)}
                                disabled={!selectedRoom}
                                className="px-8"
                            >
                                Continue to Guest Details
                                <ArrowRight className="ml-2" size={20} />
                            </Button>
                        </div>
                    </div>
                )}

                {/* Step 3: Guest Details & Payment */}
                {step === 3 && selectedRoomData && (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-fade-in">
                        <div className="lg:col-span-2">
                            <Card className="shadow-xl border-0">
                                <CardHeader className="bg-gradient-to-r from-primary/5 to-accent/5 border-b">
                                    <h2 className="text-2xl font-bold">Guest Information</h2>
                                    <p className="text-muted-foreground">Please provide your contact details</p>
                                </CardHeader>
                                <CardContent className="p-8">
                                    <div className="space-y-6">
                                        <div>
                                            <label className="block text-sm font-semibold mb-2">Full Name *</label>
                                            <input
                                                type="text"
                                                value={guestDetails.name}
                                                onChange={(e) => setGuestDetails({ ...guestDetails, name: e.target.value })}
                                                className="w-full px-4 py-3 border-2 border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                                                placeholder="John Doe"
                                            />
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <label className="block text-sm font-semibold mb-2">Email Address *</label>
                                                <input
                                                    type="email"
                                                    value={guestDetails.email}
                                                    onChange={(e) => setGuestDetails({ ...guestDetails, email: e.target.value })}
                                                    className="w-full px-4 py-3 border-2 border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                                                    placeholder="john@example.com"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-semibold mb-2">Phone Number *</label>
                                                <input
                                                    type="tel"
                                                    value={guestDetails.phone}
                                                    onChange={(e) => setGuestDetails({ ...guestDetails, phone: e.target.value })}
                                                    className="w-full px-4 py-3 border-2 border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                                                    placeholder="+91 98765 43210"
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold mb-2">Special Requests (Optional)</label>
                                            <textarea
                                                value={guestDetails.specialRequests}
                                                onChange={(e) => setGuestDetails({ ...guestDetails, specialRequests: e.target.value })}
                                                className="w-full px-4 py-3 border-2 border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                                                rows={4}
                                                placeholder="Any special requirements or preferences..."
                                            />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        <div>
                            <Card className="sticky top-24 shadow-xl border-0">
                                <CardHeader className="bg-gradient-primary text-white">
                                    <h3 className="text-xl font-bold">Booking Summary</h3>
                                </CardHeader>
                                <CardContent className="p-6 space-y-4">
                                    <div className="pb-4 border-b border-border">
                                        <h4 className="font-bold text-lg mb-1">{selectedRoomData.name}</h4>
                                        <p className="text-sm text-muted-foreground">{selectedRoomData.category}</p>
                                    </div>
                                    <div className="space-y-3 text-sm pb-4 border-b border-border">
                                        <div className="flex justify-between">
                                            <span className="text-muted-foreground">Check-in</span>
                                            <span className="font-semibold">{format(new Date(checkIn), 'MMM dd, yyyy')}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-muted-foreground">Check-out</span>
                                            <span className="font-semibold">{format(new Date(checkOut), 'MMM dd, yyyy')}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-muted-foreground">Nights</span>
                                            <span className="font-semibold">{nights}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-muted-foreground">Guests</span>
                                            <span className="font-semibold">{guests}</span>
                                        </div>
                                    </div>

                                    <div className="pb-4 border-b border-border">
                                        <div className="flex gap-2 mb-3">
                                            <input
                                                type="text"
                                                value={promoCode}
                                                onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                                                placeholder="Promo Code"
                                                className="flex-1 px-3 py-2 border-2 border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                                            />
                                            <Button variant="outline" size="sm" onClick={handleApplyPromo} disabled={promoApplied}>
                                                <Tag size={16} className="mr-1" />
                                                Apply
                                            </Button>
                                        </div>
                                        {promoApplied && (
                                            <div className="bg-success/10 text-success px-3 py-2 rounded-lg text-sm flex items-center gap-2">
                                                <CheckCircle size={16} />
                                                Promo code applied successfully!
                                            </div>
                                        )}
                                    </div>

                                    <div className="pt-2">
                                        <div className="flex justify-between items-center mb-6">
                                            <span className="text-lg font-semibold">Total Amount</span>
                                            <span className="text-3xl font-bold text-primary">{formatCurrency(totalPrice)}</span>
                                        </div>

                                        <Button
                                            variant="accent"
                                            size="lg"
                                            className="w-full"
                                            onClick={handleBooking}
                                            disabled={!guestDetails.name || !guestDetails.email || !guestDetails.phone}
                                        >
                                            <CreditCard className="mr-2" size={20} />
                                            Confirm & Pay
                                        </Button>

                                        <p className="text-xs text-muted-foreground text-center mt-4">
                                            By confirming, you agree to our terms and conditions
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                )}

                {/* Step 4: Confirmation */}
                {step === 4 && (
                    <div className="max-w-3xl mx-auto animate-scale-in">
                        <Card className="shadow-2xl border-0 overflow-hidden">
                            <div className="bg-gradient-to-r from-success/10 to-primary/10 p-12 text-center border-b">
                                <div className="w-24 h-24 bg-success/20 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <CheckCircle className="text-success" size={56} />
                                </div>
                                <h2 className="text-4xl font-bold mb-4">Booking Confirmed!</h2>
                                <p className="text-lg text-muted-foreground">
                                    Thank you for choosing Hotel JD Villa
                                </p>
                            </div>
                            <CardContent className="p-8">
                                <div className="bg-muted p-6 rounded-xl mb-6">
                                    <h3 className="font-bold text-lg mb-4 pb-3 border-b border-border">Booking Details</h3>
                                    <div className="space-y-3 text-sm">
                                        <div className="flex justify-between">
                                            <span className="text-muted-foreground">Confirmation Number</span>
                                            <span className="font-mono font-semibold">#{Date.now().toString().slice(-8)}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-muted-foreground">Guest Name</span>
                                            <span className="font-semibold">{guestDetails.name}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-muted-foreground">Room</span>
                                            <span className="font-semibold">{selectedRoomData?.name}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-muted-foreground">Check-in</span>
                                            <span className="font-semibold">{format(new Date(checkIn), 'MMM dd, yyyy')}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-muted-foreground">Check-out</span>
                                            <span className="font-semibold">{format(new Date(checkOut), 'MMM dd, yyyy')}</span>
                                        </div>
                                        <div className="flex justify-between pt-3 border-t border-border">
                                            <span className="font-bold">Total Paid</span>
                                            <span className="font-bold text-primary text-lg">{formatCurrency(totalPrice)}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-primary/5 p-4 rounded-lg mb-6">
                                    <p className="text-sm text-center">
                                        📧 A confirmation email has been sent to <strong>{guestDetails.email}</strong>
                                    </p>
                                </div>
                                <div className="flex gap-4">
                                    <Button variant="primary" className="flex-1" onClick={() => router.push('/')}>
                                        Back to Home
                                    </Button>
                                    <Button variant="outline" className="flex-1" onClick={() => window.print()}>
                                        Print Confirmation
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                )}
            </div>
        </div>
    )
}
