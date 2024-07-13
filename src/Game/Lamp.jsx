import { useEffect, useState } from "react";

const Lamp = ({
  color,
  index,
  rows,
  onClicked,
  onFilled,
  position,
  addScore,
}) => {
  const [lampIsOn, setLampIsOn] = useState(false);
  console.log(color);
  const [a, b, c] = position;
  useEffect(() => {
    if (rows[0][a] === 0) {
      onFilled(index);
    }
  }, [rows[0][a]]);

  useEffect(() => {
    if (rows[1][b] === 0) {
      onFilled(index);
    }
  }, [rows[1][b]]);

  useEffect(() => {
    if (rows[2][c] === 0) {
      onFilled(index);
    }
  }, [rows[2][c]]);

  function lampSwitch() {
    if (!lampIsOn && color !== "broken") {
      onClicked(index, position);
      setLampIsOn((e) => {
        return !e;
      });
    }
  }

  return (
    <div
      className={`lamp ${lampIsOn || color ? color : ""}`}
      onClick={lampSwitch}
    ></div>
  );
};

export default Lamp;
