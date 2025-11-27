import PlotPerformanceCharts from "./PlotPerformanceChart";


type PlotPerformanceProps = {
  params: {
    id: string; // wouter always passes params as strings
  };
};

export default function PlotPerformance({ params }: PlotPerformanceProps) {
  const plotId = params.id;

  // Dummy plot data
  const plot = {
    id: plotId,
    name: "Sunshine Apartments",
    location: "Kasarani",
    totalUnits: 40,
    occupiedUnits: 32,
  };

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-xl font-semibold">{plot.name} - Performance</h2>
      <p className="text-gray-600">{plot.location}</p>

      <PlotPerformanceCharts />
    </div>
  );
}
