import image1 from "../images/image1.jpeg"
import image2 from "../images/image2.jpeg"
import image3 from "../images/image3.jpeg"
import image4 from "../images/image4.jpeg"
import image5 from "../images/image5.jpeg"


export const images = [image1, image2, image3, image4,image5]

const imageByIndex = (index) => images[index % images.length]

export default imageByIndex
