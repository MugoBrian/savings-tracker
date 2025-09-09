import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import AddGoalForm from "./AddGoalForm";
import AddContributionForm from "./AddContributionForm";

function FormModal({ show, onHide, isGoal, goalId = null }) {
  // Added goalId prop for contributions
  return (
    <div style={{ display: "block", position: "initial" }}>
      <Modal show={show} onHide={onHide}>
        <Modal.Header closeButton>
          <Modal.Title>
            {isGoal == "true" ? "Create A New Goal" : "Add A contribution"}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {isGoal == "true" ? (
            <AddGoalForm onHide={onHide} />
          ) : (
            <AddContributionForm goalId={goalId} onHide={onHide} />
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default FormModal;
