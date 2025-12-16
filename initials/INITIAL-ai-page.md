# GOAL

I want to update course page of one of my course.
I want it to be done in src\pages\kurzy\[slug]\index.tsx
In here if (courseOverview.slug === 'informatika-101') {
// return ai course page content with
}
Although in reality the slug will be different.
I prepared empty src\components\misc\ai-page where you cant create code.

The thing is, that all of the courses has the same ui. The data (course description, course content) is on backend - it is loaded and viewed the same. I want know for my newest course a change - that course will be different. The challenge is that the new components for this course still has to get some data from the backend (course content), but look different, but still use the most of the same colors as are in this app. With both of the themes.

The dynamic part has to be the course content - the chapters and lectures. As well as course duration, author.
As for the reviews - there can be few static reviews and in the bottom all the reviews.
Also use the FAQ questions and answers those we already have.

# Examples

I prototyped the new ui with vibe coding using Lovable.
In the new-design folder there is code.txt which has the generated code of lovable. Also there is dark and light images of part1-part8, which is the ui from top to bottom.
IT is your huge inspiration of content as the ui how it should look.

# Code style

Please study the code, styles and themes. Also the package json and stuff. I want it to compile.

---

# CODEBASE CONTEXT (Added by enhance-initial)

## Entry Point and Integration

The custom AI course page is already wired up in `src/pages/kurzy/[slug]/index.tsx:247-254`:

```tsx
if (courseOverview.slug === 'informatika-101') {
  return (
    <PageContentWrapper>
      <BackLink to={routes.kurzy.index} text={'Spat na kurzy'} />
      <AiCoursePage courseOverview={courseOverview} />
    </PageContentWrapper>
  )
}
```

The empty component shell exists at `src/components/misc/ai-page/index.tsx` - this is where implementation should go.

## Data Types to Use

From `src/types.ts`, the key types are:

- **CourseOverview** (line 63-84): Main course data including `chapters`, `author`, `courseDurationMinutes`, `reviewsOverview`, `courseProducts`
- **ChapterOverview** (line 86-91): Contains `lectures` array and `chapterDurationMinutes`
- **LectureOverview** (line 93-99): Individual lecture with `name`, `videoDurationSeconds`, `lectureType`
- **Author** (line 11-19): Author info with `name`, `slug`, `imageUrl`
- **CourseReview** (line 159-168): Review with `rating`, `text`, `userName`, `imageUrl`

## Theme System

**Theme colors** from `src/theme/theme.ts`:

- `accentColor: '#7E50E6'` (purple - same in both themes)
- Light: `primaryColor: 'white'`, `secondaryColor: '#212121'`
- Dark: `primaryColor: '#212121'`, `secondaryColor: '#efefef'`

Use CSS variables (already set up in app):

- `var(--color-primary)` - background
- `var(--color-secondary)` - text
- `var(--color-accent)` - purple accent
- `var(--color-shadow)` - shadows

**Breakpoints** from `src/theme/device.ts`:

- `device.XS`: max-width 420px
- `device.S`: max-width 720px
- `device.M`: max-width 1024px
- `device.L`: max-width 1366px
- `device.XL`: min-width 1367px

## Existing Core Components to Reuse

Located in `src/components/core/`:

- **Heading** (`Heading.tsx`): Variants h1-h6, supports `normalWeight`, `withAccentUnderline`, `color` prop
- **Text** (`Text.tsx`): Sizes: 'default', 'small', 'very-small', 'large'; colors: 'primary', 'secondary', 'accent', 'danger'
- **Button** (`Button.tsx`): Variants: 'accent', 'default', 'outline', 'danger'; sizes: 'small', 'default', 'large', 'very-large'
- **Flex** (`Flex.tsx`): Flexible container with `direction`, `gap`, `justifyContent`, `alignItems`
- **Avatar** (`Avatar.tsx`): For author images
- **Rating** (`Rating.tsx`): Star ratings display

