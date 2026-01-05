import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Room, Booking, Guest, PricingRule, PromoCode, Review } from '@/types'

interface HotelStore {
    // Rooms
    rooms: Room[]
    addRoom: (room: Room) => void
    updateRoom: (id: string, room: Partial<Room>) => void
    deleteRoom: (id: string) => void

    // Bookings
    bookings: Booking[]
    addBooking: (booking: Booking) => void
    updateBooking: (id: string, booking: Partial<Booking>) => void
    cancelBooking: (id: string) => void

    // Guests
    guests: Guest[]
    addGuest: (guest: Guest) => void
    updateGuest: (id: string, guest: Partial<Guest>) => void

    // Pricing Rules
    pricingRules: PricingRule[]
    addPricingRule: (rule: PricingRule) => void
    updatePricingRule: (id: string, rule: Partial<PricingRule>) => void
    deletePricingRule: (id: string) => void

    // Promo Codes
    promoCodes: PromoCode[]
    addPromoCode: (code: PromoCode) => void
    updatePromoCode: (id: string, code: Partial<PromoCode>) => void
    deletePromoCode: (id: string) => void

    // Reviews
    reviews: Review[]
    addReview: (review: Review) => void
    updateReview: (id: string, review: Partial<Review>) => void

    // Helper functions
    getAvailableRooms: (checkIn: Date, checkOut: Date) => Room[]
    getRoomPrice: (roomId: string, date: Date) => number
    calculateBookingPrice: (roomId: string, checkIn: Date, checkOut: Date, promoCode?: string) => number
}

