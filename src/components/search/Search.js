import React from 'react'
import { useState} from 'react'
import axios from 'axios'
import { ImageResult } from '../imageResults/ImageResult';
export const Search = () => {
    const [searchQuery, updateSearchQuery] = useState("");
    const [imageList, updateImageList] = useState([]);
    const [selectedImage, onImageSelect] = useState();
  
    const [timeoutId, updateTimeoutId] = useState();
    const fetchData=async(searchString)=>{
        const response=await axios.get(
        `https://api.unsplash.com/search/photos?page=1&query=${searchString}&client_id=xQ-DWfk84120yW4mpt2O-grHnWomaD5GvCvdHtLBwts`
        )
        updateImageList(response.data.results);
       console.log(response.data.results)
    }
    const onTextChange=(e)=>{
        onImageSelect("")
        clearTimeout(timeoutId);
        updateSearchQuery(e.target.value);
        const timeout=setTimeout(()=>fetchData(e.target.value),500);
        updateTimeoutId(timeout);
    }
  return (
    <div>
        <input type='text'
         style={{backgroundColor:'black',
         color:'white',
         marginleft:570,
         marginTop:50,
         paddingTop:20,
         paddingLeft:70,
         fontSize:30,
         borderTopStyle:"hidden",
         borderRightStyle:"hidden",
         borderLeftStyle:"hidden",
         borderRadius:5}} 
         placeholder='Search for Images'
         name='Search'
         value={searchQuery}
         onChange={onTextChange}></input>
         {imageList.length>0?(<ImageResult images={imageList}/>):null}
    </div>
  )
}
