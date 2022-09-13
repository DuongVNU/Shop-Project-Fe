import DirectoryItem from "../directory-item/directory-item-component";
import './directory.styles.scss'

const Directory = ({categories}) =>{
return(
  <div className="directory-container">
    {
      categories.map((category)=>{
        return <DirectoryItem keys={category.id} category={category}/>
      })
    }
  </div>
)
}

export default Directory
