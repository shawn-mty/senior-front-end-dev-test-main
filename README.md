# Senior Frontend Developer Test

Congrats on making it this far into the application process! 

# Preparation

Upload this code to a PRIVATE repository on GitHub.

## Goal

The goal of this test is to ensure your proficiency with

1. Tailwind CSS
2. Vue
3. Nuxt
4. TypeScript

We also want to give you the chance to demonstrate techniques you would use to:

1. Maximize application performance
2. Ensure good site SEO
3. Test Vue components

## Setup Process

### Step 1 - Get Application Running Locally

```bash
# Install deps
npm install

# Start up dev server
npm run dev
```

### Step 2 - Setup the Database

Visit the running application in the browser and click the "Setup Database" button.

## The Challenge

The application you'll be building for this test is the front end of a blogging platform. The api endpoints are documented within the `docs` directory.

You should code out the following features:

1. A listing of all the blog posts at `/posts`
   a. The results should be paginated 10 to a page (choose the pagination strategy of your choice... ie. traditional button pagination or infinite scroll, etc)
   b. List the posts with performance in mind, only fetching the data needed to display each post
   c. Ensure post images are displayed at the optimal size with NuxtImage
   d. Encapsulate logical page components into Vue components for easy re-use
   e. Supply controls to the user to sort Newest to Oldest or Oldest to Newest
   f. Ensure the sort order works with a query string variable of your choice to enabling sharing of the page with the sort order in tact
2. A dedicated page for each blog post displaying it's content, image, tile, and author
   a. Make sure you address SEO
   b. Once again, consider performance
   c. Show a 404 page for posts that don't exist

## Example

The gif below is a visual example of how we solved the same challenge. Feel free to style similarly or come up with your own look.

![](./docs/images/example.gif)

# Done!

Thank you for completing this challenge. Kindly inform us when you have finished, and we will proceed to review your code. Make sure to add [VueSchoolTester](https://github.com/VueSchoolTester) to the list of collaborators for your private repository.

Best of luck!
