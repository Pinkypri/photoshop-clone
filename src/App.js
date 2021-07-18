import React,{useState} from 'react'
import Sidebaritem from './Components/Sidebaritem';
import Slider from "./Components/Slider";
import "./App.css";
import * as htmltoImage from "html-to-image";
import * as download from "downloadjs";

const DEFAULT_OPTION=[
  {
    name:"Brightness",
    property:"brightness",
    value:100,
    range:{
      main:0,
      max:200
    },
    unit:"%",
  },
  {
    name:"Contrast",
    property:"contrast",
    value:100,
    range:{
      main:0,
      max:200
    },
    unit:"%",
  },
  {
    name:"Saturation",
    property:"saturate",
    value:100,
    range:{
      main:0,
      max:200
    },
    unit:"%",
  },
  {
    name:"Grayscale",
    property:"grayscale",
    value:0,
    range:{
      main:0,
      max:100
    },
    unit:"%",
  },
  {
    name:"Sepia",
    property:"sepia",
    value:0,
    range:{
      main:0,
      max:100
    },
    unit:"%",
  },
  {
    name:"Hue Rotate",
    property:"hue-rotate",
    value:0,
    range:{
      main:0,
      max:360
    },
    unit:"deg",
  },
  {
    name:"Blur",
    property:"blur",
    value:0,
    range:{
      main:0,
      max:20
    },
    unit:"px",
  },
];

const App = () => {
  const[image, setImage] = useState(null);
  const [options, setoptions] = useState(DEFAULT_OPTION);
  const [selectedIndex, setselectedIndex] = useState(0);
  const selectedOption=options[selectedIndex];

  const handleChange=(event)=>{
   const objectUrl=URL.createObjectURL(event.target.files[0]);
   setImage(objectUrl);
  }
const applyFilter=()=>{
  const filters=options.map((Option)=>{
  return`${Option.property}(${Option.value}${Option.unit})`
  });
  return{
    filter:filters.join(" "),
    backgroundImage:`url(${image})`,
  };
};

const Sliderchange=({target})=>{
  setoptions((prevOptions)=>{
    return prevOptions.map((option,index)=>{
    if(index !== selectedIndex)return option;
    return{...option, value:target.value};
  });
});
}
const downloadImage=()=>{
  htmltoImage.toPng(document.getElementById("image")).then((dataUrl)=>{
    download(dataUrl,`${Date.now()}.png`)
   })

}
  return (
    <div className="container">
      {image?
 (<div className="main-image" id="image"style={applyFilter()}/>):
(<div className="upload-image">
  <h1>Photoshop-Clone</h1>
  <input type="file" accept="image/*" onChange={handleChange}/>
</div>)}
<div className="sidebar">
 {
   options.map((option,index)=>{
     return(
       <Sidebaritem key={index} name={option.name}
        active={index===selectedIndex}
        handleClick={()=>{setselectedIndex(index)}}/>
     );

   })
 }
 <button onClick={downloadImage} className="download">Download</button>
</div>
<Slider min={selectedOption.range.min} max={selectedOption.range.max} 
value={selectedOption.value}
Sliderchange={Sliderchange}/>
</div>
  );
}

export default App
