import {useSignIn, useSignUp} from '@clerk/clerk-react'
type CustomGoogleOneTapProps = {
  sign:string
}

const CustomGoogleOneTap = (sign:CustomGoogleOneTapProps) => {
  
  const {signIn, setActive} = useSignIn()
  const {signUp} = useSignUp()
  const handleGoogleContinue = async () => {
    if(sign.sign === "signin"){

      await signIn!.authenticateWithRedirect({
        strategy: "oauth_google",
        redirectUrl: "/",
        redirectUrlComplete:'/'
      });
    }
    if(sign.sign === "signup"){
      await signUp!.authenticateWithRedirect({
        strategy: "oauth_google",
        redirectUrl: "/",
        redirectUrlComplete:'/'
      })
    }
  }
  return (
    <div>
      <div className="h-11 w-80 bg-w-900 border-1 border-bl-200 rounded-md cursor-pointer flex justify-center items-center gap-3"
        onClick={() => handleGoogleContinue()}
        >
        <img src="/src/icons/Google.svg" alt="" className='h-6 w-6'/>
        <h1 className='font-inter text-p1 font-medium text-bl-500'>Continue with Google</h1>
        </div>
    </div>
  )
}

export default CustomGoogleOneTap
