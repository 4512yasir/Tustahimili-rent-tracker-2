import { useUser } from "@/context/useUser";
import DashboardLayout from "./DashboardLayout";
import AdminPlots from "../plots/AdminPlot";
import AgentPlots from "../plots/AgentPlot";

function PlotsWrapper() {
  const { user } = useUser();
  if (!user) return null;

  // Choose which plot page to render
  const content = user.role === "admin" ? <AdminPlots /> : <AgentPlots />;

  // Wrap it in DashboardLayout so sidebar & header appear
  return <DashboardLayout role={user.role} content={content} />;
}
export default PlotsWrapper;
