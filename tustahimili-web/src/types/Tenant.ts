export type Tenant = {
  id: number;
  name: string;
  phone: string;
  plotId: number;
  plotName: string;
  unit: string;
  agentId: number;
  rent: number;
};

export type Payment = {
  id: number;
  tenantId: number;
  date: string;
  amount: number;
};
