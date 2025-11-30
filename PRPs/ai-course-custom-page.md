# PRP: Custom AI Course Landing Page

## Feature Overview

Create a custom, visually distinct course detail page for a specific course (checking by slug). This page will replace the standard course detail page layout with a modern, marketing-focused design featuring:

- Animated hero section with code editor simulation
- Comparison section (traditional vs AI-powered development)
- Tools showcase section (GitHub Copilot, Cursor IDE, Claude Code)
- Interactive course content accordion
- Persona-based targeting section
- Pricing section with ROI calculator
- FAQ accordion
- Reviews integration (static featured + all reviews)
- Multiple CTAs throughout the page
- Sticky purchase button

## Context & Research Findings

### Codebase Architecture

**Current Implementation**: `src/pages/kurzy/[slug]/index.tsx`

- Line 246-248: Already has conditional check for `courseOverview.slug === 'informatika-101'`
- Uses SSG with `getStaticProps` and `getStaticPaths`
- Receives `CourseOverview` type from backend API
- Wrapped in `UserAndQueryGuard` for auth handling

**Component Location**: `src/components/misc/ai-page/` (already created, empty)

**Data Structure** (from `src/types.ts`):

```typescript
CourseOverview {
  id, name, slug, shortDescription, longDescription
  chapters: ChapterOverview[] // contains lectures with names, durations, types
  author: Author // name, slug, imageUrl
  difficulty: Difficulty // name, skillLevel
  courseDurationMinutes: number
  reviewsOverview: CourseReviewsOverview
  courseProducts: CourseProduct[]
  trailerUrl, thumbnailUrl, iconUrl
}
```

### Styling System

**Theme** (`src/theme/theme.ts`):

- Light: `primaryColor: 'white'`, `secondaryColor: '#212121'`, `accentColor: '#7E50E6'`
- Dark: `primaryColor: '#212121'`, `secondaryColor: '#efefef'`, `accentColor: '#7E50E6'`
- Uses CSS custom properties: `var(--color-primary)`, `var(--color-secondary)`, `var(--color-accent)`
- Access via `useTheme()` hook from `src/hooks/useTheme.tsx`

**Core Components** (`src/components/core/`):

- `Heading`: variants h1-h6, supports color, align, withAccentUnderline
- `Text`: size (very-small|small|default|large), weight, color
- `Flex`: direction, gap, justifyContent, alignItems
- `Button`: existing button component
- `BackLink`: for navigation back to courses
- `Avatar`, `Rating`: for author and reviews
- Responsive breakpoints in `src/theme/device.ts`

**Styling Approach**:

- Uses `styled-components` (NOT Tailwind CSS)
- NO Material UI for new components
- Responsive via media queries with `device` breakpoints

### Design Prototype Analysis

**Source**: `new-design/code/code.txt` + `new-design/dark/*.png` + `new-design/light/*.png`

- Uses framer-motion, Tailwind CSS, shadcn/ui (NOT in current project)
- Must adapt to styled-components + existing component patterns
- Has @radix-ui/react-accordion (ALREADY in package.json v0.1.6)

**Sections** (top to bottom, as shown in part1-part8):

1. Hero with animated code editor (part1)
2. Comparison: "Bez AI nástrojov" vs "S AI nástrojmi" (part2)
3. Tools section: 3 cards for GitHub Copilot, Cursor, Claude Code (part3)
4. Course content accordion with 7 modules (part4)
5. Personas: Junior, Senior, Tech Lead (part5)
6. Pricing with features and ROI (part6)
7. FAQ accordion (part7)
8. Final CTA section (part8)

### Key Prototype Content

**FAQs** (from code.txt lines 495-516):

```javascript
const faqs = [
  {question: 'Pre koho je kurz určený?', answer: '...'},
  {question: 'Čo všetko získam?', answer: '...'},
  {question: 'Máme záujem o firemné školenie', answer: '...'},
  {question: 'Ako dlho budem mať prístup ku kurzu?', answer: '...'},
  {question: 'Ako môžem platiť?', answer: '...'},
]
```

**Course Modules** (lines 298-400):

- 7 modules with icon, title, lessons count, duration, topics
- Module 2 marked as "popular"
- Icons: BookOpen, Code, Target, Bot, Zap, Wrench, CheckCircle2

