import React from "react";
import { Helmet } from "react-helmet-async";

// closeModal => function to close the Modal
const Modal = ({ closeModal, children , backgroundColor ="whitesmoke" }) => {
  return (
    <div className="parent-of-Modal">
      <Helmet>
        <style type="text/css">{`
          
          
          .parent-of-Modal{
            position: fixed;
            top: 0;
            bottom: 0;
            right: 0;
            left: 0;
          
            background-color: rgba(0, 0, 0, 0.45);
            display: flex;
            align-items: center;
            justify-content: center;
          }
          
          
          
          
          
          
          
          
          
          
          .Modal{
          
            width: 400px;
            height: 330px;
            border-radius: 12px;
            display: flex;
            justify-content: center;
            align-items: center;
            overflow-y: auto;
            position: fixed;
            animation: mymove 0.8s 1 ;

          }
    
          @keyframes mymove {
            0%   {scale: 0; transform: translateY(-100vh);}
          
            100% {scale: 1; transform: translateY(0);}
          } 



          

          
          
          `}</style>
      </Helmet>
      <form style={{  backgroundColor: backgroundColor}} className={`Modal`}>
        <div
          onClick={() => {
            closeModal();
          }}
          className="close"
        >
          <i className="fa-solid fa-xmark"></i>
        </div>

        {children}
      </form>
    </div>
  );
};

export default Modal;
