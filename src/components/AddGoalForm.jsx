import { useState } from "react";
import { Button, Form, Alert } from "react-bootstrap";
import { useSavings } from "../contexts/SavingsContext";

function AddGoalForm({ onHide }) {
  const { addGoal } = useSavings();
  const [formData, setFormData] = useState({
    goalName: "",
    goalDescription: "",
    targetAmount: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Validation
    if (!formData.goalName.trim()) {
      setError("Goal name is required");
      setLoading(false);
      return;
    }

    const amount = Number(formData.targetAmount);
    if (!amount || amount <= 0) {
      setError("Target amount must be a positive number");
      setLoading(false);
      return;
    }

    try {
      addGoal({
        goalName: formData.goalName,
        goalDescription: formData.goalDescription,
        targetAmount: amount,
      });

      // Reset form and close modal
      setFormData({ goalName: "", goalDescription: "", targetAmount: "" });
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
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="What's your saving goal?"
          value={formData.goalName}
          onChange={(e) =>
            setFormData({ ...formData, goalName: e.target.value })
          }
          required
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          placeholder="What's the goal for, be as descriptive as possible."
          value={formData.goalDescription}
          onChange={(e) =>
            setFormData({ ...formData, goalDescription: e.target.value })
          }
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Target</Form.Label>
        <Form.Control
          type="number"
          placeholder="How much is your target?"
          min="0.01"
          step="0.01"
          value={formData.targetAmount}
          onChange={(e) =>
            setFormData({ ...formData, targetAmount: e.target.value })
          }
          required
        />
      </Form.Group>

      <div className="d-flex justify-content-end gap-2">
        <Button variant="secondary" onClick={onHide} disabled={loading}>
          Close
        </Button>
        <Button variant="primary" type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create Goal"}
        </Button>
      </div>
    </Form>
  );
}

export default AddGoalForm;