export const useHotelStore = create<HotelStore>()(
    persist(
        (set, get) => ({
            // Initial state
            rooms: [
                {
                    id: '1',
                    name: 'Standard Room',
                    category: 'Standard',
                    description: 'Comfortable room with all basic amenities for a pleasant stay.',
                    amenities: ['Free Wi-Fi', 'Air Conditioning', 'TV', 'Hot Water', 'Room Service'],
                    maxOccupancy: 2,
                    basePrice: 2500,
                    images: ['/rooms/standard-1.jpg', '/rooms/standard-2.jpg'],
                    size: '250 sq ft'
                },
                {
                    id: '2',
                    name: 'Deluxe Room',
                    category: 'Deluxe',
                    description: 'Spacious room with premium amenities and modern decor.',
                    amenities: ['Free Wi-Fi', 'Air Conditioning', 'Smart TV', 'Mini Fridge', 'Hot Water', 'Room Service', 'Work Desk'],
                    maxOccupancy: 3,
                    basePrice: 3500,
                    images: ['/rooms/deluxe-1.jpg', '/rooms/deluxe-2.jpg'],
                    size: '350 sq ft'
                },
                {
                    id: '3',
                    name: 'Balcony Room',
                    category: 'Balcony',
                    description: 'Beautiful room with a private balcony offering stunning views.',
                    amenities: ['Free Wi-Fi', 'Air Conditioning', 'Smart TV', 'Mini Fridge', 'Hot Water', 'Room Service', 'Private Balcony', 'Seating Area'],
                    maxOccupancy: 3,
                    basePrice: 4000,
                    images: ['/rooms/balcony-1.jpg', '/rooms/balcony-2.jpg'],
                    size: '400 sq ft'
                },
                {
                    id: '4',
                    name: 'Executive Suite',
                    category: 'Suite',
                    description: 'Luxurious suite with separate living area and premium facilities.',
                    amenities: ['Free Wi-Fi', 'Air Conditioning', 'Smart TV', 'Mini Fridge', 'Hot Water', 'Room Service', 'Living Area', 'King Bed', 'Bathtub', 'Coffee Maker'],
                    maxOccupancy: 4,
                    basePrice: 6000,
                    images: ['/rooms/suite-1.jpg', '/rooms/suite-2.jpg'],
                    size: '600 sq ft'
                }
            ],
            bookings: [],
            guests: [],
            pricingRules: [],
            promoCodes: [
                {
                    id: '1',
                    code: 'WELCOME20',
                    discountType: 'Percentage',
                    discountValue: 20,
                    validFrom: new Date('2026-01-01'),
                    validTo: new Date('2026-12-31'),
                    minBookingAmount: 2000,
                    maxUses: 100,
                    usedCount: 0,
                    active: true
                }
            ],
            reviews: [
                {
                    id: '1',
                    guestName: 'Rajesh Kumar',
                    rating: 5,
                    comment: 'Excellent service and very clean rooms. The staff was very helpful and friendly. Highly recommended!',
                    date: new Date('2025-12-15'),
                    response: 'Thank you for your wonderful review! We look forward to hosting you again.',
                    source: 'Google'
                },
                {
                    id: '2',
                    guestName: 'Priya Sharma',
                    rating: 4,
                    comment: 'Great location and comfortable stay. The breakfast was delicious.',
                    date: new Date('2025-12-20'),
                    source: 'Google'
                }
            ],

            // Room actions
            addRoom: (room) => set((state) => ({ rooms: [...state.rooms, room] })),
            updateRoom: (id, room) => set((state) => ({
                rooms: state.rooms.map((r) => r.id === id ? { ...r, ...room } : r)
            })),
            deleteRoom: (id) => set((state) => ({
                rooms: state.rooms.filter((r) => r.id !== id)
            })),

            // Booking actions
            addBooking: (booking) => set((state) => ({ bookings: [...state.bookings, booking] })),
            updateBooking: (id, booking) => set((state) => ({
                bookings: state.bookings.map((b) => b.id === id ? { ...b, ...booking } : b)
            })),
            cancelBooking: (id) => set((state) => ({
                bookings: state.bookings.map((b) =>
                    b.id === id ? { ...b, status: 'Cancelled' as const } : b
                )
            })),

            // Guest actions
            addGuest: (guest) => set((state) => ({ guests: [...state.guests, guest] })),
            updateGuest: (id, guest) => set((state) => ({
                guests: state.guests.map((g) => g.id === id ? { ...g, ...guest } : g)
            })),

            // Pricing rule actions
            addPricingRule: (rule) => set((state) => ({ pricingRules: [...state.pricingRules, rule] })),
            updatePricingRule: (id, rule) => set((state) => ({
                pricingRules: state.pricingRules.map((r) => r.id === id ? { ...r, ...rule } : r)
            })),
            deletePricingRule: (id) => set((state) => ({
                pricingRules: state.pricingRules.filter((r) => r.id !== id)
            })),

            // Promo code actions
            addPromoCode: (code) => set((state) => ({ promoCodes: [...state.promoCodes, code] })),
            updatePromoCode: (id, code) => set((state) => ({
                promoCodes: state.promoCodes.map((c) => c.id === id ? { ...c, ...code } : c)
            })),
            deletePromoCode: (id) => set((state) => ({
                promoCodes: state.promoCodes.filter((c) => c.id !== id)
            })),

            // Review actions
            addReview: (review) => set((state) => ({ reviews: [...state.reviews, review] })),
            updateReview: (id, review) => set((state) => ({
                reviews: state.reviews.map((r) => r.id === id ? { ...r, ...review } : r)
            })),

            // Helper functions
            getAvailableRooms: (checkIn, checkOut) => {
                const state = get()
                const bookedRoomIds = state.bookings
                    .filter((booking) => {
                        if (booking.status === 'Cancelled') return false
                        const bookingCheckIn = new Date(booking.checkIn)
                        const bookingCheckOut = new Date(booking.checkOut)
                        return (
                            (checkIn >= bookingCheckIn && checkIn < bookingCheckOut) ||
                            (checkOut > bookingCheckIn && checkOut <= bookingCheckOut) ||
                            (checkIn <= bookingCheckIn && checkOut >= bookingCheckOut)
                        )
                    })
                    .map((booking) => booking.roomId)

                return state.rooms.filter((room) => !bookedRoomIds.includes(room.id))
            },

            getRoomPrice: (roomId, date) => {
                const state = get()
                const room = state.rooms.find((r) => r.id === roomId)
                if (!room) return 0

                // Check for pricing rules
                const applicableRule = state.pricingRules.find((rule) => {
                    const ruleStart = new Date(rule.startDate)
                    const ruleEnd = new Date(rule.endDate)
                    return (
                        rule.roomCategory === room.category &&
                        date >= ruleStart &&
                        date <= ruleEnd
                    )
                })

                return applicableRule ? applicableRule.price : room.basePrice
            },

            calculateBookingPrice: (roomId, checkIn, checkOut, promoCode) => {
                const state = get()
                let totalPrice = 0

                // Calculate price for each night
                const currentDate = new Date(checkIn)
                while (currentDate < checkOut) {
                    totalPrice += state.getRoomPrice(roomId, currentDate)
                    currentDate.setDate(currentDate.getDate() + 1)
                }

                // Apply promo code if valid
                if (promoCode) {
                    const promo = state.promoCodes.find(
                        (p) => p.code === promoCode && p.active &&
                            new Date() >= new Date(p.validFrom) &&
                            new Date() <= new Date(p.validTo) &&
                            (!p.minBookingAmount || totalPrice >= p.minBookingAmount) &&
                            (!p.maxUses || p.usedCount < p.maxUses)
                    )

                    if (promo) {
                        if (promo.discountType === 'Percentage') {
                            totalPrice = totalPrice * (1 - promo.discountValue / 100)
                        } else {
                            totalPrice = totalPrice - promo.discountValue
                        }
                    }
                }

                return Math.max(0, totalPrice)
            }
        }),
        {
            name: 'hotel-storage',
        }
    )
)
