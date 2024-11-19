/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [
    function ({ addComponents }) {
      addComponents({
        ".btn-default": {
          "@apply bg-white border border-gray-300 px-2 py-1 cursor-pointer text-sm hover:bg-slate-100":
            {},
        },
        ".input": {
          "@apply my-2 w-72 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm text-gray-700":
            {},
        },
      })
    },
  ],
}
