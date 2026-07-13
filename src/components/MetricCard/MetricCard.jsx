import "./MetricCard.css"

export const MetricCard = ({title, value}) => {
  return (
    <section className="metric-card">
      <h2 className="metric-title">
        {title}
        <span className="metric-value">{value}</span>
      </h2>
    </section>
  );
};
