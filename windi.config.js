import { defineConfig } from 'windicss/helpers';
import colors from 'windicss/colors';

// 整體色碼
const customColors = {
  // Configure your color palette here
  'c-dark-900': '#333333',
  'c-dark-700': '#434343',
  'c-dark-500': '#666666',
  'c-dark-300': '#8c8c8c',
  'c-dark-200': '#d5d5d5',
  'c-dark-100': '#f1f1f1',
  'c-main-orange': '#f68b47',
  'c-light-orange': '#e9ad634d',
  'c-red-700': '#ec3c1f',
};

export default defineConfig({
    attributify: true,
    theme: {
      extend: {
        height: {
          base: '45px'
        },
        lineHeight: {
          base: '45px'
        },
        backgroundColor: {
          ...customColors,
          ...colors,
        },
        colors: {
          ...customColors,
          ...colors,
        }
      }
    }
  })