**Comparison Content** (lines 147-289):

- Without AI: 8h per feature, Stack Overflow hunting, Debugging hell
- With AI: 2h per feature, AI assistant in IDE, Auto code review

### Existing Components to Reuse

**Reviews**: `src/components/domain/course-review/CourseReviews.tsx`

- Already fetches and displays course reviews
- Can be integrated at bottom of custom page
- Use existing `CourseReviews` component

**Course Content**: Render chapters dynamically from backend

- Use `courseOverview.chapters` array
- Each chapter has `name`, `chapterDurationMinutes`, `lectures[]`
- Lectures have `name`, `videoDurationSeconds`, `lectureType`

**No Existing FAQ System**: Must create from scratch

## Technical Implementation Plan

### Architecture Approach

```
src/pages/kurzy/[slug]/index.tsx
  └─> if (courseOverview.slug === 'TARGET_SLUG') {
        return <AiCoursePage courseOverview={courseOverview} />
      }

src/components/misc/ai-page/
  ├─ index.tsx              // Main component, exports AiCoursePage
  ├─ HeroSection.tsx        // Hero with animated code editor
  ├─ ComparisonSection.tsx  // Traditional vs AI comparison
  ├─ ToolsSection.tsx       // 3 tool cards
  ├─ CourseContentSection.tsx  // Accordion of chapters from backend
  ├─ PersonasSection.tsx    // Junior/Senior/Tech Lead
  ├─ PricingSection.tsx     // Price, features, ROI
  ├─ FAQSection.tsx         // FAQ accordion
  ├─ FinalCTA.tsx           // Bottom CTA
  ├─ StickyButton.tsx       // Sticky purchase button
  └─ AnimatedCodeEditor.tsx // Typewriter animation
```

### Component Implementation Details

#### 1. AnimatedCodeEditor Component

**Purpose**: Simulate typing code with animation (hero section)
**Implementation**:

```typescript
// Use React useState + useEffect with setTimeout
// Animate typing: "function sum(a: number, b: number) { return a + b; }"
// NO framer-motion (not installed) - use CSS animations or pure React
// styled-components for code editor UI (border, background, line numbers)
```

#### 2. Accordion Components

**Library**: `@radix-ui/react-accordion` (already installed)
**Usage**:

```typescript
import * as RadixAccordion from '@radix-ui/react-accordion'
// Wrap with styled-components for custom styling
```

#### 3. Dynamic Course Content Section

**Data Source**: `courseOverview.chapters`

```typescript
courseOverview.chapters.map((chapter) => (
  <AccordionItem key={chapter.id}>
    <AccordionTrigger>
      {chapter.name} | {chapter.lectures.length} lekcií |{' '}
      {formatDuration(chapter.chapterDurationMinutes)}
    </AccordionTrigger>
    <AccordionContent>
      {chapter.lectures.map((lecture) => (
        <div key={lecture.id}>{lecture.name}</div>
      ))}
    </AccordionContent>
  </AccordionItem>
))
```

#### 4. Static FAQ Section

**Data**: Hardcoded FAQ array (from prototype)
**Implementation**: Same accordion pattern as course content

#### 5. Styling Patterns

**Gradient Border Effect** (from prototype):

```css
// Tailwind version uses: gradient-border class with ::before pseudo-element
// Adapt to styled-components:
const GradientBorder = styled.div`
  position: relative;
  background: var(--color-primary);
  border-radius: 12px;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 12px;
    padding: 2px;
    background: linear-gradient(135deg, var(--color-accent), #4169E1, #00CED1);
    mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    mask-composite: exclude;
  }
`
```

**Text Gradient** (for headings):

