import  { useState } from "react";

type Agent = {
  id: number;
  name: string;
};

type Plot = {
  id: number;
  name: string;
};

type AssignAgentModalProps = {
  plot: Plot;
  onClose: () => void;
};

export default function AssignAgentModal({ plot, onClose }: AssignAgentModalProps) {
  const agents: Agent[] = [
    { id: 1, name: "Ahmed Ali" },
    { id: 2, name: "Grace Wanjiku" },
  ];

  const [selectedAgent, setSelectedAgent] = useState<number | "">("");

  const handleAssign = () => {
    if (selectedAgent !== "") {
      console.log(`Assign agent ${selectedAgent} to plot ${plot.id}`);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl w-96">
        <h3 className="text-lg font-semibold mb-4">
          Assign Agent to {plot?.name}
        </h3>

        <select
          className="w-full border px-3 py-2 mb-4 rounded"
          value={selectedAgent}
          onChange={(e) => setSelectedAgent(Number(e.target.value))}
        >
          <option value="">Select agent</option>
          {agents.map((a) => (
            <option key={a.id} value={a.id}>
              {a.name}
            </option>
          ))}
        </select>

        <div className="flex justify-end gap-3">
          <button className="px-4 py-2" onClick={onClose}>
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded"
            onClick={handleAssign}
          >
            Assign
          </button>
        </div>
      </div>
    </div>
  );
}
