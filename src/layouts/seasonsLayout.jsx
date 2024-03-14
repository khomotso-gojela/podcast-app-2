import { NavLink, Link, Outlet,useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { IoChevronBack } from "react-icons/io5";

function SeasonsLayout(props) {
    const params = useParams()
    const navigate = useNavigate()

    return (
    <div className='seasons-tab'> 
       
        <div 
            onClick={() => navigate(-1)}
            className="flex py-2 my-4 mx-4 px-4 rounded-xl bg-slate-300 cursor-pointer 
            w-fit items-center border border-slate-500  text-gray-600"
        >
            <h1 ><IoChevronBack size={24}/></h1>
            <div className='font-medium pb-1 ml-2 px-2 border-l border-gray-500 '>podcast</div>         
            <div className='pb-1 font-medium pl-2 border-l border-gray-500'>{params.season ? "episodes": ''}</div>
        </div>
        <div className="seasons-container">
            <Outlet />
        </div>
    </div>
    )
}

export default SeasonsLayout