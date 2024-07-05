import { FaGithub } from "react-icons/fa"

function Navbar() {
  return (
    <div className=' flex items-center justify-between w-full text-white'>
      <div className='text-3xl  font-bold'>JobHive</div>
      <div className='text-3xl  font-bold'>
        <a target="_blank" href="https://github.com/vrindaBindal2712/job-portal" rel="noreferrer">
          <FaGithub size={20} />
        </a>
      </div>
    </div>
  )
}

export default Navbar
