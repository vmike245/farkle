export interface Die {
  value: number;
  isHeld: boolean;
  isPermanentlyHeld: boolean;
}

interface scoringOpportunity {
  displayName: string;
  score: number;
  getRemaining(dice: number[]): number[];
  validator(dice: number[]): boolean;
}

export interface ScoringOpportunities {
  sixOfAKind: scoringOpportunity;
  straight: scoringOpportunity;
  threePair: scoringOpportunity;
  pairOf1s?: scoringOpportunity;
  pairOf6s?: scoringOpportunity
  pairOf5s?: scoringOpportunity;
  pairOf4s?: scoringOpportunity;
  pairOf3s?: scoringOpportunity;
  pairOf2s?: scoringOpportunity;
  one?: scoringOpportunity;
  five?: scoringOpportunity;
}