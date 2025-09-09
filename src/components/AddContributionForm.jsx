import { useState } from "react";
import { Button, Form, Alert } from "react-bootstrap";
import { useSavings } from "../contexts/SavingsContext";

function AddContributionForm({ goalId, onHide }) {
  const { addContribution, goals } = useSavings();
  const [formData, setFormData] = useState({
    selectedGoalId: goalId || "",
    contributionAmount: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Validation
    if (!formData.selectedGoalId) {
      setError("Please select a goal");
      setLoading(false);
      return;
    }

    const amount = Number(formData.contributionAmount);
    if (!amount || amount <= 0) {
      setError("Contribution amount must be a positive number");
      setLoading(false);
      return;
    }

    try {
      addContribution(Number(formData.selectedGoalId), amount);

      // Reset form and close modal
      setFormData({ selectedGoalId: goalId || "", contributionAmount: "" });
      onHide();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      {error && <Alert variant="danger">{error}</Alert>}

      <Form.Group className="mb-3">
        <Form.Label>Select Goal</Form.Label>
        <Form.Select
          value={formData.selectedGoalId}
          onChange={(e) =>
            setFormData({ ...formData, selectedGoalId: e.target.value })
          }
          required
          disabled={!!goalId} // Disable if goalId is provided (coming from specific goal page)
        >
          <option value="">Choose a goal...</option>
          {goals.map((goal) => (
            <option key={goal.id} value={goal.id}>
              {goal.goalName} of (Target: KES: {goal.targetAmount})
            </option>
          ))}
        </Form.Select>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Contribution Amount (KES)</Form.Label>
        <Form.Control
          type="number"
          placeholder="Enter contribution amount"
          min="0.01"
          step="0.01"
          value={formData.contributionAmount}
          onChange={(e) =>
            setFormData({ ...formData, contributionAmount: e.target.value })
          }
          required
        />
        <Form.Text className="text-muted">
          Amount will be added to your goal balance and progress will update
          automatically
        </Form.Text>
      </Form.Group>

      <div className="d-flex justify-content-end gap-2">
        <Button variant="secondary" onClick={onHide} disabled={loading}>
          Close
        </Button>
        <Button variant="success" type="submit" disabled={loading}>
          {loading ? "Adding..." : "Add Contribution"}
        </Button>
      </div>
    </Form>
  );
}

export default AddContributionForm;
