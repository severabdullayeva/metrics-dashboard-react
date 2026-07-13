import './MetricControl.css'

export const MetricControl = ({ metrics, handleToggle }) => {
  return (
    <form className="form">
      {metrics.map((item) => (
        <div key={item.id}>
          <input
            type="checkbox"
            id={item.id}
            checked={item.visible}
            onChange={() => handleToggle(item.id)}
          />

          <label htmlFor={item.id}>
            {item.title}
          </label>
        </div>
      ))}
    </form>
  );
};