export default class ScoreCalculator {
  private currentDice: number[];

  constructor(currentDice: number[]) {
    this.currentDice = this.generateDiceMap(currentDice);
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
    return scoringFunctions.reduce((score, fn) => score + fn(), 0);
  }

  public getRemainingDiceCount() {
    return this.currentDice.reduce((count, dieCount) => count + dieCount);
  }

  private generateDiceMap = (dieValues: number[]) => {
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

  private sixOfAKind = (): number => {
    if (this.currentDice.some((die) => die === 6)) {
      console.log('Six of a kind');
      this.currentDice = this.currentDice.map((die) => {
        if (die === 6) {
          return 0;
        }
        return die;
      });
      return 5000;
    }
    return 0;
  }

  private straight = (): number => {
    if (this.currentDice.every((die) => die === 1)) {
      console.log('Straight');
      this.currentDice = this.currentDice.map((die) => {
        if (die === 1) {
          return 0;
        }
        return die;
      });
      return 2000;
    }
    return 0;
  }

  private threePair = (): number => {
    const countOfPairs = this.currentDice.reduce((count, die) => {
      if (die === 2) {
        return count + 1;
      }
      return count;
    }, 0);
    if (countOfPairs === 3) {
      console.log('Three pair');
      this.currentDice.map((die) => {
        if (die === 2) {
          return 0;
        }
        return die;
      });
      return 1500;
    }
    return 0;
  }

  private threeOnes = (): number => {
    const dieIndex = 0;
    if (this.currentDice[dieIndex] >= 3) {
      console.log('Three ones');
      this.currentDice[dieIndex] = this.currentDice[dieIndex] - 3;
      return 1000;
    }
    return 0;
  }

  private threeSixes = (): number => {
    const dieIndex = 5;
    if (this.currentDice[dieIndex] >= 3) {
      console.log('Three sixes');
      this.currentDice[dieIndex] = this.currentDice[dieIndex] - 3;
      return 600;
    }
    return 0;
  }

  private threeFives = (): number => {
    const dieIndex = 4;
    if (this.currentDice[dieIndex] >= 3) {
      console.log('Three fives');
      this.currentDice[dieIndex] = this.currentDice[dieIndex] - 3;
      return 500;
    }
    return 0;
  }

  private threeFours = (): number => {
    const dieIndex = 3;
    if (this.currentDice[dieIndex] >= 3) {
      console.log('Three fours');
      this.currentDice[dieIndex] = this.currentDice[dieIndex] - 3;
      return 400;
    }
    return 0;
  }

  private threeThrees = (): number => {
    const dieIndex = 2;
    if (this.currentDice[dieIndex] >= 3) {
      console.log('Three threes');
      this.currentDice[dieIndex] = this.currentDice[dieIndex] - 3;
      return 300;
    }
    return 0;
  }

  private threeTwos = (): number => {
    const dieIndex = 1;
    if (this.currentDice[dieIndex] >= 3) {
      console.log('Three twos');
      this.score = this.score + 200;
      this.currentDice[dieIndex] = this.currentDice[dieIndex] - 3;
      return 200;
    }
    return 0;
  }

  private one = (): number => {
    const dieIndex = 0;
    if (!!this.currentDice[dieIndex]) {
      console.log(`${this.currentDice[dieIndex]} Ones`);
      const score = this.currentDice[dieIndex] * 100;
      this.currentDice[dieIndex] = 0;
      return score;
    }
    return 0;
  }

  private five = (): number => {
    const dieIndex = 4;
    if (!!this.currentDice[dieIndex]) {
      console.log(`${this.currentDice[dieIndex]} Fives`);
      const score = this.currentDice[dieIndex] * 50;
      this.currentDice[dieIndex] = 0;
      return score;
    }
    return 0;
  }
}
