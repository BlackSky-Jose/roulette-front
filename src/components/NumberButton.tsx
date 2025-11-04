

const redNumbers = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36];


const NumberButton = (props: any) => {
  const { number, winhover } = props;

  const cornerVal = [number, number + 1, number + 3, number + 4]
  return (

    <div data-action="STRAIGHT_UP" data-bet={number} className={`${redNumbers.includes(number) ? "red-item" : "black-item"}
          ${winhover === number ? "ring-4 ring-yellow-400 scale-105 animate-pulse" : ""}`}>
      {(number % 3 !== 0 && number <= 33) ? <div className="corner-bet-catcher" data-action="CORNER" data-highlight={`${cornerVal}` + "1-2-4-5"}></div> : ""}
      {number === 1 ? <div className="spleet-bet-catcher" data-action="STREET" data-highlight="0-1-2" style={{ zIndex: 12 }}></div> : ""}
      {number === 2 ? <div className="spleet-bet-catcher" data-action="STREET" data-highlight="0-2-3" style={{ zIndex: 12 }}></div> : ""}
      {(number % 3 !== 0) ? <div className="split-up-bet-catcher-top" data-action="SPLIT" data-highlight={[number, number + 1]}></div> : ""}
      {(number % 3 === 0 && number <= 33) ? <div className="double-street-catcher-top-right" data-action="DOUBLE_STREET" data-highlight={[number - 2, number - 1, number, number + 1, number + 2, number + 3]}></div> : ""}
      {number % 3 === 0 ? <div className="split-up-bet-catcher-top" data-action="STREET" data-highlight={[number, number - 1, number - 2]}></div> : ""}
      <div className="value">{number}</div>
      <div className="split-up-bet-catcher-right" data-action="SPLIT" data-highlight={[number, number + 3]}></div>
      {number % 3 === 1 ? <div className="split-up-bet-catcher-bottom" data-action="STREET" data-highlight={[number, number + 1, number + 2]}></div> : ""}
      {number % 3 === 1 ? <div className="six-lines-catcher" data-action="DOUBLE_STREET" data-highlight={[number, number + 1, number + 2, number + 3, number + 4, number + 5]}></div> : ""}
    </div>
  )
}

export default NumberButton;