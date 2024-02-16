import {useState} from 'react'
import { CCol, CRow } from '@coreui/react'

function Filter(props) {
    const [search,setSearch] = useState()

    function handleSearch(e){
        const text = e.target.value
        props.setText(text)
    }

  return (
    <CRow className='filter-container ' >
        <CCol sm='auto col-3'>
            <form>
                <input 
                    type="text" 
                    name='search'
                    value={search}
                    onChange={(e) => handleSearch(e)}
                    placeholder='Search'
                />
                <br />
                <br />
            </form>
        </CCol>
        <div className='col-6'></div>
        <CCol  sm='auto' className="sort col-3">
            
            <select  name="sorting" id="sorting" onChange={(e) => props.setSort(e.target.value)}>
                <option value="none">Sort</option>
                <option value="A-Z">A-Z</option>
                <option value="Z-A">Z-A</option>
                <option value="oldest">oldest</option>
                <option value="latest">latest</option>
            </select>
        </CCol>
    </CRow>
)
}

export default Filter