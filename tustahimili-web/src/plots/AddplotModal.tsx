


type AddPlotModalProps = {
  onClose: () => void;
};

export default function AddPlotModal({ onClose }: AddPlotModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl w-96">

        <h3 className="text-lg font-semibold mb-4">Add New Plot</h3>

        <input
          placeholder="Plot Name"
          className="w-full border rounded px-3 py-2 mb-3"
        />
        <input
          placeholder="Location"
          className="w-full border rounded px-3 py-2 mb-3"
        />
        <input
          type="number"
          placeholder="Total Units"
          className="w-full border rounded px-3 py-2 mb-3"
        />

        <div className="flex justify-end gap-3">
          <button className="px-4 py-2" onClick={onClose}>Cancel</button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded">
            Save
          </button>
        </div>

      </div>
    </div>
  );
}
