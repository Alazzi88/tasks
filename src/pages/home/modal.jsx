import ReactLoading from "react-loading";
import Modal from "shared/Modal";

const HomeModal = ({
  closeModal,
  titileInput,
  detailsInput,
  addBTN,
  submitBTN,
  taskTitle,
  subTask,
  array,
  showLoading,
}) => {
  return (
    <Modal closeModal={closeModal} >
      <div className="modal-content">
      
        <input
          onChange={(eo) => {
            titileInput(eo);
          }}
          required
          placeholder=" Add title : "
          type="text"
          value={taskTitle}
        />
        <div>
          <input
            onChange={(eo) => {
              detailsInput(eo);
            }}
            placeholder=" Add details : "
            type="text"
            value={subTask}
          />
          <button
            onClick={(eo) => {
              addBTN(eo);
            }}
          >
            Add
          </button>
        </div>
        <ul>
          {array.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>

        <button
          style={{ marginBottom: "33px" }}
          onClick={async (eo) => {
            submitBTN(eo);
          }}
        >
          {showLoading ? (
            <ReactLoading
              type={"spin"}
              color={"white"}
              height={22}
              width={22}
            />
          ) : (
            "Submit"
          )}
        </button>
      </div>
    </Modal>
  );
};

export default HomeModal;
