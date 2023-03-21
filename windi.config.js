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
  },
  shortcuts: {
    'rounded-btn': {
      // 圓框按鈕通用
      '@apply':
        'select-none border border-c-brown-500 rounded-md px-3 py-1 cursor-pointer text-white text-center bg-c-main-orange',
      '&:hover': {
        '@apply': 'border-c-brown-300 text-gray-500 bg-orange-300',
      },
      '&:active, &.is-active': {
        '@apply': 'border-c-brown-700 text-white bg-c-brown-700',
      },
      '&.is-disabled, &[disabled]': {
        '@apply':
          'border-trueGray-200 bg-trueGray-200 text-trueGray-400 cursor-not-allowed group-hover:border-trueGray-300 group-hover:bg-trueGray-300',
      },
    },
  }
  })