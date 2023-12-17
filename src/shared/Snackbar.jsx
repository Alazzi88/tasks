import React from 'react';
import { Helmet } from 'react-helmet-async';

const Snackbar = ({showMassage}) => {
  return (
<div>
<Helmet>
    <style type="text/css">{`
      
      .home .show-massage{
        background-color: whitesmoke;
        font-size: 18px;
        color: #1b1b1b;
        padding: 8px 12px;
        font-weight: normal;
        border-radius: 5px;
        position: fixed;
        top: 100px;
        right: 100vw;
        transition: 1s;
      }
      .home  .fa-circle-check{
        color: rgb(22, 196, 13);
        margin-left: 5px;
        
      }



      

      
      
      `}</style>
  </Helmet>
    <p
    style={{ right: showMassage ? "20px" : "-100vw" }}
    className="show-massage"
  >
    task added succcessfully{" "}
    <i className="fa-regular fa-circle-check"></i>
  </p>
</div>
  );
}

export default Snackbar;
