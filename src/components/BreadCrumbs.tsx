type Props = {
    currentPage : string;
}

const BreadCrumbs = ({currentPage} : Props) => {
  return (
    <div className='h-40 max-w-screen bg-w-100 mt-32 w-full'>
        <div className="px-30 pt-10">
      <h1 className="text-h3 text-bl-900 font-inter font-bold">{currentPage}</h1>
        <h2 className="text-p1 text-bl-500 font-medium">{`Outsider > `} <b className="text-P1 font-medium text-bl-900">{currentPage}</b></h2>
        </div>
    </div>
  )
}

export default BreadCrumbs
