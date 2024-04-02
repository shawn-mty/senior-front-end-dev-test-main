## Vue School Code Challenge Reflection

### Data Fetching Strategy

- **Current Approach**: Utilization of `useFetch` and `$fetch` for data fetching on the blog post cards page.
- **Enhancement**: Explore `useFetch` with `server: false` to replace $fetch for potentially cleaner syntax.

### Environment Configuration with Dotenv

- **Current Approach**: Hardcoding URLs and other environment-specific settings.
- **Enhancement**: Implement `dotenv` for managing environment variables for example like the base url that would go into the seo config.

### Consistent Testing Data with Playwright

- **Current Approach**: Generation of e2e test data with `fakerjs`, leading to inconsistency across different testing environments.
- **Enhancement**: Develop a script for seeding the database with consistent data to ensure reproducibility and reliability of tests for whoever uses this project and for proper use in CI.

### Mobile Testing Enhancements

- **Current Approach**: Basic desktop testing without specific emphasis on mobile experiences.
- **Enhancement**: Extend the testing suite to include mobile-specific scenarios, leveraging Playwright for simulating mobile devices.

### Conclusion

I did my best while considering other duties and obligations I had this week. I hope you like it!
