import { Button, Container, Col, Row } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import { FormModal, GoalCard } from "../components";
import { useState } from "react";
import { useSavings } from "../contexts/SavingsContext";

function Goals() {
  const { getGoalsWithStats } = useSavings();
  const [showModal, setShowModal] = useState(false);

  const goals = getGoalsWithStats();

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  return (
    <div>
      <div className="d-flex flex-row justify-content-between mx-2 my-4">
        <h5 className="font-weight-bold">Goals</h5>
        <Button
          as={Link}
          to=""
          variant="outline-primary"
          className="d-flex align-items-center"
          onClick={handleShowModal}
        >
          <FaPlus className="me-2" />
          Create New Saving Goal
        </Button>
      </div>
      <FormModal show={showModal} onHide={handleCloseModal} isGoal="true" />
      <Container className="pt-4" fluid>
        <Row className="g-4">
          {goals.length !== 0 ? (
            goals.map((goal, index) => (
              <Col key={goal.id} xs={12} sm={12} md={6} lg={4}>
                {" "}
                <GoalCard goal={goal} />
              </Col>
            ))
          ) : (
            <p className="d-flex justify-content-center fst-italic">
              No Saving Goals Added!
            </p>
          )}
        </Row>
      </Container>
    </div>
  );
}

export default Goals;
