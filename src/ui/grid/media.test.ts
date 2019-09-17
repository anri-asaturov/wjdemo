import { css } from 'styled-components';
import { MD, XS, SM, LG } from './media';
import { lightTheme } from '../../style/themes';

test('media queries', () => {
  const expected =
    '["\\n    color: green;\\n    ","\\n    @media ","only screen and (min-width: 30.0625rem)"," {\\n      ","\\n        color:red;\\n    ","\\n    }\\n  ","\\n    ","\\n    @media ","only screen and (min-width: 48.0625rem)"," {\\n      ","\\n        color:red;\\n    ","\\n    }\\n  ","\\n    ","\\n    @media ","only screen and (min-width: 64.0625rem)"," {\\n      ","\\n        color:white;\\n    ","\\n    }\\n  ","\\n    ","\\n    @media ","only screen and (min-width: 90.0625rem)"," {\\n      ","\\n        color:black;\\n    ","\\n    }\\n  ","\\n  "]';
  const style = css`
    color: green;
    ${XS`
        color:red;
    `}
    ${SM`
        color:red;
    `}
    ${MD`
        color:white;
    `}
    ${LG`
        color:black;
    `}
  `;
  const actual = JSON.stringify(
    style.map(s => (typeof s === 'function' ? s({ theme: lightTheme }) : s))
  );
  expect(actual).toBe(expected);
});
