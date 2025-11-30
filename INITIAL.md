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
