export type ResultItemType = { pA: number; pB: number; sum: number };
export type ResultType = ResultItemType[];
export type CalculateResultType = {
  input: number[];
  result: ResultType;
  error: string | null;
};
export type FormValues = { numbers: string };
