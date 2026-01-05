'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/Button'
import { Card, CardHeader, CardContent } from '@/components/ui/Card'
import { useHotelStore } from '@/store/hotelStore'
import { formatCurrency, formatDate } from '@/lib/utils'
import { Calendar, Users, Tag, CreditCard, CheckCircle } from 'lucide-react'
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
            alert(`Promo code applied! You save ${promo.discountType === 'Percentage' ? promo.discountValue + '%' : formatCurrency(promo.discountValue)}`)
        } else {
            alert('Invalid or expired promo code')
        }
    }

    const handleBooking = () => {
        if (!selectedRoom || !checkIn || !checkOut) return

        const bookingId = `BK${Date.now()}`
        const guestId = `G${Date.now()}`

        // Add guest
        addGuest({
            id: guestId,
            name: guestDetails.name,
            email: guestDetails.email,
            phone: guestDetails.phone,
            bookingHistory: [bookingId],
            createdAt: new Date()
        })

        // Add booking
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

        // Update promo code usage
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
        <div className="min-h-screen bg-muted py-12">
            <div className="container-custom max-w-6xl">
                {/* Progress Steps */}
                <div className="mb-12">
                    <div className="flex items-center justify-center gap-4">
                        {[1, 2, 3].map((s) => (
                            <React.Fragment key={s}>
                                <div className={`flex items-center justify-center w-12 h-12 rounded-full font-bold transition-all ${step >= s ? 'bg-primary text-white' : 'bg-white text-muted-foreground'
                                    }`}>
                                    {s}
                                </div>
                                {s < 3 && <div className={`h-1 w-16 ${step > s ? 'bg-primary' : 'bg-white'}`}></div>}
                            </React.Fragment>
                        ))}
                    </div>
                    <div className="flex justify-center gap-16 mt-4 text-sm font-medium">
                        <span className={step >= 1 ? 'text-primary' : 'text-muted-foreground'}>Select Dates</span>
                        <span className={step >= 2 ? 'text-primary' : 'text-muted-foreground'}>Choose Room</span>
                        <span className={step >= 3 ? 'text-primary' : 'text-muted-foreground'}>Guest Details</span>
                    </div>
                </div>

                {/* Step 1: Date Selection */}
                {step === 1 && (
                    <Card className="animate-fade-in">
                        <CardHeader>
                            <h2 className="text-3xl font-bold flex items-center gap-3">
                                <Calendar className="text-primary" />
                                Select Your Dates
                            </h2>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div>
                                    <label className="block text-sm font-medium mb-2">Check-in Date</label>
                                    <input
                                        type="date"
                                        value={checkIn}
                                        onChange={(e) => setCheckIn(e.target.value)}
                                        min={minCheckIn}
                                        className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2">Check-out Date</label>
                                    <input
                                        type="date"
                                        value={checkOut}
                                        onChange={(e) => setCheckOut(e.target.value)}
                                        min={minCheckOut}
                                        disabled={!checkIn}
                                        className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary disabled:bg-muted"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2">Number of Guests</label>
                                    <select
                                        value={guests}
                                        onChange={(e) => setGuests(Number(e.target.value))}
                                        className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                    >
                                        {[1, 2, 3, 4].map(n => (
                                            <option key={n} value={n}>{n} Guest{n > 1 ? 's' : ''}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            {checkIn && checkOut && (
                                <div className="mt-6 p-4 bg-accent/10 rounded-lg">
                                    <p className="text-lg">
                                        <span className="font-semibold">{nights} night{nights > 1 ? 's' : ''}</span> •
                                        {' '}{format(new Date(checkIn), 'MMM dd, yyyy')} - {format(new Date(checkOut), 'MMM dd, yyyy')}
                                    </p>
                                </div>
                            )}

                            <div className="mt-8 flex justify-end">
                                <Button
                                    variant="primary"
                                    size="lg"
                                    onClick={() => setStep(2)}
                                    disabled={!checkIn || !checkOut}
                                >
                                    Continue to Room Selection
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                )}

                {/* Step 2: Room Selection */}
                {step === 2 && (
                    <Card className="animate-fade-in">
                        <CardHeader>
                            <h2 className="text-3xl font-bold">Choose Your Room</h2>
                            <p className="text-muted-foreground">
                                {availableRooms.length} room{availableRooms.length !== 1 ? 's' : ''} available for your dates
                            </p>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {availableRooms.filter(room => room.maxOccupancy >= guests).map((room) => {
                                    const roomPrice = calculateBookingPrice(room.id, new Date(checkIn), new Date(checkOut))
                                    return (
                                        <div
                                            key={room.id}
                                            onClick={() => setSelectedRoom(room.id)}
                                            className={`border-2 rounded-xl p-6 cursor-pointer transition-all ${selectedRoom === room.id
                                                    ? 'border-primary bg-primary/5'
                                                    : 'border-border hover:border-primary/50'
                                                }`}
                                        >
                                            <div className="flex justify-between items-start mb-4">
                                                <div>
                                                    <h3 className="text-xl font-bold">{room.name}</h3>
                                                    <p className="text-sm text-muted-foreground">{room.size} • Up to {room.maxOccupancy} guests</p>
                                                </div>
                                                {selectedRoom === room.id && (
                                                    <CheckCircle className="text-primary" fill="currentColor" />
                                                )}
                                            </div>
                                            <p className="text-muted-foreground mb-4">{room.description}</p>
                                            <div className="flex flex-wrap gap-2 mb-4">
                                                {room.amenities.slice(0, 4).map((amenity, i) => (
                                                    <span key={i} className="text-xs bg-muted px-2 py-1 rounded">
                                                        {amenity}
                                                    </span>
                                                ))}
                                            </div>
                                            <div className="flex justify-between items-center pt-4 border-t border-border">
                                                <div>
                                                    <p className="text-sm text-muted-foreground">Total for {nights} night{nights > 1 ? 's' : ''}</p>
                                                    <p className="text-2xl font-bold text-primary">{formatCurrency(roomPrice)}</p>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>

                            {availableRooms.filter(room => room.maxOccupancy >= guests).length === 0 && (
                                <div className="text-center py-12">
                                    <p className="text-lg text-muted-foreground">
                                        No rooms available for {guests} guest{guests > 1 ? 's' : ''} on these dates.
                                    </p>
                                    <Button variant="outline" className="mt-4" onClick={() => setStep(1)}>
                                        Change Dates or Guests
                                    </Button>
                                </div>
                            )}

                            <div className="mt-8 flex justify-between">
                                <Button variant="outline" onClick={() => setStep(1)}>Back</Button>
                                <Button
                                    variant="primary"
                                    size="lg"
                                    onClick={() => setStep(3)}
                                    disabled={!selectedRoom}
                                >
                                    Continue to Guest Details
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                )}

                {/* Step 3: Guest Details & Payment */}
                {step === 3 && selectedRoomData && (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-fade-in">
                        <div className="lg:col-span-2">
                            <Card>
                                <CardHeader>
                                    <h2 className="text-3xl font-bold">Guest Details</h2>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-6">
                                        <div>
                                            <label className="block text-sm font-medium mb-2">Full Name *</label>
                                            <input
                                                type="text"
                                                value={guestDetails.name}
                                                onChange={(e) => setGuestDetails({ ...guestDetails, name: e.target.value })}
                                                className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                                placeholder="John Doe"
                                            />
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <label className="block text-sm font-medium mb-2">Email *</label>
                                                <input
                                                    type="email"
                                                    value={guestDetails.email}
                                                    onChange={(e) => setGuestDetails({ ...guestDetails, email: e.target.value })}
                                                    className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                                    placeholder="john@example.com"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium mb-2">Phone *</label>
                                                <input
                                                    type="tel"
                                                    value={guestDetails.phone}
                                                    onChange={(e) => setGuestDetails({ ...guestDetails, phone: e.target.value })}
                                                    className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                                    placeholder="+91 98765 43210"
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium mb-2">Special Requests (Optional)</label>
                                            <textarea
                                                value={guestDetails.specialRequests}
                                                onChange={(e) => setGuestDetails({ ...guestDetails, specialRequests: e.target.value })}
                                                className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                                rows={4}
                                                placeholder="Any special requirements or preferences..."
                                            />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        <div>
                            <Card className="sticky top-24">
                                <CardHeader>
                                    <h3 className="text-2xl font-bold">Booking Summary</h3>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div>
                                        <h4 className="font-semibold text-lg">{selectedRoomData.name}</h4>
                                        <p className="text-sm text-muted-foreground">{selectedRoomData.category}</p>
                                    </div>
                                    <div className="space-y-2 text-sm">
                                        <div className="flex justify-between">
                                            <span className="text-muted-foreground">Check-in</span>
                                            <span className="font-medium">{format(new Date(checkIn), 'MMM dd, yyyy')}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-muted-foreground">Check-out</span>
                                            <span className="font-medium">{format(new Date(checkOut), 'MMM dd, yyyy')}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-muted-foreground">Nights</span>
                                            <span className="font-medium">{nights}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-muted-foreground">Guests</span>
                                            <span className="font-medium">{guests}</span>
                                        </div>
                                    </div>

                                    <div className="border-t border-border pt-4">
                                        <div className="flex gap-2 mb-4">
                                            <input
                                                type="text"
                                                value={promoCode}
                                                onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                                                placeholder="Promo Code"
                                                className="flex-1 px-3 py-2 border border-border rounded-lg text-sm"
                                            />
                                            <Button variant="outline" size="sm" onClick={handleApplyPromo} disabled={promoApplied}>
                                                Apply
                                            </Button>
                                        </div>
                                        {promoApplied && (
                                            <div className="bg-success/10 text-success px-3 py-2 rounded-lg text-sm mb-4">
                                                ✓ Promo code applied!
                                            </div>
                                        )}
                                    </div>

                                    <div className="border-t border-border pt-4">
                                        <div className="flex justify-between items-center mb-6">
                                            <span className="text-lg font-semibold">Total</span>
                                            <span className="text-3xl font-bold text-primary">{formatCurrency(totalPrice)}</span>
                                        </div>

                                        <Button
                                            variant="accent"
                                            size="lg"
                                            className="w-full"
                                            onClick={handleBooking}
                                            disabled={!guestDetails.name || !guestDetails.email || !guestDetails.phone}
                                        >
                                            <CreditCard className="mr-2" />
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
                    <Card className="max-w-2xl mx-auto text-center animate-scale-in">
                        <CardContent className="p-12">
                            <div className="w-20 h-20 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-6">
                                <CheckCircle className="text-success" size={48} />
                            </div>
                            <h2 className="text-4xl font-bold mb-4">Booking Confirmed!</h2>
                            <p className="text-lg text-muted-foreground mb-8">
                                Thank you for booking with Hotel JD Villa. A confirmation email has been sent to {guestDetails.email}.
                            </p>
                            <div className="bg-muted p-6 rounded-xl mb-8">
                                <h3 className="font-semibold mb-4">Booking Details</h3>
                                <div className="space-y-2 text-sm text-left">
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Guest Name</span>
                                        <span className="font-medium">{guestDetails.name}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Room</span>
                                        <span className="font-medium">{selectedRoomData?.name}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Check-in</span>
                                        <span className="font-medium">{format(new Date(checkIn), 'MMM dd, yyyy')}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Check-out</span>
                                        <span className="font-medium">{format(new Date(checkOut), 'MMM dd, yyyy')}</span>
                                    </div>
                                    <div className="flex justify-between pt-4 border-t border-border">
                                        <span className="font-semibold">Total Paid</span>
                                        <span className="font-bold text-primary">{formatCurrency(totalPrice)}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex gap-4 justify-center">
                                <Button variant="primary" onClick={() => router.push('/')}>
                                    Back to Home
                                </Button>
                                <Button variant="outline" onClick={() => window.print()}>
                                    Print Confirmation
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    )
}
