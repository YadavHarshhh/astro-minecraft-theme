/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

//The dir inside the public folder where blocks are being stored no trailing slash
const BLOCK_DIR = 'imgs/blocks';
const ITEM_DIR = 'imgs/items';
const ICON_DIR = 'imgs/icons';
//Number of block sizes (1-block, 2-block) to generate
const BLOCK_SPACING_MAX = 99;

const background_obj = {};
const spacing_obj = {};
const safelist_array = [];
const fs = require('fs');

//Create block backgrounds like 'bg-stone' from a dir and safelist them
if (fs.existsSync(`./public/${BLOCK_DIR}`)) {
  fs.readdirSync(`./public/${BLOCK_DIR}`).forEach(file => {
    const block_name = `block-${file.split('.')[0]}`
    background_obj[block_name] = `url('/${BLOCK_DIR}/${file}')`
  });
}

//Create item backgrounds like 'bg-i-diamond' from a dir and safelist them
if (fs.existsSync(`./public/${ITEM_DIR}`)) {
  fs.readdirSync(`./public/${ITEM_DIR}`).forEach(file => {
    const item_name = `item-${file.split('.')[0]}`
    background_obj[item_name] = `url('/${ITEM_DIR}/${file}')`
  });
}

//Create icon backgrounds
if (fs.existsSync(`./public/${ICON_DIR}`)) {
  fs.readdirSync(`./public/${ICON_DIR}`).forEach(file => {
    const icon_name = `icon-${file.split('.')[0]}`
    background_obj[icon_name] = `url('/${ICON_DIR}/${file}')`
  });
}

//Create spacings like '1-block' '2-block' up to '99-block'
Array.from({length: BLOCK_SPACING_MAX}, (_, i) => i + 1).forEach((i) => {
  spacing_obj[`${i}-block`] = `calc(var(--block-size) * ${i})`
})

module.exports = {
  plugins: [],
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    screens: {
      'xs': '480px',
      ...defaultTheme.screens
    },
    fontFamily: {
      'sans': ['Minecraft', 'Arial', ...defaultTheme.fontFamily.sans],
      'minecraft': ['Minecraft', 'Arial', ...defaultTheme.fontFamily.sans],
      'mono': ['Monocraft', ...defaultTheme.fontFamily.mono],
    },
    extend: {
      colors: {
        // Eclipse brand colors
        'eclipse-purple': '#7e3ff2',
        'eclipse-blue': '#00f7ff',
        'eclipse-black': '#0d0d0d',
        
        //Misc
        "link": "#aaaaff",
        "panel": "#C6C6C6",
        "panel-dark": "#373737",
        
        //Text colors
        'gold': '#FFAA00',
        'gray': '#AAAAAA',
        'blue': '#5555FF',
        'green': '#55FF55',
        'aqua': '#55FFFF',
        'red': '#FF5555',
        'light-purple': '#FF55FF',
        'yellow': '#FFFF55',
        dark: {
          'blue': '#0000AA',
          'green': '#00AA00',
          'aqua': '#00AAAA',
          'red': '#AA0000',
          'purple': '#AA00AA',
          'gray': '#555555',
        },
      },
      backgroundImage: {
        ...background_obj
      },
      spacing: {
        '1/16-block': 'calc(var(--block-size) / 16)',
        '1/8-block': 'calc(var(--block-size) / 8)',
        '1/4-block': 'calc(var(--block-size) / 4)',
        '1/2-block': 'calc(var(--block-size) / 2)',
        ...spacing_obj
      },
      animation: {
        'glow': 'glow 2s ease-in-out infinite alternate',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 5px #7e3ff2, 0 0 10px #7e3ff2, 0 0 15px #7e3ff2' },
          '100%': { boxShadow: '0 0 10px #7e3ff2, 0 0 20px #7e3ff2, 0 0 30px #7e3ff2' }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' }
        }
      }
    },
  },
}