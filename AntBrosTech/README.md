# AntBros Photography Studio

A modern, full-stack photography studio website built with React, TypeScript, Express, and PostgreSQL.

## Features

- **Portfolio Management**: Dynamic portfolio with admin panel for adding, editing, and deleting items
- **Booking System**: Customers can book photography sessions with form validation
- **Contact Forms**: Professional contact form with database storage
- **Admin Dashboard**: Password-protected admin panel for managing content and viewing bookings
- **Database Integration**: PostgreSQL database with Drizzle ORM
- **Responsive Design**: Mobile-first design with dark theme and orange accents

## Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS, Vite
- **Backend**: Node.js, Express, TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **UI Components**: Radix UI with shadcn/ui
- **State Management**: TanStack Query
- **Form Handling**: React Hook Form with Zod validation
- **Routing**: Wouter

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <your-repo-url>
   cd antbros-photography
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env
   ```
   Edit `.env` with your database configuration.

4. Set up the database:
   ```bash
   npm run db:push
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

The application will be available at `http://localhost:5000`

## Deployment

### Vercel Deployment

1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Deploy to Vercel:
   ```bash
   vercel
   ```

3. Configure environment variables in Vercel dashboard:
   - `DATABASE_URL`
   - `PGHOST`
   - `PGPORT` 
   - `PGUSER`
   - `PGPASSWORD`
   - `PGDATABASE`

### Manual Deployment

1. Build the application:
   ```bash
   npm run build
   ```

2. Start the production server:
   ```bash
   npm start
   ```

## Admin Panel

Access the admin panel at `/admin` with password: `software`

### Admin Features

- **Portfolio Management**: Add, edit, delete portfolio items
- **Booking Management**: View all customer booking requests
- **Contact Management**: View all contact form submissions
- **Image Upload**: Upload images for portfolio items
- **Live Preview**: Preview changes before saving

## API Endpoints

- `GET /api/portfolio` - Get all portfolio items
- `POST /api/portfolio` - Add new portfolio item
- `PUT /api/portfolio/:id` - Update portfolio item
- `DELETE /api/portfolio/:id` - Delete portfolio item
- `POST /api/contact` - Submit contact form
- `GET /api/contacts` - Get all contact submissions (admin)
- `POST /api/booking` - Submit booking request
- `GET /api/bookings` - Get all bookings (admin)

## Development Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server  
- `npm run db:push` - Push database schema changes

## Database Schema

### portfolio_items
- `id` - Primary key
- `title` - Portfolio item title
- `description` - Portfolio item description
- `image` - Image URL
- `category` - Item category
- `created_at` - Creation timestamp

### contacts
- `id` - Primary key
- `name` - Contact name
- `email` - Contact email
- `subject` - Message subject
- `message` - Message content
- `created_at` - Creation timestamp

### bookings
- `id` - Primary key
- `first_name` - Customer first name
- `last_name` - Customer last name
- `email` - Customer email
- `phone` - Customer phone
- `service` - Requested service
- `message` - Additional message
- `created_at` - Creation timestamp

## License

This project is licensed under the MIT License.