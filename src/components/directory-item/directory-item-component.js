import './directory-item.styles'
import {BackgroundImage, Body, DirectoryItemContainer} from './directory-item.styles'

const DirectoryItem = ({category}) => {
  const {imageUrl, title} = category;
  return (
    <DirectoryItemContainer>
      <BackgroundImage
        imageUrl={imageUrl}
      />
      
      <Body className="body">
        <h2>{title}</h2>
        <p>Shop Now</p>
      </Body>
    </DirectoryItemContainer>
  )
  
}

export default DirectoryItem;
