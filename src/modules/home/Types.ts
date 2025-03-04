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
