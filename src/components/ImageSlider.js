import { Image } from 'semantic-ui-react'
import { Carousel } from 'react-responsive-carousel'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
export default function ImageSlider() {
  const imgSrc =
    [
      'https://samirandaly.com/store/web/media/image/samirandaly/slider/4758435ac0e0a117a5bad70591dd6e00.jpeg',
      'https://samirandaly.com/store/web/media/image/samirandaly/slider/4758435ac0e0a117a5bad70591dd6e00.jpeg',
      'https://samirandaly.com/store/web/media/image/samirandaly/slider/238da0319a5bbbd24066fb2b1ddadbe4.jpeg',
      'https://samirandaly.com/store/web/media/image/samirandaly/slider/c850f320fe4a639c5221ee4152ff47bc.png'
    ]
  return (
    <Carousel transitionTime={2000} showArrows autoPlay emulateTouch useKeyboardArrows interval={4000} infiniteLoop>
      {imgSrc.map((src, index) => (<div key={index}>
        <Image src={src} />
      </div>))}
    </Carousel>
  )
}
