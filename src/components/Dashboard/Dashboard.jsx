import "./Dashboard.css";
import { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { MetricCard } from "../MetricCard/MetricCard";
import { MetricControl } from "../MetricControl/MetricControl";

export const Dashboard = () => {
  const [metrics, setMetrics] = useState([]);

  useEffect(() => {
    const savedMetrics = JSON.parse(localStorage.getItem("metric"));

    if (savedMetrics) {
      setMetrics(savedMetrics);
    } else {
      fetch("http://localhost:3000/metrics")
        .then((response) => response.json())
        .then((data) => setMetrics(data));
    }
  }, []);

  useEffect(() => {
    if (metrics.length > 0) {
      localStorage.setItem("metric", JSON.stringify(metrics));
    }
  }, [metrics]);

  const handleToggle = (id) => {
    setMetrics(
      metrics.map((item) =>
        item.id === id ? { ...item, visible: !item.visible } : item
      ),
    );
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const items = [...metrics];

    const [removedItem] = items.splice(result.source.index, 1);

    items.splice(result.destination.index, 0, removedItem);

    setMetrics(items);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="dashboard">
        <div className="control">
          <MetricControl metrics={metrics} handleToggle={handleToggle} />
        </div>

        <Droppable droppableId="metrics">
          {(provided) => (
            <div
              className="card"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {metrics
                .filter((metric) => metric.visible)
                .map((metric, index) => (
                  <Draggable
                    key={metric.id}
                    draggableId={metric.id.toString()}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <MetricCard title={metric.title} value={metric.value} />
                      </div>
                    )}
                  </Draggable>
                ))}

              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    </DragDropContext>
  );
};
