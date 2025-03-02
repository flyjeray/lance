export type TestMonorepoModel = {
  field_1: string;
  field_2: number;
};

export const parseTestMonorepoModelToText = (entry: TestMonorepoModel) =>
  `Using Monorepo Model for field ${entry.field_1}-${entry.field_2}`;
