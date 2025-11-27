# Housing Benefit Check

A high-conversion roofing lead generation website built with Next.js, featuring:

- **Fintech-inspired design** with premium aesthetics
- **Smart multi-step form** with psychological triggers
- **Dynamic SEO routing** for thousands of city-specific landing pages
- **IP-based personalization** using Vercel geolocation
- **Smooth animations** powered by Framer Motion

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui (Radix UI primitives)
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **TypeScript**: Full type safety

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Install dependencies:

   ```bash
   npm install
   ```

2. (Optional) Process city data for dynamic routing:

   ```bash
   node scripts/process-cities.js
   ```

3. Run the development server:

   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000)

## Project Structure

```
├── app/
│   ├── [state]/[city]/page.tsx    # Dynamic city pages
│   ├── page.tsx                    # Main landing page
│   ├── layout.tsx                  # Root layout
│   └── globals.css                 # Global styles
├── components/
│   ├── Hero.tsx                    # Hero section with personalization
│   ├── BenefitForm.tsx            # Multi-step form
│   ├── AnalysisLoader.tsx         # Fake analysis animation
│   └── ui/                         # shadcn components
├── lib/
│   ├── locations.ts                # Location data and helpers
│   └── utils.ts                    # Utility functions
├── middleware.ts                   # IP geolocation middleware
└── scripts/
    └── process-cities.js           # City data processor
```

## Features

### Multi-Step Form

- ZIP code validation with visual feedback
- Homeowner verification
- Utility provider selection
- Issue assessment
- Fake analysis loader (builds trust)
- Lead capture with eligibility confirmation

### Dynamic Routing (pSEO)

Generate SEO-optimized landing pages for every city:

- `/texas/austin` - Austin-specific page
- `/florida/miami` - Miami-specific page
- Automatic metadata generation
- Custom messaging per location

### IP Personalization

Uses Vercel Edge middleware to:

- Detect visitor's city/region
- Show location-specific messaging
- Display relevant program names
- Customize social proof

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import to Vercel
3. Deploy

Vercel automatically provides:

- Geolocation headers
- Edge functions
- Automatic optimization

### Other Platforms

For other platforms, you'll need to:

- Implement custom geolocation (or mock it)
- Ensure Edge/Middleware support
- Configure build commands

## Customization

### Adding States/Cities

Edit `lib/locations.ts`:

```typescript
export const LOCATIONS: Record<string, StateProgramData> = {
  yourstate: {
    name: "Your State",
    programName: "State Program Name",
    cities: ["city-1", "city-2"],
    utility: "Utility Company",
    insurers: ["Insurer 1", "Insurer 2"],
  },
};
```

### Styling

Colors and theme are in `app/globals.css` using CSS variables.

## License

Proprietary - All rights reserved.
