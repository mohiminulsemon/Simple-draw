/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      animation: {
        'scale-in-center': 'scale-in-center 0.2s cubic-bezier(0.250, 0.460, 0.450, 0.940)   both',
        'slide-in-left': 'slide-in-left 0.2s cubic-bezier(0.250, 0.460, 0.450, 0.940)   both',
        'fade-in-right': 'fade-in-right 0.2s cubic-bezier(0.390, 0.575, 0.565, 1.000)   both',
        'fade-in-left': 'fade-in-left 0.5s cubic-bezier(0.390, 0.575, 0.565, 1.000)   both',
        'fade-out-left': 'fade-out-left 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940)   both',
        'scale-out-hor-left':
          'scale-out-hor-left 0.2s cubic-bezier(0.550, 0.085, 0.680, 0.530)   both',
        'scale-in-hor-left':
          'scale-in-hor-left 0.2s cubic-bezier(0.250, 0.460, 0.450, 0.940)   both',
        'fade-in': 'fade-in 0.5s cubic-bezier(0.390, 0.575, 0.565, 1.000)   both',
        'fade-out': 'fade-out 0.5s ease   both'
      },
      keyframes: {
        'scale-in-center': {
          '0%': {
            transform: 'scale(0)',
            opacity: '1'
          },
          to: {
            transform: 'scale(1)',
            opacity: '1'
          }
        },

        'slide-in-left': {
          '0%': {
            transform: 'translateX(-1000px)',
            opacity: '0'
          },
          to: {
            transform: 'translateX(0)',
            opacity: '1'
          }
        },
        'fade-in-right': {
          '0%': {
            transform: 'translateX(50px)',
            opacity: '0'
          },
          to: {
            transform: 'translateX(0)',
            opacity: '1'
          }
        },
        'fade-in-left': {
          '0%': {
            transform: 'translateX(-50px)',
            opacity: '0'
          },
          to: {
            transform: 'translateX(0)',
            opacity: '1'
          }
        },
        'fade-out-left': {
          '0%': {
            transform: 'translateX(0)',
            opacity: '1'
          },
          to: {
            transform: 'translateX(-50px)',
            opacity: '0'
          }
        },
        'scale-out-hor-left': {
          '0%': {
            transform: 'scaleX(1)',
            'transform-origin': '0 0',
            opacity: '1'
          },
          to: {
            transform: 'scaleX(0)',
            'transform-origin': '0 0',
            opacity: '1'
          }
        },
        'scale-in-hor-left': {
          '0%': {
            transform: 'scaleX(0)',
            'transform-origin': '0% 0%',
            opacity: '1'
          },
          to: {
            transform: 'scaleX(1)',
            'transform-origin': '0% 0%',
            opacity: '1'
          }
        },
        'fade-in': {
          '0%': {
            opacity: '0'
          },
          to: {
            opacity: '1'
          }
        },
        'fade-out': {
          '0%': {
            opacity: '1'
          },
          to: {
            opacity: '0'
          }
        }
      }
    }
  },
  plugins: []
};
