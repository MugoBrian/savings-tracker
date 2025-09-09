import { Card, ProgressBar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSavings } from "../contexts/SavingsContext";

function GoalCard({ goal }) {
  const { getGoalStats } = useSavings();
  const { id, goalName, targetAmount } = goal;
  const { currentBalance, progressPercent } = getGoalStats(id);

  return (
    <Card className="h-100">
      <Card.Body className="d-flex flex-column">
        <Card.Title>{goalName}</Card.Title>

        <div className="mb-3">
          <div className="d-flex justify-content-between mb-2">
            <span>
              <strong>Target Amount:</strong>
            </span>
            <span>KES: {targetAmount.toLocaleString()}</span>
          </div>

          <div className="d-flex justify-content-between mb-2">
            <span>
              <strong>Current Balance:</strong>
            </span>
            <span>KES: {currentBalance.toLocaleString()}</span>
          </div>

          <div className="mb-3">
            <div className="d-flex justify-content-between mb-1">
              <span>
                <strong>Progress:</strong>
              </span>
              <span>{progressPercent}%</span>
            </div>
            <ProgressBar
              now={progressPercent}
              variant={progressPercent >= 100 ? "success" : "primary"}
              striped={progressPercent < 100}
            />
          </div>
        </div>
      </Card.Body>

      <Card.Footer className="d-flex justify-content-end">
        <Card.Link as={Link} to="/contributions">
          Add Contribution
        </Card.Link>
      </Card.Footer>
    </Card>
  );
}

export default GoalCard;
