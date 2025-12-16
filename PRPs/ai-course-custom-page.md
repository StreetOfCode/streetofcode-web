# PRP: AI Course Custom Landing Page

## Overview

Create a custom landing page for the AI course that differs from the standard course page template. The page will have a modern, marketing-focused design inspired by a Lovable prototype while integrating with the existing backend data (course content, reviews, pricing).

**Entry Point**: `src/pages/kurzy/[slug]/index.tsx:247-254` - Already wired up for slug `informatika-101`
**Implementation Location**: `src/components/misc/ai-page/`

## Critical Constraints

### Must Use (Already in package.json)

- `styled-components` (^5.3.5) - Required for all styling
- `@radix-ui/react-accordion` (^0.1.6) - For FAQ and course content accordions
- `react-icons` (^4.4.0) - For icons throughout
- `@mui/material` / `@mui/icons-material` - Available if needed

### Must NOT Use

- `framer-motion` - NOT in package.json, must convert to CSS animations/transitions
- Tailwind CSS - Project uses styled-components exclusively
- Any new dependencies without explicit approval

### Theme Integration

Use CSS variables (already defined in app):

```css
var(--color-primary)   /* Background - white/dark */
var(--color-secondary) /* Text color */
var(--color-accent)    /* Purple #7E50E6 */
var(--color-grey)      /* Muted text */
var(--color-danger)    /* Error/destructive red */
var(--color-shadow)    /* Shadows */
```

### Breakpoints (from `src/theme/device.ts`)

```typescript
device.XS: '(max-width: 420px)'
device.S: '(max-width: 720px)'
device.M: '(max-width: 1024px)'
device.L: '(max-width: 1366px)'
device.XL: '(min-width: 1367px)'
```

## Data Flow

### Input Prop

```typescript
interface AiCoursePageProps {
  courseOverview: CourseOverview
}
```

### Dynamic Data to Extract from `courseOverview`

| Data              | Source                                                    | Usage                          |
| ----------------- | --------------------------------------------------------- | ------------------------------ |
| Course title      | `courseOverview.name`                                     | Hero section                   |
| Description       | `courseOverview.shortDescription`                         | Hero subtitle                  |
| Chapters/Lectures | `courseOverview.chapters`                                 | CourseContentSection accordion |
| Total duration    | `courseOverview.courseDurationMinutes`                    | Stats display                  |
| Lecture count     | Calculate from `chapters.flatMap(c => c.lectures).length` | Stats display                  |
| Author name       | `courseOverview.author.name`                              | Hero, author info              |
| Author image      | `courseOverview.author.imageUrl`                          | Avatar display                 |
| Price             | `courseOverview.courseProducts[0]?.price`                 | Pricing section                |
| Product ID        | `courseOverview.courseProducts[0]?.productId`             | Checkout link                  |
| Reviews           | `courseOverview.reviewsOverview`                          | Rating display                 |
| User progress     | `courseOverview.userProgressMetadata`                     | CTA button state               |

### Reviews Data

Use existing hook: `useGetCourseReviews(courseId)` from `src/api/courseReviews.ts`

## File Structure

```
src/components/misc/ai-page/
  index.tsx              # Main AiCoursePage component
  styles.ts              # Shared styled-components (gradients, cards, animations)
  HeroSection.tsx        # Hero with title, value props, animated code editor
  ComparisonSection.tsx  # "Bez AI" vs "S AI" comparison cards
  ToolsSection.tsx       # GitHub Copilot, Cursor, Claude Code cards
  CourseContentSection.tsx # Dynamic accordion from courseOverview.chapters
  PersonasSection.tsx    # Junior/Senior/Tech Lead persona cards
  PricingSection.tsx     # Price card with features, ROI calculator
  FAQSection.tsx         # Accordion FAQ
  FinalCTA.tsx           # Final call-to-action section
  StickyButton.tsx       # Fixed purchase button (appears on scroll)
  AnimatedCodeEditor.tsx # Typing animation component
```

## Component Specifications

### 1. styles.ts - Shared Styles

