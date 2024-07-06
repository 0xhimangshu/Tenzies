import { useState, useEffect } from "react";
import Die from "./Die";
import { nanoid } from "nanoid";
// import default from "@react-hook/window-size";
import Confetti from "react-confetti";

function App() {
  const [dice, setDice] = useState(allNewDice());

  const [tenzies, setTenzies] = useState(false);

  useEffect(() => {
    const allHeld = dice.every((die) => die.isHeld);
    const firstValue = dice[0].value;
    const allSameValue = dice.every((die) => die.value === firstValue);

    if (allSameValue && allHeld) {
      setTenzies(true);
      console.log("win");
    }
  }, [dice]);

  function generateNewDie() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    };
  }

  function allNewDice() {
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push(generateNewDie());
    }
    return newDice;
  }

  function holdDice(id) {
    console.log(id);

    setDice((prevState) => {
      return prevState.map((die) => {
        if (die.id === id) {
          return { ...die, isHeld: !die.isHeld };
        } else {
          return { ...die };
        }
      });
    });

    console.log(dice);
  }

  function rollDice() {
    setDice((prevState) => {
      return prevState.map((die) => {
        return die.isHeld ? die : generateNewDie();
      });
    });
  }

  const diceElements = dice.map((die, index) => (
    <Die
      key={die.id}
      value={die.value}
      isHeld={die.isHeld}
      id={die.id}
      holdDice={() => {
        holdDice(die.id);
      }}
    />
  ));

  return (
    <main>
      {tenzies && (
        <Confetti
        // height={useWindowSize.height} width={useWindowSize.width}
        />
      )}
      <h1>Tenzies</h1>
      <p>
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>

      <div className="dice-container">{diceElements}</div>
      <button onClick={rollDice}>{tenzies ? "New Game" : "Roll"}</button>
    </main>
  );
}

export default App;
