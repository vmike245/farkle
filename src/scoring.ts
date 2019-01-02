import { Die } from "./types";

export default class ScoreCalculator {
  private score: number;
  private currentDice: number[];

  constructor(currentDice: Die[]) {
    this.currentDice = this.generateDiceMap(currentDice);
    this.score = 0;
  }

  public getScore = () => {
    const scoringFunctions = [
      this.sixOfAKind,
      this.straight,
      this.threePair,
      this.threeOnes,
      this.threeSixes,
      this.threeFives,
      this.threeFours,
      this.threeThrees,
      this.threeTwos,
      this.one,
      this.five,
    ];
    scoringFunctions.forEach((fn) => fn());
    return this.score;
  }

  private generateDiceMap = (currentDice: Die[]) => {
    const dieValues = currentDice.map((die) => die.value);
    return dieValues.reduce((diceMap: number[], die: number) => {
      const dieIndex = die - 1;
      if (diceMap[dieIndex]) {
        diceMap[dieIndex] = diceMap[dieIndex] + 1;
      }
      else {
        diceMap[dieIndex] = 1;
      }
      return diceMap;
    }, [0, 0, 0, 0, 0, 0]);
  }

  private sixOfAKind = () => {
    if (this.currentDice.some((die) => die === 6)) {
      console.log('Six of a kind');
      this.score = this.score + 5000;
      this.currentDice = this.currentDice.map((die) => {
        if (die === 6) {
          return 0;
        }
        return die;
      });
    }
  }

  private straight = () => {
    if (this.currentDice.every((die) => die === 1)) {
      console.log('Straight');
      this.score = this.score + 2000;
      this.currentDice = this.currentDice.map((die) => {
        if (die === 1) {
          return 0;
        }
        return die;
      });
    }
  }

  private threePair = () => {
    const countOfPairs = this.currentDice.reduce((count, die) => {
      if (die === 2) {
        return count + 1;
      }
      return count;
    }, 0);
    if (countOfPairs === 3) {
      console.log('Three pair');
      this.score = this.score + 1500;
      this.currentDice.map((die) => {
        if (die === 2) {
          return 0;
        }
        return die;
      });
    }
  }

  private threeOnes = () => {
    const dieIndex = 0;
    if (this.currentDice[dieIndex] >= 3) {
      console.log('Three ones');
      this.score = this.score + 1000;
      this.currentDice[dieIndex] = this.currentDice[dieIndex] - 3;
    }
  }

  private threeSixes = () => {
    const dieIndex = 5;
    if (this.currentDice[dieIndex] >= 3) {
      console.log('Three sixes');
      this.score = this.score + 600;
      this.currentDice[dieIndex] = this.currentDice[dieIndex] - 3;
    }
  }

  private threeFives = () => {
    const dieIndex = 4;
    if (this.currentDice[dieIndex] >= 3) {
      console.log('Three fives');
      this.score = this.score + 500;
      this.currentDice[dieIndex] = this.currentDice[dieIndex] - 3;
    }
  }

  private threeFours = () => {
    const dieIndex = 3;
    if (this.currentDice[dieIndex] >= 3) {
      console.log('Three fours');
      this.score = this.score + 400;
      this.currentDice[dieIndex] = this.currentDice[dieIndex] - 3;
    }
  }

  private threeThrees = () => {
    const dieIndex = 2;
    if (this.currentDice[dieIndex] >= 3) {
      console.log('Three threes');
      this.score = this.score + 300;
      this.currentDice[dieIndex] = this.currentDice[dieIndex] - 3;
    }
  }

  private threeTwos = () => {
    const dieIndex = 1;
    if (this.currentDice[dieIndex] >= 3) {
      console.log('Three twos');
      this.score = this.score + 200;
      this.currentDice[dieIndex] = this.currentDice[dieIndex] - 3;
    }
  }

  private one = () => {
    const dieIndex = 0;
    if (!!this.currentDice[dieIndex]) {
      console.log(`${this.currentDice[dieIndex]} Ones`);
      this.score = this.score + this.currentDice[dieIndex] * 100;
      this.currentDice[dieIndex] = 0;
    }
  }

  private five = () => {
    const dieIndex = 4;
    if (!!this.currentDice[dieIndex]) {
      console.log(`${this.currentDice[dieIndex]} Fives`);
      this.score = this.score + this.currentDice[dieIndex] * 50;
      this.currentDice[dieIndex] = 0;
    }
  }
}
