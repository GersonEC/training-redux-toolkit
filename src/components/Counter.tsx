interface CounterProps {
  count: number;
  onIncrement: () => void;
  onDecrement: () => void;
}

export function Counter({ count, onIncrement, onDecrement }: CounterProps) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "2rem",
      }}
    >
      <button onClick={onDecrement}> - </button>
      <h1> {count} </h1>
      <button onClick={onIncrement}> + </button>
    </div>
  );
}
