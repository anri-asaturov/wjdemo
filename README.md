#todo

1. consider polyfills:

- https://www.npmjs.com/package/@formatjs/intl-relativetimeformat
- Intl as a whole

2. Rethink app instance injection in app.ts, maybe automate a bit
3. Lazy instantiation of the app pieces
4. 2+ places start/stop same reaction in parallel? track start/stop calls to see when to really stop?

## Environment Variables and runtime

`NODE_ENV: 'production' | 'development'(default)`
affects build type, enables build optimizations etc

`RUNTIME_ENV: 'local_dev'(default) | 'dev' | 'uat' | 'prod'`
gives runtime a hint about where is current code running

helpers/runtime.ts exports all kinds of flags based on these variables.

## Styles

Mobile-first!
Create styles and markup for mobile and adopt for tablet/desktop with media queries.

- use theme.ts for global variables
- use `polished` package for css utilities

## Grid

Number of columns: xs: 4, sm: 8, md: 8, lg: 12, xl: 12

Breakpoints size: xs: 1rem, sm: 48rem, md: 64rem, lg: 90rem, xl: 120rem

media queries for styled components

```
  ${LG`
    font-size: 1.3rem;
  `}
```
