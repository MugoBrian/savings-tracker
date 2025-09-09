import { Container, Button, Row, Col, ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import { GoalCard } from "../components";
import { useSavings } from "../contexts/SavingsContext";

function Dashboard() {
  const { contributions, getGoalsWithStats } = useSavings();
  const goals = getGoalsWithStats();

  return (
    <div className="m-2">
      <h4 className="pt-4 pb-4 ml-4">Welcome, Track your savings</h4>
      <div className="d-flex flex-row justify-content-between mx-2">
        <h5 className="font-weight-bold">Goals</h5>
        <Button as={Link} to="/goals" variant="outline-primary">
          View All
        </Button>
      </div>
      <Container className="pt-4" fluid>
        <Row className="g-4">
          {goals.length !== 0 ? (
            goals.map((goal, index) => (
              <Col key={index} xs={12} sm={12} md={6} lg={4}>
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
      <div className="d-flex flex-row justify-content-between mx-2 my-4">
        <h5 className="font-weight-bold">Recent Contributions</h5>
        <Button as={Link} to="/contributions" variant="outline-primary">
          View More
        </Button>
      </div>
      <ListGroup>
        {contributions.length !== 0 ? (
          contributions
            .slice(0, 3)
            .map(({ contributionAmount, createdAt }, index) => (
              <ListGroup.Item key={index}>
                {contributionAmount} deposited at {createdAt}{" "}
              </ListGroup.Item>
            ))
        ) : (
          <p className="fst-italic d-flex justify-content-center">
            No Current Contributions Added!
          </p>
        )}
      </ListGroup>
    </div>
  );
}

export default Dashboard;