```css
const GradientText = styled.span`
  background: linear-gradient(135deg, #7E50E6, #4169E1, #00CED1);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`
```

**Theme-Aware Animations**:

```typescript
// Check current theme with useTheme() hook
const {theme} = useTheme()
// Adjust colors based on theme.type === 'DARK' or 'LIGHT'
```

#### 6. Icons

**Prototype uses**: lucide-react icons
**Available in project**: react-icons
**Mapping**:

- `Zap` → `AiOutlineThunderbolt` or custom SVG
- `Target` → `AiOutlineAim`
- `BookOpen` → `AiOutlineBook`
- `Code` → `AiOutlineCode`
- `Check` → `AiOutlineCheck`
- Or use Material UI icons from @mui/icons-material

#### 7. Responsive Design

**Breakpoints** (from `src/theme/device.ts`):

```typescript
device.XL // > 1920px
device.L // > 1280px
device.M // > 1024px
device.S // > 768px
device.XS // > 0px
```

**Pattern**:

```typescript
const ResponsiveGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;

  @media ${device.M} {
    grid-template-columns: repeat(2, 1fr);
  }

  @media ${device.L} {
    grid-template-columns: repeat(3, 1fr);
  }
`
```

#### 8. CTAs and Purchase Integration

**Existing**: `CourseCTAButton` component (`src/components/domain/course/CourseCTAButton.tsx`)
**Approach**: Study existing implementation, create styled variant for new design
**Purchase Flow**: Links to `/checkout/[courseSlug]/[courseProductId]`

#### 9. Reviews Integration

**Approach**:

- Create static featured reviews section (3-4 hardcoded reviews)
- Below that, integrate existing `<CourseReviews courseOverview={courseOverview} />` component
- Use `innerRef` prop if needed for scroll behavior

### Error Handling & Edge Cases

1. **Missing Data**: Gracefully handle if `courseOverview.chapters` is empty
2. **Theme Switching**: Ensure all colors adapt to light/dark theme
3. **Mobile Layout**: Test accordion, buttons, and sticky elements on mobile
4. **SSR Compatibility**: NO client-only features (localStorage, window) outside useEffect
5. **TypeScript**: Properly type all props and data structures

### Dependencies Check

**Already Available**:

- styled-components ✓
- @radix-ui/react-accordion ✓
- react-icons ✓
- next/image ✓

**NOT Available** (do NOT use):

- framer-motion ✗
- tailwindcss ✗
- lucide-react ✗

**Workarounds**:

- Use CSS keyframe animations instead of framer-motion
- Use styled-components instead of Tailwind
- Use react-icons instead of lucide-react

## Implementation Blueprint (Pseudocode)

```typescript
// 1. Main Entry Point
// File: src/components/misc/ai-page/index.tsx
export const AiCoursePage: React.FC<{courseOverview: CourseOverview}> = ({
  courseOverview,
}) => {
  return (
    <>
      <NavBar />
      <PageContentWrapper>
        <BackLink to={routes.kurzy.index} text="Späť na kurzy" />
        <HeroSection courseOverview={courseOverview} />
        <ComparisonSection />
        <ToolsSection />
        <CourseContentSection courseOverview={courseOverview} />
        <PersonasSection />
        <PricingSection courseOverview={courseOverview} />
        <FAQSection />
        <CourseReviews courseOverview={courseOverview} />
        <FinalCTA courseOverview={courseOverview} />
        <StickyButton courseOverview={courseOverview} />
      </PageContentWrapper>
    </>
  )
}

// 2. AnimatedCodeEditor
// File: src/components/misc/ai-page/AnimatedCodeEditor.tsx
const AnimatedCodeEditor: React.FC = () => {
  const [code, setCode] = useState(initialCode)

  useEffect(() => {
    // Typewriter animation logic
    let currentLine = 1
    let currentChar = 0

    const typeCode = () => {
      // Implement character-by-character typing
      // setTimeout for animation timing
    }

    const timer = setTimeout(typeCode, 1000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <CodeEditorWrapper>
      <EditorHeader>
        <TrafficLights />
        <FileName>sum.ts</FileName>
      </EditorHeader>
      <CodeContent>
        {code.map((line, i) => (
          <CodeLine key={i}>
            <LineNumber>{i + 1}</LineNumber>
            <LineContent>{line}</LineContent>
          </CodeLine>
        ))}
      </CodeContent>
    </CodeEditorWrapper>
  )
}

// 3. Course Content Section with Backend Data
// File: src/components/misc/ai-page/CourseContentSection.tsx
import * as Accordion from '@radix-ui/react-accordion'

const CourseContentSection: React.FC<{courseOverview: CourseOverview}> = ({
  courseOverview,
}) => {
  const totalLectures = courseOverview.chapters.reduce(
    (sum, ch) => sum + ch.lectures.length,
    0,
  )
  const totalDuration = courseOverview.courseDurationMinutes

  return (
    <SectionWrapper>
      <Heading variant="h2">Čo kurz obsahuje?</Heading>
      <Text>
        {totalLectures} lekcií | {formatDuration(totalDuration)}
      </Text>

      <StyledAccordion type="single" collapsible>
        {courseOverview.chapters.map((chapter) => (
          <AccordionItem key={chapter.id} value={`chapter-${chapter.id}`}>
            <AccordionTrigger>
              <Flex gap="12px" alignItems="center">
                <IconWrapper>{/* Chapter icon */}</IconWrapper>
                <div>
                  <Heading variant="h4">{chapter.name}</Heading>
                  <Text size="small">
                    {chapter.lectures.length} lekcií |{' '}
                    {formatDuration(chapter.chapterDurationMinutes)}
                  </Text>
                </div>
              </Flex>
            </AccordionTrigger>
            <AccordionContent>
              {chapter.lectures.map((lecture) => (
                <LectureItem key={lecture.id}>{lecture.name}</LectureItem>
              ))}
            </AccordionContent>
          </AccordionItem>
        ))}
      </StyledAccordion>
    </SectionWrapper>
  )
}

// 4. FAQ Section with Static Data
// File: src/components/misc/ai-page/FAQSection.tsx
const faqs = [
  {
    question: 'Pre koho je kurz určený?',
    answer: 'Kurz je určený pre vývojárov...',
  },
  // ... rest from prototype
]

const FAQSection: React.FC = () => {
  return (
    <SectionWrapper>
      <Heading variant="h2">Časté otázky</Heading>
      <StyledAccordion type="single" collapsible>
        {faqs.map((faq, index) => (
          <AccordionItem key={index} value={`faq-${index}`}>
            <AccordionTrigger>
              <Text>❓ {faq.question}</Text>
            </AccordionTrigger>
            <AccordionContent>
              <Text color="secondary">{faq.answer}</Text>
            </AccordionContent>
          </AccordionItem>
        ))}
      </StyledAccordion>
    </SectionWrapper>
  )
}

// 5. Styling Example
const StyledAccordion = styled(Accordion.Root)`
  display: flex;
  flex-direction: column;
  gap: 16px;
`

const AccordionItem = styled(Accordion.Item)`
  position: relative;
  background: var(--color-primary);
  border-radius: 12px;
  overflow: hidden;

  // Gradient border effect
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 12px;
    padding: 2px;
    background: linear-gradient(135deg, var(--color-accent), #4169e1, #00ced1);
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(
        #fff 0 0
      );
    mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
  }
`
```

## Validation Gates (Executable)

After implementation, run these commands to ensure code quality:

```bash
# 1. TypeScript type checking
yarn tsc

# 2. Linting
yarn lint

# 3. Format checking
yarn prettier:check

# 4. Full test suite
yarn test

# 5. Build verification
yarn build
```

**Manual Testing Checklist**:

- [ ] Page renders for correct course slug
- [ ] Standard page renders for other courses
- [ ] Light/dark theme toggle works
- [ ] All sections visible and styled correctly
- [ ] Accordion interactions work (course content, FAQ)
- [ ] Responsive design on mobile, tablet, desktop
- [ ] CTA buttons link correctly
- [ ] Reviews section displays
- [ ] Sticky button appears on scroll
- [ ] No console errors
- [ ] Backend data (chapters, lectures, author) displays correctly

## Implementation Tasks (In Order)

1. **Create base file structure**

   - Create `src/components/misc/ai-page/index.tsx`
   - Export `AiCoursePage` component
   - Update `src/pages/kurzy/[slug]/index.tsx` to conditionally render

2. **Implement AnimatedCodeEditor component**

   - Create typewriter animation logic
   - Style code editor with line numbers, syntax highlighting
   - Ensure animation loops correctly

3. **Create static content sections**

   - ComparisonSection (Without AI vs With AI)
   - ToolsSection (3 tool cards)
   - PersonasSection (Junior/Senior/Tech Lead)
   - FinalCTA section

4. **Implement accordion components**

   - Create shared StyledAccordion wrapper
   - FAQSection with static data
   - Ensure @radix-ui/react-accordion is properly imported

5. **Implement dynamic CourseContentSection**

   - Map over `courseOverview.chapters`
   - Display lectures in accordion
   - Calculate and display totals

6. **Implement HeroSection**

   - Integrate AnimatedCodeEditor
   - Display course name, description
   - Add CTAs
   - Show author, duration, ratings

7. **Implement PricingSection**

   - Display course price from `courseOverview.courseProducts`
   - Show features list
   - ROI calculator component
   - Purchase CTA

8. **Implement StickyButton**

   - Show/hide based on scroll position
   - Purchase CTA with price
   - Mobile vs desktop variants

9. **Integrate reviews**

   - Create static featured reviews section
   - Integrate existing `<CourseReviews>` component below

10. **Styling and theming**

    - Apply gradient borders throughout
    - Implement gradient text effects
    - Ensure theme compatibility (light/dark)
    - Add responsive breakpoints

11. **Polish and animations**

    - Add CSS keyframe animations (fade-in, slide-in)
    - Hover effects on cards
    - Smooth scrolling for anchor links
    - Loading states if needed

12. **Testing and bug fixes**
    - Run validation gates
    - Test on different screen sizes
    - Verify TypeScript types
    - Fix any linting issues

## Critical Context References

### Files to Study

- `src/pages/kurzy/[slug]/index.tsx` (lines 246-248) - Conditional rendering location
- `src/types.ts` - CourseOverview type definition
- `src/theme/theme.ts` - Color system and theme structure
- `src/components/core/Heading.tsx` - Heading component API
- `src/components/core/Text.tsx` - Text component API
- `src/components/domain/course-review/CourseReviews.tsx` - Reviews integration
- `new-design/code/code.txt` - Full prototype code for reference

### Design References

- `new-design/dark/part1-8.png` - Dark theme UI reference
- `new-design/light/part1-8.png` - Light theme UI reference

### External Documentation

- Radix UI Accordion: https://www.radix-ui.com/docs/primitives/components/accordion
- styled-components: https://styled-components.com/docs
- Next.js Image: https://nextjs.org/docs/api-reference/next/image

### Common Pitfalls

1. **Don't use framer-motion** - Not installed, use CSS animations
2. **Don't use Tailwind classes** - Use styled-components
3. **Don't use lucide-react** - Use react-icons or @mui/icons-material
4. **Theme colors** - Always use `var(--color-*)` CSS variables
5. **SSR compatibility** - No window/localStorage outside useEffect
6. **TypeScript** - Ensure all props typed, no implicit any

### Code Style Conventions

- Component files: PascalCase (e.g., `HeroSection.tsx`)
- Styled components: Suffix with "Styled" or descriptive name
- Props interface: Define at top of file
- Export default for main component
- Use Flex component for layouts
- Slovak language for user-facing text

## Success Criteria

✅ Custom page renders for target course slug
✅ Standard page renders for all other courses
✅ All sections match design prototype
✅ Dynamic data (chapters, lectures) displays correctly
✅ Both light and dark themes work perfectly
✅ Responsive on all screen sizes
✅ No TypeScript errors
✅ All validation gates pass
✅ No console errors or warnings
✅ Course purchase flow works correctly

---

## PRP Quality Score: **9/10**

**Confidence Level**: Very High

**Reasoning**:

- ✅ Complete codebase analysis with specific file references
- ✅ Design prototype fully analyzed with 8 UI sections documented
- ✅ All data structures and types identified
- ✅ Styling system completely understood (styled-components + theme)
- ✅ Existing components and patterns documented
- ✅ Clear implementation path with pseudocode
- ✅ Dependency compatibility verified (radix-ui available, framer-motion NOT)
- ✅ Validation gates defined and executable
- ✅ Common pitfalls identified and documented
- ⚠️ Minor uncertainty: Exact course slug to use (mentioned in INITIAL.md as "different from informatika-101")

**Why not 10/10**: User needs to specify the actual course slug to use, though the conditional structure is already in place.

**Estimated Implementation Time**: 6-8 hours for experienced developer

**One-Pass Success Probability**: 85-90% with this PRP
