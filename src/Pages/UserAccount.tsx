import BreadCrumbs from '../components/BreadCrumbs'

const UserAccount = () => {
  return (
    <div className='flex flex-col'>
      <BreadCrumbs currentPage='My Account' />
      <div className='flex flex-col md:flex-row flex-nowrap gap-3 justify-start items-center px-40'>
        <div className='flex flex-col gap-3 md:border-r-1 border-w-200 h-125 w-60 items-center pt-20'>
            <div className='h-10 bg-bl-900 w-10'></div>
            <div className='h-10 bg-bl-900 w-10'></div>
            <div className='h-10 bg-bl-900 w-10'></div>
        </div>
      </div>
    </div>
  )
}

export default UserAccount
