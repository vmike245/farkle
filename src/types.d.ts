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