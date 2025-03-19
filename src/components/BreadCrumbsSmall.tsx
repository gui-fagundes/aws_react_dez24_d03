type Props = {
    currentPage: string;
}

const BreadCrumbsSmall = ({currentPage}:Props) => {
  return (
    <div className='h-16 w-screen bg-w-100 mt-32 px-30 content-center'>
        <h2 className="text-p1 text-bl-500 font-medium">{`Outsider > `} <b className="text-p1 font-medium text-bl-900">{currentPage}</b></h2>

    </div>
  )
}

export default BreadCrumbsSmall
