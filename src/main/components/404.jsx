
const Notfound = () => {
  return (
    <div className=' my-20 font-medium'>
   
      <h1 className=' text-4xl'>
      <span className=' mr-2  text-red-500'>404</span>
        Page Not found
      </h1>
      <button className=' my-20 rounded-md bg-blue-600 text-white text-md px-4 py-2' onClick={()=>window.history.back()}>Go back</button>
    </div>
  )
}

export default Notfound