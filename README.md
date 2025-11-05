# TalentFind - Candidate Search Platform

A comprehensive candidate search web application built with Next.js, featuring AI-powered matching, advanced filtering, and a beautiful responsive design.

## 🚀 Features

- **Smart Job Matching**: Input job descriptions and get matched with relevant candidates
- **Advanced Search & Filtering**: Filter by location, experience, skills, and match score
- **Detailed Candidate Profiles**: Comprehensive candidate information with work history and education
- **Responsive Design**: Mobile-first approach with beautiful UI components
- **Real-time Search**: Instant filtering and search results
- **User Authentication**: Secure login system with session management

## 🛠 Tech Stack

- **Framework**: Next.js 13+ with App Router
- **UI Components**: ShadCN/UI + Radix UI
- **Styling**: Tailwind CSS
- **State Management**: Zustand with persistence
- **Form Management**: React Hook Form + Zod validation
- **TypeScript**: Full type safety throughout the application
- **Icons**: Lucide React

## 📁 Project Structure

```
├── app/                          # Next.js app directory
│   ├── layout.tsx               # Root layout
│   ├── page.tsx                 # Landing page (job description form)
│   ├── login/page.tsx           # Authentication page
│   ├── dashboard/page.tsx       # Candidate search results
│   └── candidate/[id]/page.tsx  # Individual candidate profile
├── components/
│   ├── layout/                  # Layout components
│   │   ├── Header.tsx          # Navigation header
│   │   └── PageLayout.tsx      # Page wrapper component
│   ├── forms/                   # Form components
│   │   ├── JobDescriptionForm.tsx
│   │   └── LoginForm.tsx
│   ├── candidates/              # Candidate-related components
│   │   ├── SpecialistCard.tsx  # Candidate summary card
│   │   ├── SpecialistGrid.tsx  # Responsive grid layout
│   │   └── SpecialistProfile.tsx # Detailed profile view
│   └── search/                  # Search and filtering
│       └── SearchFilters.tsx    # Advanced filters component
├── lib/
│   ├── store.ts                # Zustand state management
│   ├── types.ts                # TypeScript interfaces
│   ├── utils.ts                # Utility functions
│   └── mock-data.ts            # Mock candidate data
└── components/ui/              # ShadCN UI components
```

## 🎯 Key Components

### 1. JobDescriptionForm
- **Purpose**: Collects job requirements from recruiters
- **Features**: Form validation, skill tagging, real-time validation
- **State**: Uses React Hook Form with Zod schema validation

### 2. LoginForm
- **Purpose**: User authentication interface
- **Features**: Email/password validation, demo credentials, loading states
- **Security**: Form validation with error handling

### 3. SpecialistCard
- **Purpose**: Displays candidate summary in grid view
- **Features**: Match score visualization, skill badges, contact actions
- **Responsive**: Optimized for all screen sizes

### 4. SpecialistGrid
- **Purpose**: Responsive grid layout for candidate cards
- **Features**: Loading skeletons, empty states, responsive breakpoints
- **Performance**: Efficient rendering with proper key handling

### 5. SpecialistProfile
- **Purpose**: Detailed candidate information page
- **Features**: Complete work history, education, skills, contact info
- **Layout**: Two-column responsive layout with contact sidebar

### 6. SearchFilters
- **Purpose**: Advanced filtering and search functionality
- **Features**: Text search, experience range, skills filtering, match score
- **State**: Real-time filtering with Zustand store integration

## 🔄 State Management

The application uses Zustand for state management with the following key stores:

- **Authentication**: User login/logout, session persistence
- **Job Description**: Current job requirements and specifications
- **Candidates**: Candidate data, search results, selected candidate
- **Search & Filters**: Search query, active filters, filtered results
- **UI State**: Loading states, error handling

## 🎨 Design System

### Color Palette
- **Primary**: Blue (#3B82F6) - Trust and professionalism
- **Secondary**: Teal (#14B8A6) - Growth and innovation  
- **Accent**: Orange (#F97316) - Energy and action
- **Neutral**: Gray scale for content hierarchy
- **Semantic**: Success, warning, and error states

### Typography
- **Font**: Inter for excellent readability
- **Hierarchy**: Consistent sizing from h1 (3xl) to body text
- **Line Height**: 150% for body text, 120% for headings

### Spacing System
- **Base Unit**: 8px grid system
- **Components**: Consistent padding and margins
- **Layout**: Proper visual hierarchy and white space

## 📱 Responsive Design

### Breakpoints
- **Mobile**: < 768px - Single column, touch-friendly
- **Tablet**: 768px - 1024px - Two-column layout
- **Desktop**: > 1024px - Full three-column layout

### Mobile-First Approach
- Designed for mobile experience first
- Progressive enhancement for larger screens
- Touch-friendly interactions and sizing

## ♿ Accessibility Features

- **Keyboard Navigation**: Full keyboard accessibility
- **Screen Reader Support**: Proper ARIA labels and roles
- **Color Contrast**: WCAG AA compliant color ratios
- **Focus Management**: Clear focus indicators
- **Semantic HTML**: Proper heading hierarchy and landmarks

## 🚀 Performance Optimizations

- **Code Splitting**: Automatic route-based splitting
- **Lazy Loading**: Components loaded on demand
- **Image Optimization**: Next.js image optimization
- **Bundle Size**: Efficient component imports
- **State Persistence**: Local storage for user preferences

## 🧪 Implementation Plan

### Phase 1: Foundation (Week 1)
1. Set up Next.js project with TypeScript
2. Configure ShadCN/UI and Tailwind CSS
3. Implement basic routing structure
4. Create layout components and navigation

### Phase 2: Authentication (Week 1)
1. Build login form with validation
2. Implement authentication state management
3. Add protected route handling
4. Create user session persistence

### Phase 3: Job Description (Week 2)
1. Design and build job description form
2. Implement form validation and error handling
3. Add skill tagging functionality
4. Connect form to state management

### Phase 4: Candidate Search (Week 2-3)
1. Create candidate card components
2. Build responsive grid layout
3. Implement search and filtering system
4. Add loading states and error handling

### Phase 5: Candidate Profiles (Week 3)
1. Design detailed profile layout
2. Implement candidate profile components
3. Add contact functionality
4. Create navigation between views

### Phase 6: Polish & Testing (Week 4)
1. Responsive design testing
2. Accessibility audit and improvements
3. Performance optimization
4. User experience refinements

## 🔧 Getting Started

1. **Clone and Install**:
   ```bash
   git clone <repository>
   cd candidate-search-app
   npm install
   ```

2. **Environment Variables**:
   Create a `.env.local` file in the root of the project and add the following variables:
   ```
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your_secret
   BACKEND_URL=https://imarketplacematching-main.iconicompany.icncd.ru/api
   ```

3. **Development Server**:
   ```bash
   npm run dev
   ```

4. **Build for Production**:
   ```bash
   npm run build
   npm start
   ```

## 📝 Demo Credentials

For testing the application:
- **Email**: demo@example.com
- **Password**: password

Or use any valid email format with a password of at least 6 characters.

## 🎯 Future Enhancements

- Real-time chat with candidates
- Video interview scheduling
- Advanced analytics dashboard
- Team collaboration features
- Integration with ATS systems
- Mobile application
- AI-powered candidate recommendations