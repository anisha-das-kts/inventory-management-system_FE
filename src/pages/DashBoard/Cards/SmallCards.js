import React from 'react'
import "./SmallCard.css";

const SmallCards = ({text1,data1}) => {
  return (
      <div>
         
      
      <div className="card-small">
        <h4 style={{ margin: "0px", paddingLeft: "5px", fontSize: "15px" }}> {text1}{ data1}</h4>
         
          <div className="card-body-small"></div>
      </div>  
    </div>
  )
}

export default SmallCards