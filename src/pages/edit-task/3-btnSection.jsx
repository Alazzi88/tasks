


const Btnssection = ({ user, stringId , deleteBTN }) => {


  return (
    <section className="center  ">
      <div>
        <button onClick={async () => {
        deleteBTN()
    
        }
        }
        className="delete">Delete task</button>
      </div>
    </section>
  );
};

export default Btnssection;