```typescript
// Key styled utilities to create:

// Gradient text effect (replaces Tailwind's text-gradient)
export const GradientText = styled.span`
  background: linear-gradient(135deg, var(--color-accent), #4f8fef, #00b8d4);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`

// Gradient border card (replaces .gradient-border class)
export const GradientBorderCard = styled.div`
  position: relative;
  background: var(--color-primary);
  border-radius: 16px;
  padding: 32px;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 16px;
    padding: 2px;
    background: linear-gradient(135deg, var(--color-accent), #4f8fef, #00b8d4);
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(
        #fff 0 0
      );
    mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
  }
`

// Section wrapper with consistent padding
export const Section = styled.section`
  padding: 80px 0;
  position: relative;

  @media ${device.S} {
    padding: 48px 0;
  }
`

// Container with max-width
export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
`

// Fade-in animation (replaces framer-motion)
export const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`

export const AnimatedElement = styled.div<{delay?: number}>`
  animation: ${fadeIn} 0.6s ease-out forwards;
  animation-delay: ${(props) => props.delay || 0}ms;
  opacity: 0;
`
```

### 2. index.tsx - Main Component

```typescript
import React from 'react'
import {CourseOverview} from '../../../types'
import HeroSection from './HeroSection'
import ComparisonSection from './ComparisonSection'
import ToolsSection from './ToolsSection'
import CourseContentSection from './CourseContentSection'
import PersonasSection from './PersonasSection'
import PricingSection from './PricingSection'
import FAQSection from './FAQSection'
import FinalCTA from './FinalCTA'
import StickyButton from './StickyButton'
import CourseReviews from '../../domain/course-review/CourseReviews'
import styled from 'styled-components'

interface AiCoursePageProps {
  courseOverview: CourseOverview
}

export const AiCoursePage: React.FC<AiCoursePageProps> = ({courseOverview}) => {
  // Calculate derived data
  const lecturesCount = courseOverview.chapters.flatMap(
    (chapter) => chapter.lectures,
  ).length

  const price = courseOverview.courseProducts[0]?.price || 0
  const productId = courseOverview.courseProducts[0]?.productId

  return (
    <Wrapper>
      <HeroSection
        courseOverview={courseOverview}
        lecturesCount={lecturesCount}
      />
      <ComparisonSection />
      <ToolsSection />
      <CourseContentSection
        chapters={courseOverview.chapters}
        courseDurationMinutes={courseOverview.courseDurationMinutes}
        lecturesCount={lecturesCount}
      />
      <PersonasSection />
      <PricingSection
        price={price}
        productId={productId}
        courseSlug={courseOverview.slug}
        lecturesCount={lecturesCount}
        courseDurationMinutes={courseOverview.courseDurationMinutes}
      />
      <FAQSection />
      <FinalCTA
        price={price}
        productId={productId}
        courseSlug={courseOverview.slug}
      />
      <ReviewsWrapper>
        <CourseReviews courseOverview={courseOverview} />
      </ReviewsWrapper>
      <StickyButton
        price={price}
        productId={productId}
        courseSlug={courseOverview.slug}
      />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  min-height: 100vh;
`

const ReviewsWrapper = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 80px 24px;
`

export default AiCoursePage
```

### 3. HeroSection.tsx

Key requirements:

- Two-column layout (content left, animated code editor right)
- Gradient text for title highlight
- Value proposition icons (use react-icons: `AiOutlineThunderbolt`, `AiOutlineAim`, `AiOutlineRocket`)
- Author info with Avatar component
- Rating display
- CTA buttons linking to checkout and content section
- Responsive: stack vertically on mobile

```typescript
// Props interface
interface HeroSectionProps {
  courseOverview: CourseOverview
  lecturesCount: number
}

// Import existing components:
import Avatar from '../../core/Avatar'
import Button from '../../core/Button'
import Heading from '../../core/Heading'
import Text from '../../core/Text'
import Flex from '../../core/Flex'
import Rating from '../../core/Rating'
import NextLink from '../../core/NextLink'
import {routes} from '../../../routes'
import * as Utils from '../../../utils'
```

### 4. CourseContentSection.tsx - CRITICAL DYNAMIC SECTION

This MUST use dynamic data from `courseOverview.chapters`. Reference the existing `CourseContent` component pattern from `src/components/domain/course/CourseContent.tsx`.

```typescript
interface CourseContentSectionProps {
  chapters: ChapterOverview[]
  courseDurationMinutes: number
  lecturesCount: number
}

// Use @radix-ui/react-accordion exactly like CourseContent.tsx does
import * as Accordion from '@radix-ui/react-accordion'
import {BiChevronDown} from 'react-icons/bi'
import * as Utils from '../../../utils'

// Map chapter data to accordion items
// Show: chapter name, lecture count, duration
// Expand to show lecture list with icons based on lectureType
```

### 5. PricingSection.tsx - DYNAMIC PRICING

```typescript
interface PricingSectionProps {
  price: number
  productId?: string
  courseSlug: string
  lecturesCount: number
  courseDurationMinutes: number
}

// Format price: `${price} €`
// Link to checkout: routes.checkout.courseProduct(courseSlug, productId)
// Calculate ROI based on price
```

### 6. StickyButton.tsx - Scroll-activated CTA

Replace framer-motion scroll detection with native scroll listener:

```typescript
const [isVisible, setIsVisible] = useState(false)

useEffect(() => {
  const handleScroll = () => {
    setIsVisible(window.scrollY > 800)
  }
  window.addEventListener('scroll', handleScroll)
  return () => window.removeEventListener('scroll', handleScroll)
}, [])
```

### 7. AnimatedCodeEditor.tsx - Typing Animation

Convert framer-motion animation to CSS:

- Use `useEffect` with `setTimeout` for typing simulation
- Replace `motion.div` float animation with CSS keyframes
- Keep the same visual effect of code typing line by line

```typescript
// CSS animation for floating effect
const float = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
`

const EditorWrapper = styled.div`
  animation: ${float} 6s ease-in-out infinite;
`
```

### 8. FAQSection.tsx - Static FAQ Content

Use the FAQ questions from the Lovable prototype (Slovak language):

1. "Pre koho je kurz urceny?"
2. "Co vsetko ziskam?"
3. "Mame zaujem o firemne skolenie"
4. "Ako dlho budem mat pristup ku kurzu?"
5. "Ako mozem platit?"

Use Radix accordion pattern from existing CourseContent.tsx.

## Animation Conversion Guide (framer-motion to CSS)

| Framer Motion                     | CSS Equivalent                                                  |
| --------------------------------- | --------------------------------------------------------------- |
| `initial={{ opacity: 0, y: 20 }}` | `opacity: 0; transform: translateY(20px);` in keyframe `from`   |
| `animate={{ opacity: 1, y: 0 }}`  | `opacity: 1; transform: translateY(0);` in keyframe `to`        |
| `whileInView={{ ... }}`           | Use Intersection Observer or just animate on mount              |
| `whileHover={{ y: -8 }}`          | `&:hover { transform: translateY(-8px); }`                      |
| `transition={{ duration: 0.6 }}`  | `transition: all 0.6s ease-out;` or `animation-duration: 0.6s;` |
| `staggerChildren: 0.2`            | Use `animation-delay` with incremental values                   |

## Icon Mapping (lucide-react to react-icons)

| Lovable (lucide) | react-icons equivalent                                |
| ---------------- | ----------------------------------------------------- |
| `Zap`            | `AiOutlineThunderbolt` from `react-icons/ai`          |
| `Target`         | `AiOutlineAim` from `react-icons/ai`                  |
| `Rocket`         | `AiOutlineRocket` from `react-icons/ai`               |
| `Check`          | `AiOutlineCheck` from `react-icons/ai`                |
| `X`              | `AiOutlineClose` from `react-icons/ai`                |
| `Clock`          | `AiOutlineClockCircle` from `react-icons/ai`          |
| `BookOpen`       | `AiOutlineBook` from `react-icons/ai`                 |
| `Bug`            | `AiOutlineBug` from `react-icons/ai`                  |
| `Bot`            | `AiOutlineRobot` from `react-icons/ai`                |
| `Github`         | `AiOutlineGithub` from `react-icons/ai`               |
| `Code`           | `AiOutlineCode` from `react-icons/ai`                 |
| `Sparkles`       | `AiOutlineStar` from `react-icons/ai`                 |
| `GraduationCap`  | `IoSchoolOutline` from `react-icons/io5`              |
| `Briefcase`      | `AiOutlineFundProjectionScreen` from `react-icons/ai` |
| `Users`          | `AiOutlineTeam` from `react-icons/ai`                 |
| `Shield`         | `AiOutlineSafety` from `react-icons/ai`               |
| `Lock`           | `AiOutlineLock` from `react-icons/ai`                 |
| `TrendingUp`     | `AiOutlineRise` from `react-icons/ai`                 |
| `Mail`           | `AiOutlineMail` from `react-icons/ai`                 |
| `ShoppingCart`   | `AiOutlineShoppingCart` from `react-icons/ai`         |
| `ChevronDown`    | `BiChevronDown` from `react-icons/bi` (already used)  |
| `ChevronLeft`    | `BiChevronLeft` from `react-icons/bi`                 |

## Implementation Order

1. **styles.ts** - Create shared styled components (GradientText, GradientBorderCard, Section, Container, animations)
2. **AnimatedCodeEditor.tsx** - Standalone component, can be tested independently
3. **HeroSection.tsx** - Main visual component with author/stats integration
4. **ComparisonSection.tsx** - Static content, gradient border cards
5. **ToolsSection.tsx** - Static content, tool cards with badges
6. **CourseContentSection.tsx** - CRITICAL: Dynamic accordion from courseOverview.chapters
7. **PersonasSection.tsx** - Static persona cards
8. **PricingSection.tsx** - Dynamic pricing from courseOverview.courseProducts
9. **FAQSection.tsx** - Static FAQ accordion
10. **FinalCTA.tsx** - Final call to action with pricing
11. **StickyButton.tsx** - Scroll-activated fixed button
12. **index.tsx** - Wire everything together

## Validation Gates

```bash
# Must pass all checks before PR
yarn tsc          # TypeScript compilation - no errors
yarn lint         # ESLint - no errors
yarn prettier:check  # Formatting check
yarn build        # Production build succeeds
```

## Testing Checklist

- [ ] Page renders without errors for the specific course slug
- [ ] All sections display correctly in both light and dark themes
- [ ] Course content accordion shows real chapter/lecture data
- [ ] Pricing shows correct price from backend
- [ ] CTA buttons link to correct checkout URL
- [ ] Reviews section loads and displays course reviews
- [ ] Sticky button appears after scrolling 800px
- [ ] Responsive layout works on mobile (< 720px)
- [ ] No TypeScript errors
- [ ] No ESLint errors
- [ ] Prettier formatting passes

## Reference Files

| Purpose           | File Path                                                     |
| ----------------- | ------------------------------------------------------------- |
| Accordion pattern | `src/components/domain/course/CourseContent.tsx`              |
| Button component  | `src/components/core/Button.tsx`                              |
| Heading component | `src/components/core/Heading.tsx`                             |
| Text component    | `src/components/core/Text.tsx`                                |
| Flex component    | `src/components/core/Flex.tsx`                                |
| Avatar component  | `src/components/core/Avatar.tsx`                              |
| Rating component  | `src/components/core/Rating.tsx`                              |
| Theme colors      | `src/theme/theme.ts`                                          |
| Breakpoints       | `src/theme/device.ts`                                         |
| Routes            | `src/routes.ts`                                               |
| Types             | `src/types.ts`                                                |
| Reviews component | `src/components/domain/course-review/CourseReviews.tsx`       |
| CTA button logic  | `src/components/domain/course/CourseCTAButton.tsx`            |
| Lovable prototype | `new-design/code/code.txt`                                    |
| Design images     | `new-design/dark/part1-8.png`, `new-design/light/part1-8.png` |

## Color Scheme Reference

From design images and theme:

- Primary accent: `#7E50E6` (purple) - `var(--color-accent)`
- Secondary blue: `#4F8FEF` - for gradients
- Cyan accent: `#00B8D4` - for gradient endpoints
- Success green: `#4CBF6B` - for positive indicators
- Danger red: `#CB2041` - for "without AI" section

## Slovak Text Content

All UI text must be in Slovak. Key phrases from design:

- "Profesionalne programovanie s AI"
- "Updatni svoj sposob programovania s AI nastrojmi"
- "Programuj 3x rychlejsie"
- "Od zakladov po pokrocile techniky"
- "Prakticke projekty v JS/TS, C#, Java"
- "30-dnova zaruka vratenia penazi"
- "Kupit kurz"
- "Pozriet obsah"
- "Aky je rozdiel?"
- "Bez AI nastrojov" / "S AI nastrojmi"
- "Co sa naucis ovladat?"
- "Co kurz obsahuje?"
- "Je tento kurz pre teba?"
- "Caste otazky"
- "Pripraveny stat sa produktivnejsim?"

## Confidence Score: 8/10

**Strengths:**

- Clear entry point and integration pattern already established
- Comprehensive type definitions available
- Existing components to reuse (Accordion, Button, Avatar, etc.)
- Design reference images and code prototype available
- Theme system well-documented

**Risks:**

- Animation conversions from framer-motion may need iteration
- Gradient border effect requires careful CSS (mask-composite browser support)
- Dynamic data integration needs testing with real backend data
- Responsive layout complexity across 8 sections

**Mitigation:**

- Start with static sections, add animations last
- Test gradient borders in both themes early
- Use fallback borders if mask-composite fails
- Build mobile-first for responsive reliability