## Existing Domain Components to Reference/Reuse

- **CourseContent** (`src/components/domain/course/CourseContent.tsx`): Accordion-based chapter/lecture list using `@radix-ui/react-accordion` - use this pattern for course content section
- **CourseReviews** (`src/components/domain/course-review/CourseReviews.tsx`): Reviews display component - can be reused for the reviews section at bottom
- **CourseCTAButton** (`src/components/domain/course/CourseCTAButton.tsx`): Purchase/continue button logic

## Available Dependencies (from package.json)

Already installed and available:

- `@radix-ui/react-accordion` - for collapsible content sections (already used in CourseContent)
- `react-icons` - for icons (already used throughout)
- `styled-components` - for styling (required)
- `@mui/material` / `@mui/icons-material` - MUI components available if needed
- NO framer-motion - the Lovable prototype uses it but it's NOT in package.json (use CSS animations instead)

## Design Reference (new-design folder)

The Lovable prototype in `new-design/code/code.txt` shows these sections (top to bottom):

1. **HeroSection** (part1.png): Title with gradient text, value props with icons, author info, CTA buttons, animated code editor
2. **ComparisonSection** (part2.png): "Bez AI nastrojov" vs "S AI nastrojmi" comparison cards
3. **ToolsSection** (part3.png): GitHub Copilot, Cursor IDE, Claude Code tool cards with badges
4. **CourseContentSection** (part4.png): Accordion with chapters - THIS MUST USE DYNAMIC DATA from courseOverview.chapters
5. **PersonasSection** (part5.png): Junior/Senior/Tech Lead persona cards
6. **PricingSection** (part6.png): Price card with features list and ROI calculator
7. **FAQSection** (part7.png): Accordion FAQ - use existing FAQ questions
8. **FinalCTA** + Reviews (part8.png): Final call to action + reviews section

## Key Implementation Notes

1. **No framer-motion**: Convert Lovable's motion animations to CSS transitions/keyframes
2. **No Tailwind**: Convert Tailwind classes to styled-components using theme variables
3. **Dynamic data**: Course content (chapters, lectures, duration) MUST come from `courseOverview` prop
4. **Reviews**: Use `CourseReviews` component or fetch via `useGetCourseReviews` hook from `src/api/courseReviews.ts`
5. **Author**: Get from `courseOverview.author` (name, imageUrl)
6. **Duration**: Calculate from `courseOverview.courseDurationMinutes` and count lectures from chapters
7. **Price**: Get from `courseOverview.courseProducts[0].price` or use `coursePrice()` helper from `src/components/domain/course/CourseCard.tsx`
8. **Purchase flow**: Use existing `CourseCTAButton` component or link to checkout via `routes.checkout()`

## Suggested File Structure

```
src/components/misc/ai-page/
  index.tsx           # Main component (entry point)
  HeroSection.tsx     # Hero with title, value props, code animation
  ComparisonSection.tsx
  ToolsSection.tsx
  CourseContentSection.tsx  # Dynamic - uses courseOverview.chapters
  PersonasSection.tsx
  PricingSection.tsx  # Dynamic - uses courseOverview.courseProducts
  FAQSection.tsx
  FinalCTA.tsx
  StickyButton.tsx    # Fixed purchase button
  styles.ts           # Shared styled-components (gradient-border, text-gradient, etc.)
```

## Color Mapping (Lovable to Street of Code)

Lovable's design uses similar purple accent. Map these:

- `primary` (purple) -> `var(--color-accent)` (#7E50E6)
- `secondary` (blue) -> Consider using accent or create complementary blue
- `muted-foreground` -> `var(--color-grey)` or secondary with opacity
- `card` background -> slightly offset from `var(--color-primary)`
- `destructive` (red) -> `var(--color-danger)`

## Similar Implementation Pattern

See `src/pages/feedback.tsx` (lines 125-174) for an example of FAQ-style content layout with styled-components. This shows the coding patterns used in this codebase.
