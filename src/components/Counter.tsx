interface CounterProps {
  count: number;
  onIncrement: () => void;
  onDecrement: () => void;
  onResetSteps: () => void;
}

export function Counter({ count, onIncrement, onResetSteps }: CounterProps) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "2rem",
      }}
    >
      <h1> You've walked {count} steps today! </h1>
      <button onClick={onIncrement}> Add a step </button>
      <button onClick={onResetSteps}> Reset steps </button>
    </div>
  );
}
