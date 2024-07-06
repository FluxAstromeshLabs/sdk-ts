export const orange = {
  50: '#FEF9EC',
  100: '#FCEBC9',
  200: '#F9D58E',
  300: '#F6B953',
  400: '#F4A332',
  500: '#ED7E13',
  600: '#D25B0D',
  700: '#AE3E0F',
  800: '#8D3013',
  900: '#742913',
  950: '#431205',
  alpha: {
    50: '#F4A3320D',
    100: '#F4A3321A',
    200: '#F4A33233',
    300: '#F4A3324D',
    400: '#F4A33266',
    500: '#F4A33299',
    600: '#F4A332CC'
  }
}
export const lime = {
  50: '#f6faf3',
  100: '#EBF4E4',
  200: '#D7E8CA',
  300: '#A6CC8C',
  400: '#8DB96F',
  500: '#6B9C4B',
  600: '#568039',
  700: '#456530',
  800: '#39512A',
  900: '#304324',
  950: '#16240F',
  alpha: {
    50: '#A6CC8C0D',
    100: '#A6CC8C1A',
    200: '#A6CC8C33',
    300: '#A6CC8C4D',
    400: '#A6CC8C66',
    500: '#A6CC8C99',
    600: '#A6CC8CCC'
  }
}
export const pink = {
  50: '#FDF2F9',
  100: '#FCE7F5',
  200: '#FBCFEB',
  300: '#F8A9DA',
  400: '#F160B7',
  500: '#EA4AA5',
  600: '#D92985',
  700: '#BC1A69',
  800: '#9C1857',
  900: '#82194B',
  950: '#4F0829'
}
export const teal = {
  50: '#F1FAF9',
  100: '#DAF3F2',
  200: '#BAE7E7',
  300: '#8AD5D6',
  400: '#53BABD',
  500: '#389EA2',
  600: '#318189',
  700: '#2D6971',
  800: '#2C575E',
  900: '#294A50',
  950: '#183339',
  alpha: {
    50: '#389EA20D',
    100: '#389EA21A',
    200: '#389EA233',
    300: '#389EA24D',
    400: '#389EA266',
    500: '#389EA299',
    600: '#389EA2CC'
  }
}
export const blueGray = {
  50: '#F8FAFC',
  100: '#F1F5F9',
  200: '#E2E8F0', //border secondary
  300: '#CBD5E1', // --Fg-Tertiary
  400: '#94A3B8',
  500: '#64748B',
  600: '#475569',
  700: '#334155',
  800: '#1E293B',
  900: '#0F172A',
  950: '#060E1D',
  dark: {
    50: '#1E293B0D',
    100: '#1E293B1A',
    200: '#1E293B33',
    300: '#1E293B4D',
    400: '#1E293B66',
    500: '#1E293B99',
    600: '#1E293BCC'
  },
  light: {
    50: '#F8FAFC0D',
    100: '#F8FAFC1A',
    200: '#F8FAFC33', //border primary
    300: '#F8FAFC4D',
    400: '#F8FAFC66',
    500: '#F8FAFC99',
    600: '#F8FAFCCC'
  }
}
export const rose = {
  50: '#FFF1F2',
  100: '#FFE4E6',
  200: '#FECDD3',
  300: '#FDA4AF',
  400: '#FB7185',
  500: '#F43F5E',
  600: '#E11D48',
  700: '#BE123C',
  800: '#9F1239',
  900: '#881337',
  950: '#4C0519',
  alpha: {
    50: '#F43F5E0D',
    100: '#F43F5E1A',
    200: '#F43F5E33',
    300: '#F43F5E4D',
    400: '#F43F5E66',
    500: '#F43F5E99',
    600: '#F43F5ECC'
  }
}
export const green = {
  50: '#F0FDF4',
  100: '#DCFCE7',
  200: '#BBF7D0',
  300: '#86EFAC',
  400: '#4ADE80',
  500: '#22C55E',
  600: '#16A34A',
  700: '#15803D',
  800: '#166534',
  900: '#14532D',
  950: '#052E16',
  alpha: {
    50: '#4ADE800D',
    100: '#4ADE801A',
    200: '#4ADE8033',
    300: '#4ADE804D',
    400: '#4ADE8066',
    500: '#4ADE8099',
    600: '#4ADE80CC'
  }
}

export const primary = orange
export const secondary = lime
export const fontSize = {
  '5xl': ['3rem', { lineHeight: '3rem', letterSpacing: '-2px' }],
  '6xl': [
    '3.75rem',
    {
      lineHeight: '3.75rem',
      letterSpacing: '-3px'
    }
  ],
  '7xl': [
    '4.5rem',
    {
      lineHeight: '4.5rem',
      letterSpacing: '-3px'
    }
  ],
  '8xl': [
    '6rem',
    {
      lineHeight: '6rem',
      letterSpacing: '-4px'
    }
  ],
  '9xl': [
    '8rem',
    {
      lineHeight: '8rem',
      letterSpacing: '-5px'
    }
  ]
}
export const fontFamily = {
  K2D: ['K2D', 'sans-serif'],
  Satoshi: ['Satoshi', 'sans-serif']
}
export const screens = {
  xl: '1440px',
  '2xl': '1920px'
}
export const zIndex = {
  1100: 1100,
  drawer: 1200,
  modal: 1300,
  snackbar: 1400,
  tooltip: 1500
}

export const gradient1 = `linear-gradient(90deg, ${lime[300]}, ${orange[400]})`
export const gradient2 = `linear-gradient(90deg, ${orange[400]}, ${pink[400]})`
