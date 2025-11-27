import StatsCard  from "../components/StatsCard";

export default function AgentPlots() {
  // Dummy data (later can come from API)
  const plots = [
    {
      id: 1,
      name: "Sunshine Apartments",
      location: "Kasarani",
      totalUnits: 40,
      occupiedUnits: 32,
    },
    {
      id: 2,
      name: "GreenView Estate",
      location: "Ruaka",
      totalUnits: 25,
      occupiedUnits: 21,
    }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <StatsCard title="Assigned Plots" value={plots.length} icon="🏢" />
        <StatsCard
          title="Total Units"
          value={plots.reduce((sum, p) => sum + p.totalUnits, 0)}
          icon="🔢"
        />
      </div>

      <h2 className="text-xl font-semibold">My Assigned Plots</h2>

      <div className="overflow-x-auto bg-white p-4 rounded-lg shadow">
        <table className="w-full">
          <thead>
            <tr className="border-b text-left">
              <th className="py-3">Plot</th>
              <th>Location</th>
              <th>Total Units</th>
              <th>Occupied</th>
              <th>Occupancy %</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {plots.map((plot) => {
              const occupancy = Math.round((plot.occupiedUnits / plot.totalUnits) * 100);

              return (
                <tr key={plot.id} className="border-b">
                  <td className="py-3">{plot.name}</td>
                  <td>{plot.location}</td>
                  <td>{plot.totalUnits}</td>
                  <td>{plot.occupiedUnits}</td>
                  <td className="font-semibold">{occupancy}%</td>

                  <td className="text-right">
                    <a
                      href={`/plot/${plot.id}`}
                      className="text-blue-600 hover:underline"
                    >
                      View Performance
                    </a>
                  </td>
                </tr>
              );
            })}
          </tbody>

        </table>
      </div>
    </div>
  );
}
