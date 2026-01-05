// Room Types
export interface Room {
    id: string
    name: string
    category: 'Standard' | 'Deluxe' | 'Balcony' | 'Suite'
    description: string
    amenities: string[]
    maxOccupancy: number
    basePrice: number
    images: string[]
    size: string
}

// Booking Types
export interface Booking {
    id: string
    guestName: string
    guestEmail: string
    guestPhone: string
    roomId: string
    checkIn: Date
    checkOut: Date
    guests: number
    totalPrice: number
    status: 'Confirmed' | 'Cancelled' | 'No-show' | 'Completed'
    paymentStatus: 'Pending' | 'Partial' | 'Paid' | 'Refunded'
    source: 'Direct' | 'Booking.com' | 'Agoda' | 'Expedia' | 'Other'
    promoCode?: string
    specialRequests?: string
    createdAt: Date
}

// Guest Types
export interface Guest {
    id: string
    name: string
    email: string
    phone: string
    idProof?: string
    address?: string
    bookingHistory: string[]
    preferences?: string
    createdAt: Date
}

// Pricing Types
export interface PricingRule {
    id: string
    roomCategory: string
    startDate: Date
    endDate: Date
    price: number
    type: 'Seasonal' | 'Weekend' | 'Festival' | 'Blackout'
    description: string
}

export interface PromoCode {
    id: string
    code: string
    discountType: 'Percentage' | 'Fixed'
    discountValue: number
    validFrom: Date
    validTo: Date
    minBookingAmount?: number
    maxUses?: number
    usedCount: number
    active: boolean
}

// Inventory Types
export interface Inventory {
    roomId: string
    date: Date
    available: number
    blocked: number
    booked: number
}

// Review Types
export interface Review {
    id: string
    guestName: string
    rating: number
    comment: string
    date: Date
    response?: string
    source: 'Google' | 'Direct'
}

// Analytics Types
export interface Analytics {
    date: Date
    occupancyRate: number
    revenue: number
    adr: number // Average Daily Rate
    revPAR: number // Revenue per Available Room
    directBookings: number
    otaBookings: number
}
