export type OptionType = {
  id: number;
  label: string;
};

export type FormCreate = {
  urgency: Array<OptionType>;
  status: Array<OptionType>;
  title: string;
  description: string;
};

export type MaintenanceRequest = {
  ID: number;
  Title: string;
  Status: number;
  Date: string;
  IsResolved: boolean;
  Emergency: number;
};
