import { Command } from "lucide-react"

const NotFound = () => {
  return (
    <>
      <div className='flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-white p-6'>
        <Command size={60} className="animate-spin mb-4 text-white"/>
        <h1 className="font-extrabold text-3xl mb-4">Oops! Page Not Found</h1>
        <p className="font-semibold text-xl mb-6">The page you requested for cannot be found. Don't worry, it happens!</p>
        <p className="text-lg">But hey, let's get you back on track. Try going back to the homepage!</p>
        <button
          onClick={() => window.location.href = '/resourcehub'}
          className="mt-6 py-2 px-6 bg-blue-500 text-white rounded-full hover:bg-blue-700 transition duration-300"
        >
          Go Home
        </button>
      </div>
    </>
  )
}

export default NotFound
