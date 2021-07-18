import React from 'react'

const Sidebaritem = ({name,active,handleClick}) => {
    return (
       <button className={`Sidebaritem ${active?"active":null}`} 
       onClick={handleClick}>
           {name}</button>
    )
}

export default Sidebaritem
