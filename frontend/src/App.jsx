import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [darkMode, setDarkMode] = useState(false);

  return (

    // Login form starts

    <div
      className={`min-h-screen flex items-center justify-center ${
        darkMode ? "dark bg-gray-900" : "bg-gray-100"
      }`}
    >
      <div className="w-96 bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">        

        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800 dark:text-white">
          Login
        </h1>

        <form>
          {/* Email */}
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-200 mb-2">
              Email
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              className="w-full border border-gray-300 dark:border-gray-600
                         bg-white dark:bg-gray-700
                         text-gray-900 dark:text-white
                         rounded-md px-3 py-2
                         focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Password */}
          <div className="mb-6">
            <label className="block text-gray-700 dark:text-gray-200 mb-2">
              Password
            </label>

            <input
              type="password"
              placeholder="Enter your password"
              className="w-full border border-gray-300 dark:border-gray-600
                         bg-white dark:bg-gray-700
                         text-gray-900 dark:text-white
                         rounded-md px-3 py-2
                         focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Login */}
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600
                       text-white py-2 rounded-md"
          >
            Login
          </button>
        </form>

      </div>
      {/* Theme Button */}
        {/* <div className="flex justify-end mb-4"> */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="fixed bottom-4 right-4 px-4 py-3 rounded-full
             bg-gray-200 dark:bg-gray-700
             text-gray-800 dark:text-white
             shadow-lg hover:scale-105 transition"
          >
            {darkMode ? "☀️ Light" : "🌙 Dark"}
          </button>
        {/* </div> */}
    </div>
    
    // Login form ends

  )
}

export default App
