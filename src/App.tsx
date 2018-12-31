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
import { scoringOpportunities } from "./scoring";
import { Die, scoringOpportunity } from "./types";

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

  private getScoringDice = (dice: Die[]) => {
    // return [1, 2, 3, 4, 5, 6];
    console.log('Scoring Dice');
    console.log(dice);
    return dice.map((die) => die.value);
  }

  private calculateScore = (currentDice: number[]) => {
    return Object.entries(scoringOpportunities).reduce(
      (score, [_, opportunity]: [string, scoringOpportunity]) => {
        if (opportunity.validator([...currentDice])) {
          console.log(opportunity.displayName);
          return score + opportunity.score;
        }
        return score;
      },
      0,
    );
  }
  private rollDice = () => {
    const { score, currentDice } = this.state;
    const diceKeptThisRoll = currentDice.filter(
      (die) => die.isHeld && !die.isPermanentlyHeld,
    );
    const newScore =
      score + this.calculateScore(this.getScoringDice(diceKeptThisRoll));
    const newDice = currentDice.map((die) => {
      if (die.isHeld || die.isPermanentlyHeld) {
        die.isPermanentlyHeld = true;
        return die;
      }
      return { ...die, value: this.getNewDieValue() };
    });
    const possiblyScoringDice = newDice.filter((die) => !die.isPermanentlyHeld);
    const possibleScore =
      this.calculateScore(this.getScoringDice(possiblyScoringDice));
    this.setState({
      currentDice: newDice,
      possibleScore,
      score: newScore,
    });
  }

  private holdDie = (index: number) => () => {
    const { currentDice } = this.state;
    const currentDiceCopy = [...currentDice];
    currentDiceCopy[index].isHeld = !currentDiceCopy[index].isHeld;
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
