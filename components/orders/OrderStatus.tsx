import React, { useState } from "react";
enum OrderStatus {
  Pending = "Pending",
  Completed = "Completed",
  Shipping = "Shipping",
}

interface StatusIndicatorProps {
  initialStatus: OrderStatus;
  orderId: string;
}

const statusColors = {
  [OrderStatus.Pending]: 'bg-yellow-500',
  [OrderStatus.Completed]: 'bg-green-500',
  [OrderStatus.Shipping]: 'bg-blue-500',
};

const StatusIndicator: React.FC<StatusIndicatorProps> = ({ initialStatus, orderId }) => {
  const [status, setStatus] = useState<OrderStatus>(initialStatus);

  const handleStatusChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = event.target.value as OrderStatus;
    setStatus(newStatus);
    try {
      // Call your API to update the status in the database
      await fetch(`/api/orders/${orderId}/status`, {
        method: 'PUT',
        body: JSON.stringify({ status: newStatus })
      });
      console.log('Status updated successfully');
    } catch (error) {
      console.error('Failed to update status', error);
    }
  };
  return (
    <div className="flex items-center">
      <span className={`w-4 h-4 mr-2 rounded-full ${statusColors[status]}`}></span>
      <select
        value={status}
        onChange={handleStatusChange}
        className="border border-gray-300 rounded p-1"
      >
        {Object.values(OrderStatus).map((status) => (
          <option key={status} value={status}>
            {status}
          </option>
        ))}
      </select>
    </div>
  );
};

export default StatusIndicator;