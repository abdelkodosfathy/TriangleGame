import { useRef, useState } from "react";



function Circle ({ row, circle, onPlayerClick, className }) {
    const circleRef = useRef();
    

    return (
        <div ref={circleRef}
        className={`circle ${className}`}
        onClick={() => onPlayerClick(circleRef, row, circle)}>
        </div>
    );
}

const Triangle = () => {
const levels = 5; // يمكنك تغيير عدد المستويات هنا
const [boardCircles, setBoardCircles] = useState([
    [null],
    [null,null,],
    [null,null,null,],
    [null,null,null,null,],
    [null,null,null,null,null,],
]);

function handleCircleClicked (ref, row, circle) {
    // ref.current.classList.add("selected");
    console.log(row, circle);
    setBoardCircles(prev => {
        const newArr = [...prev];
        newArr[row][circle] = "selected";
        // prev[row][circle] = 'selected'
    });
    console.log("row:",row);
    console.log("circle:",circle);
    console.log(boardCircles);
}

//drawing the game board
let rows = [];
for (let i = 0 ; i < levels; i++) {
    let circles = [];
    for (let j = 0; j <= i; j++) {
    circles.push(<Circle key={j} onPlayerClick={handleCircleClicked} row={i} circle={j} />);
    }
    rows.push(
    <div key={i} className="row">
        {circles}
    </div>
    );
}

return <div className="triangle">{rows}</div>;
};

export default Triangle