import React from 'react'
import "./mediumcard.css";
import SmallCards from './SmallCards';

const MediumCards = ({text,text1,text2,data1,data2}) => {
  return (
    <div  className="card-medium"  >
     <h1 style={{fontSize:"20px",marginLeft:"155px" ,fontWeight:"bold"}}>{text}</h1>
    <div className="card-medium-heading" >
       
     
       
    
        <SmallCards text1={text1}  data1={data1}  />
        <SmallCards text1={text2} data1={ data2} />
         
        <div className="card-body-medium" ></div>
      </div>
   </div>
  )
}

export default MediumCards