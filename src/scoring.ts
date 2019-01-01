import { MAX_DICE } from "./constants";
import { scoringOpportunity } from "./types";

const getUniqueDice = (dice: number[]) => {
  return dice.reduce((array: number[], die) => {
    if (array.indexOf(die) === -1) {
      return [...array, die];
    }
    return array;
  }, []);
};

/* tslint:disable: object-literal-sort-keys */
export const scoringOpportunities: scoringOpportunity[] = [
  {
    displayName: 'Six of a kind',
    score: 5000,
    getRemaining: () => [],
    validator: (dice: number[]) => {
      if (dice.length !== MAX_DICE) {
        return false;
      }
      const uniqueDice = getUniqueDice(dice);
      return uniqueDice.length === 1;
    },
  },
  {
    displayName: 'Straight',
    score: 2000,
    getRemaining: () => [],
    validator: (dice: number[]) => {
      if (dice.length !== MAX_DICE) {
        return false;
      }
      const uniqueDice = getUniqueDice(dice);
      return uniqueDice.length === MAX_DICE;

    },
  },
  {
    displayName: 'Three Pair',
    score: 1500,
    getRemaining: () => [],
    validator: (dice: number[]) => {
      if (dice.length !== MAX_DICE) {
        return false;
      }
      const diceCopy = [...dice].sort();
      const maxIterations = diceCopy.length / 2;
      for (let i = 0; i < maxIterations; i++) {
        const firstValue = diceCopy.pop();
        const secondValue = diceCopy.pop();
        if (firstValue !== secondValue) {
          return false;
        }
      }
      return true;
    },
  },
  {
    displayName: 'Three Pair',
    score: 100,
    getRemaining: () => [],
    validator: (dice: number[]) => {
      return dice.indexOf(1) > -1;
    },
  },
  // pairOf1s: {
  //   displayName: 'Pair of 1s',
  //   score: 1000,
  //   getRemaining: (dice: number[]) => {

  //   }
  // }
];
/* tslint:enable: object-literal-sort-keys */
