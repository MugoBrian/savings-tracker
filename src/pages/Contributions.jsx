import { useState } from "react";
import { Button, Table } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSavings } from "../contexts/SavingsContext";
import { FormModal } from "../components";

function Contributions() {
  const { contributions, getGoalName } = useSavings();
  const [showModal, setShowModal] = useState(false);
  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  return (
    <div>
      <div className="d-flex flex-row justify-content-between mx-2 my-4">
        <h5 className="font-weight-bold">Contributions</h5>
        <Button
          as={Link}
          to=""
          variant="outline-primary"
          className="d-flex align-items-center"
          onClick={handleShowModal}
        >
          <FaPlus className="me-2" />
          Add New Contribution
        </Button>
      </div>
      <FormModal show={showModal} onHide={handleCloseModal} isGoal="false" />
      <Table striped>
        <thead>
          <tr>
            <th>#</th>
            <th>Contributed To</th>
            <th>Amount</th>
            <th>Created At</th>
          </tr>
        </thead>
        <tbody>
          {contributions ? (
            contributions.map(
              ({ contributionAmount, createdAt, goalId }, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>

                    <td>{getGoalName(goalId)}</td>
                    <td>{contributionAmount}</td>
                    <td>{createdAt}</td>
                  </tr>
                );
              }
            )
          ) : (
            <tr className="fst-italic d-flex justify-content-center mx-auto pt-4">
              No Current Contributions Added!
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
}

export default Contributions;
