/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Fraunces"', 'serif'],
        sans: ['"Inter"', 'sans-serif'],
      },
      colors: {
        paper: {
          light: '#F6F5F1',
          DEFAULT: '#F6F5F1',
          dark: '#12161C',
        },
        ink: {
          light: '#1C2320',
          dark: '#E9E7DE',
        },
        moss: {
          50: '#EEF3EE', 100: '#D9E5D9', 200: '#B3CCB4', 300: '#8CB28E',
          400: '#659968', 500: '#4C7A5E', 600: '#3E6350', 700: '#304C3F',
          800: '#22352E', 900: '#151F1D',
        },
        amber: {
          50: '#FDF3E3', 100: '#FBE4BD', 200: '#F6CD8B', 300: '#F2BC6C',
          400: '#EFAE4C', 500: '#E8A33D', 600: '#C5822A', 700: '#9C6620',
          800: '#734B18', 900: '#4A300F',
        },
        coral: {
          50: '#FCEBE8', 100: '#F7CFC8', 200: '#F1AFA4', 300: '#EC9584',
          400: '#EA8177', 500: '#E2665A', 600: '#C34F44', 700: '#973E36',
          800: '#6E2C27', 900: '#451B18',
        },
        plum: {
          50: '#F1EAF2', 100: '#DFC9E2', 200: '#C7A3CC', 300: '#B78CBE',
          400: '#A87CB0', 500: '#8E5E97', 600: '#734A7B', 700: '#57385E',
          800: '#3D2742', 900: '#251726',
        },
        teal: {
          50: '#E7F2F1', 100: '#C3DFDC', 200: '#98C8C2', 300: '#7BB7B0',
          400: '#5FA39C', 500: '#42897F', 600: '#336E65', 700: '#26534C',
          800: '#1A3934', 900: '#0F211E',
        },
        slate: {
          50: '#EEF0F2', 100: '#D3D8DD', 200: '#B2BAC3', 300: '#97A1AC',
          400: '#7C8A99', 500: '#5C6B7A', 600: '#485462', 700: '#363F4A',
          800: '#252B33', 900: '#16191E',
        },
      },
      boxShadow: {
        card: '0 1px 2px rgba(28, 35, 32, 0.06), 0 1px 0 rgba(28,35,32,0.04)',
      },
      borderRadius: {
        sm: '4px',
        md: '8px',
        lg: '14px',
      },
    },
  },
  plugins: [],
}
