import { createGlobalStyle } from 'styled-components';
import { rgba } from 'polished';

export const GlobalStyle = createGlobalStyle`
  html {
    font-family: ${p => p.theme.font};
    font-size: 62.5%; /* now we can use rem units like font-size: 1.4rem == 14px */
    box-sizing: border-box;
  }

  *, *:before, *:after {
    box-sizing: inherit;
  }
  
  * {
    &:focus {
      outline: none;
    }
  }

  body {
    font-family: 'Roboto', sans-serif;
    font-size: 1.6rem;
    color: ${p => p.theme.color};
    background: ${p => p.theme.background};
    /* I know you're tempted but do not add transition in here, it will stagger all transitions */
  }

  img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
  }

  svg {
    fill: currentColor;
    width: auto;
    height: 100%;
  }

  .svgfill{
    svg {
      width: 100%;
      height: 100%;
    }
  }
 
  a {
    color: inherit;
    text-decoration: none;
    cursor: pointer;

    &:hover{
      color: ${p => p.theme.brandColor}
    }
  }

  input,
  textarea,
  select {
    width: 100%;
    &:focus {
      box-shadow: 0 0 0.3rem 0.1rem ${p => rgba(p.theme.brandColor, 0.8)};
    }
  }

  ::placeholder{
    color: ${p => p.theme.inputPlaceholderColor}
  }

  .nobr {
    white-space: nowrap;
  }

  .theme-transition {
    transition: ${p => p.theme.themeSwitchTransition};
  }
`;
