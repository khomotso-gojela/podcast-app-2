import {useEffect, useRef} from 'react'
import { CCarousel,CCarouselItem,CImage } from '@coreui/react'
import phimage from '../assets/phimage.jpg'

function Couresal() {
    const carousel = useRef()

    useEffect(() => {
        
        
    }, []);

  return (
    <div className='carousel-div container '>
 <CCarousel controls indicators>
  <CCarouselItem>
    <CImage className="d-block w-100" src={phimage} alt="slide 1" />
  </CCarouselItem>
  <CCarouselItem>
    <CImage className="d-block w-100" src={phimage} alt="slide 2" />
  </CCarouselItem>
  <CCarouselItem>
    <CImage className="d-block w-100" src={phimage} alt="slide 3" />
  </CCarouselItem>
</CCarousel>
        
    </div>
  )
}

export default Couresal