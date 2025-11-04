export interface User {
  username: string;
  balance: number;
  token?: string;
}

// export interface Bet {
//   type: string;
//   value: string | number;
//   amount: number;
// }

export type BetType =
  | "straight"
  | "split"
  | "street"
  | "corner"
  | "line"
  | "column"
  | "dozen"
  | "red"
  | "black"
  | "odd"
  | "even"
  | "high"
  | "low";

export interface Bet {
  type: string;
  value: number | number[];
  amount: number;
}

export interface SpinResult {
  number: number;
  color: "red" | "black" | "green";
}
