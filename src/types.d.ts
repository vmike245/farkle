export interface Die {
  value: number;
  isHeld: boolean;
  isPermanentlyHeld: boolean;
}

export interface scoringOpportunity {
  displayName: string;
  score: number;
  getRemaining(dice: number[]): number[];
  validator(dice: number[]): boolean;
}

export interface DiceMap {
  1: number;
  2: number;
  3: number;
  4: number;
  5: number;
  6: number;
}