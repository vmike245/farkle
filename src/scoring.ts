import { MAX_DICE } from "./constants";
import { ScoringOpportunities } from "./types";

const getUniqueDice = (dice: number[]) => {
  return dice.reduce((array: number[], die) => {
    if (array.indexOf(die) === -1) {
      return [...array, die];
    }
    return array;
  }, []);
};

/* tslint:disable: object-literal-sort-keys */
export const scoringOpportunities: ScoringOpportunities = {
  sixOfAKind: {
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
  straight: {
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
  threePair: {
    displayName: 'Three Pair',
    score: 1500,
    getRemaining: () => [],
    validator: (dice: number[]) => {
      if (dice.length !== MAX_DICE) {
        return false;
      }
      let diceCopy = [...dice];
      dice.forEach((die, index) => {
        const localDiceCopy = [...dice];
        localDiceCopy.splice(index, 1);
        const indexOfPair = localDiceCopy.indexOf(die);
        if (indexOfPair > -1 ) {
          localDiceCopy.splice(index, 1);
        }
      })
      const test = dice.reduce((array: number[], die) => {
        if (array.indexOf(die) === -1) {
          return [...array, die];
        }
        return array;
      }, [...dice]);
      return false
    },
  },
  pairOf1s: {
    displayName: 'Three Pair',
    score: 100,
    getRemaining: () => [],
    validator: (dice: number[]) => {
      return dice.indexOf(1) > -1;
      // return uniqueDice.length === 4;
    },
  },
  // pairOf1s: {
  //   displayName: 'Pair of 1s',
  //   score: 1000,
  //   getRemaining: (dice: number[]) => {

  //   }
  // }
};
/* tslint:enable: object-literal-sort-keys */
