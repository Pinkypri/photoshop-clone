const slider = ({min,max,value,Sliderchange}) => {
    return (
        <div className="slider-container">
          <input type="range" className="slider"
           min={min} 
           max={max} 
          value={value}
          onChange={Sliderchange}/>
        </div>
    )
}

export default slider
