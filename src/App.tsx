/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/emin93/react-native-template-typescript
 *
 * @format
 */

import React, { Component } from "react";
import { Button, Platform, StyleSheet, Text, View } from "react-native";
import { MAX_DIE_VALUE } from "./constants";
import ScoreCalculator from "./scoring";
import { DiceMap, Die, scoringOpportunity } from "./types";

const instructions = Platform.select({
  android:
    "Double tap R on your keyboard to reload,\n" +
    "Shake or press menu button for dev menu",
  ios: "Press Cmd+R to reload,\n" + "Cmd+D or shake for dev menu",
});

interface State {
  currentDice: Die[];
  score: number;
  possibleScore: number;
}

export default class App extends Component<{}, State> {
  public readonly state = {
    currentDice: [
      {
        isHeld: false,
        isPermanentlyHeld: false,
        value: 1,
      },
      {
        isHeld: false,
        isPermanentlyHeld: false,
        value: 1,
      },
      {
        isHeld: false,
        isPermanentlyHeld: false,
        value: 1,
      },
      {
        isHeld: false,
        isPermanentlyHeld: false,
        value: 1,
      },
      {
        isHeld: false,
        isPermanentlyHeld: false,
        value: 1,
      },
      {
        isHeld: false,
        isPermanentlyHeld: false,
        value: 1,
      },
    ],
    possibleScore: 0,
    score: 0,
  };

  public render() {
    const { currentDice, score, possibleScore } = this.state;
    console.log(this.state);
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to React Native!</Text>
        <Text style={styles.instructions}>To get started, edit sApp.tsx</Text>
        <Text style={styles.instructions}>{instructions}</Text>
        <Text style={styles.instructions}>Possible Score: {possibleScore}</Text>
        <Text style={styles.instructions}>Score: {score}</Text>
        {currentDice.map((die, index) => (
          <Text
            key={index}
            onPress={this.holdDie(index)}
            style={styles.instructions}
          >
            {die.value}
          </Text>
        ))}
        <Button title="Roll Die" onPress={this.rollDice} />
      </View>
    );
  }

  private getNewDieValue = () => Math.floor(Math.random() * MAX_DIE_VALUE) + 1; // Add 1 because we want 1 - 6 not 0 - 5

  private calculateScore = (currentDice: Die[]) => {
    const dieValues = currentDice.map((die) => die.value);
    const scoreCalc = new ScoreCalculator(dieValues);
    return scoreCalc.getScore();
  }

  private getNewDice = (dice: Die[]) => {
    return dice.map((die) => {
      if (die.isHeld || die.isPermanentlyHeld) {
        return die;
      }
      return { ...die, value: this.getNewDieValue() };
    });
  }

  private allDiceHeld = (dice: Die[]) =>
    dice.every(({ isPermanentlyHeld }) => isPermanentlyHeld)

  private resetDice = (dice: Die[]): Die[] => {
    return dice.map((die) => ({
      ...die,
      isHeld: false,
      isPermanentlyHeld: false,
    }));
  }

  private updatePermanentHold = (dice: Die[]): Die[] => {
    return dice.map((die) => {
      if (die.isPermanentlyHeld) {
        return {
          ...die,
          isHeld: false,
        };
      } else if (die.isHeld) {
        return {
          ...die,
          isHeld: false,
          isPermanentlyHeld: true,
        };
      } else {
        return { ...die };
      }
    });
  }

  private rollDice = () => {
    const { score, currentDice } = this.state;

    const diceKeptThisRoll = currentDice.filter(
      (die) => die.isHeld && !die.isPermanentlyHeld,
    );
    const newScore = score + this.calculateScore(diceKeptThisRoll);

    const updateDice = this.updatePermanentHold(currentDice);

    const newDice = this.allDiceHeld(updateDice)
      ? this.getNewDice(this.resetDice(updateDice))
      : this.getNewDice(updateDice);

    const possiblyScoringDice = newDice.filter((die) => !die.isPermanentlyHeld);
    const possibleScore = this.calculateScore(possiblyScoringDice);

    this.setState({
      currentDice: newDice,
      possibleScore,
      score: newScore,
    });
  }

  private holdDie = (index: number) => () => {
    const { currentDice } = this.state;
    const currentDiceCopy = [...currentDice];
    currentDiceCopy[index].isHeld = currentDiceCopy[index].isPermanentlyHeld
      ? currentDiceCopy[index].isHeld
      : !currentDiceCopy[index].isHeld;
    this.setState({ currentDice: currentDiceCopy });
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "#F5FCFF",
    flex: 1,
    justifyContent: "center",
  },
  instructions: {
    color: "#333333",
    marginBottom: 5,
    textAlign: "center",
  },
  welcome: {
    fontSize: 20,
    margin: 10,
    textAlign: "center",
  },
});
