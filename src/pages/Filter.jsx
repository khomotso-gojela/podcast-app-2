import {useState} from 'react'

function Filter(props) {
    const [search,setSearch] = useState()

    function handleSearch(e){
        const text = e.target.value
        props.setText(text)
    }

  return (
    <div className='flex flex-col sm:flex-row justify-between w-12/12 mt-8 mx-8' >
        <div className='mb-4 sm:mb-0' >
                <input
                    className='bg-red-100 focus:ring ring-red-600 border border-red-500 rounded-sm text-gray-700 placeholder-red-400 py-2 px-6'
                    type="text" 
                    name='search'
                    value={search}
                    onChange={(e) => handleSearch(e)}
                    placeholder='Search'
                />
        
        </div>
        
        <div className="">
            
            <select  
                className=' bg-red-100 border border-red-500 rounded-sm text-red-400 py-2 px-6'
                name="sorting" id="sorting" onChange={(e) => props.setSort(e.target.value)}>
                <option value="none">Sort</option>
                <option value="A-Z">A-Z</option>
                <option value="Z-A">Z-A</option>
                <option value="oldest">oldest</option>
                <option value="latest">latest</option>
            </select>
        </div>
    </div>
)
}

export default Filter