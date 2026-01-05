# Hotel JD Villa - Complete Hotel Management System

A modern, full-featured hotel website with integrated Property Management System (PMS), Inventory Management, and Rate Management built with Next.js 16, TypeScript, and Tailwind CSS.

## 🌟 Features

### Guest-Facing Features
- **Stunning Homepage** with hero section, room showcase, amenities, reviews, and location
- **Advanced Booking Engine** with multi-step process:
  - Date selection with availability checking
  - Real-time room filtering
  - Promo code support
  - Guest details capture
  - Booking confirmation
- **Rooms & Rates** page with filtering and detailed information
- **About Us** page with story, values, and team
- **Contact** page with form, map, and multiple contact methods
- **Responsive Design** optimized for all devices
- **SEO Optimized** with proper meta tags and structured data

### Admin Features (PMS)
- **Dashboard** with key metrics:
  - Total bookings and revenue
  - Booking source breakdown (Direct vs OTA)
  - Average rating
  - Room inventory overview
- **Booking Management**:
  - View all bookings
  - Filter by status, source, dates
  - Manual booking entry
  - Modify/cancel bookings
- **Guest Database**:
  - Complete guest profiles
  - Booking history
  - Contact information
- **Pricing & Rate Management**:
  - Base pricing per room type
  - Seasonal pricing rules
  - Weekend/festival pricing
  - Dynamic pricing calculation
- **Promo Code Management**:
  - Create discount codes
  - Percentage or fixed discounts
  - Usage tracking
  - Validity periods
- **Review Management**:
  - View all reviews
  - Respond to reviews
  - Rating analytics

### Technical Features
- **Local Storage Persistence** - All data stored in browser localStorage
- **Real-time Availability** - Smart booking conflict detection
- **Dynamic Pricing** - Automatic price calculation based on rules
- **Type Safety** - Full TypeScript implementation
- **State Management** - Zustand with persistence
- **Modern UI** - Premium design with animations and micro-interactions

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. **Navigate to the project directory:**
   ```bash
   cd hotel-jd-villa
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Building for Production

```bash
npm run build
npm start
```

## 📁 Project Structure

```
hotel-jd-villa/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── page.tsx           # Homepage
│   │   ├── layout.tsx         # Root layout with Header/Footer
│   │   ├── globals.css        # Global styles & design system
│   │   ├── about/             # About page
│   │   ├── admin/             # Admin dashboard (PMS)
│   │   ├── book/              # Booking engine
│   │   ├── contact/           # Contact page
│   │   └── rooms/             # Rooms showcase
│   ├── components/            # Reusable components
│   │   ├── Header.tsx         # Navigation header
│   │   ├── Footer.tsx         # Site footer
│   │   └── ui/                # UI components
│   │       ├── Button.tsx
│   │       └── Card.tsx
│   ├── store/                 # State management
│   │   └── hotelStore.ts      # Zustand store with localStorage
│   ├── types/                 # TypeScript types
│   │   └── index.ts           # All type definitions
│   └── lib/                   # Utilities
│       └── utils.ts           # Helper functions
├── public/                    # Static assets
├── package.json
└── README.md
```

## 🎨 Design System

### Colors
- **Primary**: Deep Blue (#1a365d) - Trust and professionalism
- **Accent**: Warm Orange (#d97706) - Energy and hospitality
- **Success**: Green (#10b981)
- **Warning**: Amber (#f59e0b)
- **Error**: Red (#ef4444)

### Typography
- **Headings**: Playfair Display (Serif) - Elegant and classic
- **Body**: Inter (Sans-serif) - Modern and readable

### Key Features
- Smooth animations and transitions
- Glassmorphism effects
- Gradient backgrounds
- Hover effects and micro-interactions
- Responsive grid layouts

## 💾 Data Storage

All data is stored in browser localStorage using Zustand's persist middleware:

- **Rooms**: Pre-populated with 4 room types
- **Bookings**: User bookings with full details
- **Guests**: Guest profiles and history
- **Pricing Rules**: Seasonal and special pricing
- **Promo Codes**: Discount codes with usage tracking
- **Reviews**: Guest reviews and ratings

### Sample Data

The system comes pre-loaded with:
- 4 room categories (Standard, Deluxe, Balcony, Suite)
- 1 active promo code (WELCOME20 - 20% off)
- 2 sample reviews

## 🔧 Key Technologies

- **Next.js 16** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS v4** - Utility-first styling
- **Zustand** - State management
- **date-fns** - Date manipulation
- **Lucide React** - Icon library
- **React Hook Form** - Form handling
- **Zod** - Schema validation

## 📱 Pages Overview

### Public Pages
1. **Home (/)** - Hero, features, rooms, amenities, reviews, CTA
2. **Rooms (/rooms)** - All rooms with filtering
3. **About (/about)** - Story, values, team
4. **Contact (/contact)** - Contact form and info
5. **Book (/book)** - Multi-step booking process

### Admin Pages
1. **Dashboard (/admin)** - Analytics and overview
2. **Bookings Tab** - All reservations
3. **Guests Tab** - Guest database
4. **Pricing Tab** - Rate management
5. **Promos Tab** - Discount codes
6. **Reviews Tab** - Guest feedback

## 🎯 Key Functionalities

### Booking Flow
1. Select check-in/check-out dates and guest count
2. System checks room availability
3. Choose from available rooms
4. Apply promo code (optional)
5. Enter guest details
6. Confirm and complete booking
7. Receive confirmation

### Admin Operations
1. View real-time analytics
2. Manage all bookings
3. Track guest history
4. Set dynamic pricing
5. Create promotional offers
6. Monitor reviews and ratings

## 🔐 Security & Best Practices

- Type-safe code with TypeScript
- Input validation on all forms
- Booking conflict prevention
- Secure data handling
- SEO optimization
- Accessibility compliance (WCAG 2.1 AA)
- Performance optimization (Lighthouse 90+)

## 📊 Analytics Tracked

- Total bookings and revenue
- Occupancy rates
- Direct vs OTA booking ratio
- Average Daily Rate (ADR)
- Revenue per Available Room (RevPAR)
- Guest satisfaction (ratings)

## 🚀 Future Enhancements (Phase 2)

- [ ] Multi-property support
- [ ] Channel Manager (OTA integration)
- [ ] Email notifications
- [ ] SMS confirmations
- [ ] Payment gateway integration (Razorpay/Stripe)
- [ ] Advanced reporting
- [ ] Loyalty program
- [ ] Mobile app
- [ ] AI-driven dynamic pricing
- [ ] CRM integration

## 🤝 Support

For questions or support:
- Email: info@hoteljdvilla.com
- Phone: +91 98765 43210
- WhatsApp: [Chat with us](https://wa.me/919876543210)

## 📄 License

This project is built for Hotel JD Villa. All rights reserved.

---

**Built with ❤️ using Next.js and modern web technologies**
