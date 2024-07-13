// import { useState } from 'react';
// import Lamp from './Lamp';
// import './Style.css'

// const Game = ({level}) => {
//     // Create the initial board state based on the number
//     const initialBoard = Array.from({ length: level }, (_, rowIndex) =>
//         Array.from({ length: level - rowIndex }, () => null)
//     );
//     const initialRows = Array.from({ length: 3 }, (_, rowIndex) =>
//         Array.from({ length: level }, (_, colIndex) =>
//             level - colIndex
//         )
//     );

//     const [board, setBoard] = useState(initialBoard);
//     const [rows, setRows] = useState(initialRows);

//     const [player1, setPlayer1] = useState({
//         role: "first",
//         color: "blue",
//         score: 0,
//     });
//     const [player2, setPlayer2] = useState({
//         role: "second",
//         color: "red",
//         score: 0,
//     });
//     const [currentPlayer, setCurrentPlayer] = useState(player1);

//             // //update rows
//     const handleSelectedLamps = (rows, rowIndex, position, label) => {
//         const rowValue = rows[rowIndex][position];
//         if (rowValue > 0) {
//             rows[rowIndex][position] -= 1;

//         }
//     };

//     function handelLampClicked (index, position) {
//         //game board
//         const [i, j] = index;
//         setBoard(prevBoard => {
//             const newBoard = [...prevBoard];
//             newBoard[i] = [...newBoard[i]];
//             newBoard[i][j] = currentPlayer.color;
//             return newBoard;
//         });

//         setRows(prevRows => {
//             const newRows = prevRows.map(row => [...row]);
//             handleSelectedLamps(newRows, 0, position[0], "a");
//             handleSelectedLamps(newRows, 1, position[1], "b");
//             handleSelectedLamps(newRows, 2, position[2], "c");
//             return newRows;
//         });

//         // changing the currentPlayer
//         setCurrentPlayer(prevPlayer => {
//             if(prevPlayer.role === "first"){
//                 return player2
//             } else {
//                 return player1;
//             }
//         });

//     }
//     console.log("player: ", currentPlayer);
//     console.log("rows: ", rows);
//     console.log("board: ", board);

//     function calculatePosition (i, j) {
//         const a = i;
//         const b = j;
//         const c = (level-1) - i - j;
//         return [a, b, c];
//     };

//     function handleFillRow (e){
//         const [i, j] = e;
//         setBoard(prevBoard => {
//             const newBoard = [...prevBoard];
//             newBoard[i] = [...newBoard[i]];
//             if(newBoard[i][j]){
//                 newBoard[i][j] =  currentPlayer.color === "red" ? "blue" : "red";
//                 addScore(1);
//             }
//             return newBoard;
//         });
//     }

//     function addScore(e){
//         console.log(e, currentPlayer.color);

//     }
//   return (
//     <div className='game'>
//         {
//             board.map((row, i) => (
//                 <div key={`row-${i}`} className="lamps-row">
//                     {
//                         row.map((lamp, j) => (
//                             <Lamp
//                                 addScore={addScore}
//                                 key={`lamp-${j}`}
//                                 index={[i, j]}
//                                 color={board[i][j]}
//                                 rows={rows}
//                                 position={calculatePosition(i, j)}
//                                 onFilled={handleFillRow}
//                                 onClicked={handelLampClicked}
//                             />
//                         ))
//                     }
//                 </div>
//             ))
//         }
//     </div>
//   )
// }

// export default Game

import { useEffect, useState } from "react";
import Lamp from "./Lamp";
import "./Style.css";

