import { Link } from 'react-router-dom'

const Page404 = () => {
  return (
    <div className="flex flex-col items-center mt-50  gap-3 mb-32">
      <h1 className="font-bold font-inter text-9xl text-bl-900">404</h1>
      <p className="font-light font-inter text-p1 text-bl-600">
        Something went wrong.
      </p>
      <p>Looks like we could not find the page you're looking for.</p>

      <div className="bg-bl-900 h-11 w-60 rounded-md cursor-pointer text-center text-w-900 content-center">
          <Link to={"/"}>Take me back home</Link>
        </div>
    </div>
  )
}

export default Page404
