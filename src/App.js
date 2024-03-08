import { useState } from "react";

function Square({ value, onSquareClick }) {
  const style =
    value === "X" ? "square x" : value === "O" ? "square o" : "square";

  return (
    <button onClick={onSquareClick} className={style}>
      {value}
    </button>
  );
}

function Board({ xIsNext, squares, onPlay, currentMove }) {
  function handleClick(i) {
    if (squares[i] || calculateWinner(squares)) {
      return;
    }

    const nextSquares = squares.slice();

    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    onPlay(nextSquares);
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  let moveInfo = "You are at move # " + (currentMove + 1);
  console.log(winner);
  let stateStyle = winner ? "status " + winner : "status";
  stateStyle = stateStyle.toLowerCase();
  console.log(stateStyle);

  return (
    <>
      {/* TODO: Re-add the status back in within Game component */}
      <div className="board__status">
        <div className={stateStyle}>
          {status}
          <br></br>
          {/* {moveInfo} */}
        </div>
        <div className="board-grid">
          <div className="board-row">
            <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
            <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
            <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
          </div>
          <div className="board-row">
            <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
            <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
            <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
          </div>
          <div className="board-row">
            <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
            <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
            <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
          </div>
        </div>
      </div>
    </>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }

  return null;
}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
    console.log(currentMove);
    // setXIsNext(!xIsNext);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
    // setXIsNext(nextMove % 2 === 0);
    const nextHistory = [...history.slice(0, currentMove + 1)];
    setHistory(nextHistory);
    moves = history.map((squares, move) => {
      let description;
      if (move > 0) {
        description = "#" + move + ".";
      } else {
        description = "Go to game Start";
      }

      return (
        <li key={move}>
          <button className="history__btn" onClick={() => jumpTo(move)}>
            {description}
          </button>
        </li>
      );
    });
  }

  function reset() {
    setCurrentMove(0);
    setHistory([Array(9).fill(null)]);
    moves = [null];
  }

  let moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = "#" + move + ".";
    } else {
      description = "Go to game Start";
    }

    return (
      <li key={move}>
        <button className="history__btn" onClick={() => jumpTo(move)}>
          {description}
        </button>
      </li>
    );
  });

  moves = moves.slice(1);

  return (
    <>
      <div className="game__container">
        <div className="title">
          <h1>THE FANTAS-TIC TAC TOE</h1>
        </div>
        <div className="game">
          <div className="game__row1">
            <div className="game-board">
              <Board
                currentMove={currentMove}
                xIsNext={xIsNext}
                squares={currentSquares}
                onPlay={handlePlay}
              />
            </div>
            {/* TODO: Re-add history button to take back moves but make it look more intersting */}
            {/* <div className="game-info">
              <ul className="history">{moves}</ul>
            </div> */}
          </div>
          <div className="game__row2">
            <div className="reset">
              <button className="reset__btn" onClick={() => reset()}>
                Reset
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