const Game = ({ level }) => {
  // Create the initial board and rows state
  const initialBoard = Array.from({ length: level }, (_, rowIndex) =>
    Array.from({ length: level - rowIndex }, () => null),
  );
  const initialRows = Array.from({ length: 3 }, (_, rowIndex) =>
    Array.from({ length: level }, (_, colIndex) => level - colIndex),
  );

  const initialState = {
    board: initialBoard,
    rows: initialRows,
  };

  const [state, setState] = useState(initialState);
  const [player1, setPlayer1] = useState({
    role: "first",
    color: "blue",
    score: 0,
  });
  const [player2, setPlayer2] = useState({
    role: "second",
    color: "red",
    score: 0,
  });
  const [currentPlayer, setCurrentPlayer] = useState(player1);

  console.log("blue: ", player1.score);
  console.log("red: ", player2.score);
  // Update rows
  const handleSelectedLamps = (rows, rowIndex, position) => {
    if (rows[rowIndex][position] > 0) {
      rows[rowIndex][position] -= 1;
    }
  };

  const handleLampClicked = (index, position) => {
    const [i, j] = index;
    setState((prevState) => {
      const newBoard = prevState.board.map((row, rowIndex) =>
        rowIndex === i
          ? row.map((lamp, colIndex) =>
              colIndex === j ? currentPlayer.color : lamp,
            )
          : row,
      );

      const newRows = prevState.rows.map((row, rowIndex) => [...row]);
      handleSelectedLamps(newRows, 0, position[0]);
      handleSelectedLamps(newRows, 1, position[1]);
      handleSelectedLamps(newRows, 2, position[2]);

      return {
        board: newBoard,
        rows: newRows,
      };
    });

    // Change the current player
    setCurrentPlayer((prevPlayer) =>
      prevPlayer.role === "first" ? player2 : player1,
    );
  };

  const calculatePosition = (i, j) => {
    const a = i;
    const b = j;
    const c = level - 1 - i - j;
    return [a, b, c];
  };

  const handleFillRow = ([i, j]) => {
    setState((prevState) => {
      const newBoard = prevState.board.map((row, rowIndex) =>
        rowIndex === i
          ? row.map((lamp, colIndex) =>
              colIndex === j
                ? currentPlayer.color === "red"
                  ? "blue"
                  : "red"
                : lamp,
            )
          : row,
      );

      return {
        ...prevState,
        board: newBoard,
      };
    });
    addScore();
  };

  const addScore = (e) => {
    // console.log(e, currentPlayer.color);
    if (currentPlayer.role === "first") {
      setPlayer2((prevPlayer) => {
        return {
          ...prevPlayer,
          score: prevPlayer.score + 1,
        };
      });
    } else {
      setPlayer1((prevPlayer) => {
        return {
          ...prevPlayer,
          score: prevPlayer.score + 1,
        };
      });
    }
  };

  const brokeLamp = (i, j) => {
    setState((prevState) => {
      const newBoard = prevState.board.map((row, rowIndex) =>
        rowIndex === i
          ? row.map((lamp, colIndex) => (colIndex === j ? "broken" : lamp))
          : row,
      );
      return {
        ...prevState,
        board: newBoard,
      };
    });
  };
  const markLampAsSolid = (i, j) => {
    setState((prevState) => {
      const newBoard = prevState.board.map((row, rowIndex) =>
        rowIndex === i
          ? row.map((lamp, colIndex) => (colIndex === j ? "solid" : lamp))
          : row,
      );
      return {
        ...prevState,
        board: newBoard,
      };
    });
  };
  const { board, rows } = state;
  useEffect(() => {
    brokeLamp(2, 2);
  }, []);
  console.log(board);

  return (
    <div className="game">
      <div className="players">
        <h1 style={{ color: "White" }}>player1: {player1.score}</h1>
        <h1 style={{ color: "White" }}>player2: {player2.score}</h1>
      </div>
      {board.map((row, i) => (
        <div key={`row-${i}`} className="lamps-row">
          {row.map((lamp, j) => (
            <Lamp
              addScore={addScore}
              key={`lamp-${j}`}
              index={[i, j]}
              color={board[i][j]}
              rows={rows}
              position={calculatePosition(i, j)}
              onFilled={handleFillRow}
              onClicked={handleLampClicked}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Game;
