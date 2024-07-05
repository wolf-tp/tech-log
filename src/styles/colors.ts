import {
  gray,
  blue,
  red,
  green,
  grayDark,
  blueDark,
  redDark,
  greenDark,
  indigo,
  indigoDark,
} from "@radix-ui/colors"

export type Colors = typeof colors.light & typeof colors.dark

const lightCodeBlockTheme = {
  "mono-1": "hsl(230, 8%, 24%)",
  "mono-2": "hsl(230, 6%, 44%)",
  "mono-3": "hsl(220, 14%, 71%)",
  "hue-1": "hsl(198, 99%, 37%)",
  "hue-2": "hsl(221, 87%, 60%)",
  "hue-3": "hsl(301, 63%, 40%)",
  "hue-4": "hsl(119, 34%, 47%)",
  "hue-5": "hsl(5, 74%, 59%)",
  "hue-5-2": "hsl(344, 84%, 43%)",
  "hue-6": "hsl(35, 99%, 36%)",
  "hue-6-2": "hsl(35, 99%, 40%)",
  "syntax-fg": "hsl(230, 8%, 24%)",
  "syntax-bg": "rgba(248, 249, 250)",
  "syntax-bg-mobile": "rgba(242, 243, 244)",
  "syntax-gutter": "hsl(230, 1%, 62%)",
  "syntax-guide": "hsla(230, 8%, 24%, 0.2)",
  "syntax-accent": "hsl(230, 100%, 66%)",
  "syntax-selection-color": "hsl(230, 1%, 90%)",
  "syntax-gutter-background-color-selected": "hsl(230, 1%, 90%)",
  "syntax-cursor-line": "hsla(230, 8%, 24%, 0.05)",
}
// hihi
const darkCodeBlockTheme = {
  "mono-1": "hsl(220, 14%, 71%)",
  "mono-2": "hsl(220, 9%, 55%)",
  "mono-3": "hsl(220, 10%, 40%)",
  "hue-1": "hsl(187, 47%, 55%)",
  "hue-2": "hsl(207, 82%, 66%)",
  "hue-3": "hsl(286, 60%, 67%)",
  "hue-4": "hsl(95, 38%, 62%)",
  "hue-5": "hsl(355, 65%, 65%)",
  "hue-5-2": "hsl(5, 48%, 51%)",
  "hue-6": "hsl(29, 54%, 61%)",
  "hue-6-2": "hsl(39, 67%, 69%)",
  "syntax-fg": "hsl(220, 14%, 71%)",
  "syntax-bg": "hsl(220, 13%, 18%)",
  "syntax-bg-mobile": "hsl(220, 13%, 18%)",
  "syntax-gutter": "hsl(220, 14%, 45%)",
  "syntax-guide": "hsla(220, 14%, 71%, 0.15)",
  "syntax-accent": "hsl(220, 100%, 66%)",
  "syntax-selection-color": "hsl(220, 13%, 28%)",
  "syntax-gutter-background-color-selected": "hsl(220, 13%, 26%)",
  "syntax-cursor-line": "hsla(220, 100%, 80%, 0.04)",
}

export const colors = {
  light: {
    ...indigo,
    ...gray,
    ...blue,
    ...red,
    ...green,
    ...lightCodeBlockTheme,
  },
  dark: {
    ...indigoDark,
    ...grayDark,
    ...blueDark,
    ...redDark,
    ...greenDark,
    ...darkCodeBlockTheme,
  },
}
