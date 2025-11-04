import { useState } from "react";
import type { Bet } from "../types";

interface Props {
  onAddBet: (bet: Bet) => void;
  betAmount: number;
  winningNumber: number | null;
}

const ordernumbers = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12,
  13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24,
  25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36
]
const redNumbers: number[] = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36];

interface SidebarProps {
  label: string;
  action: string;
  bet: string;
  highlight: string;
}
const dozenSidebar: SidebarProps[] = [
  {
    label: "1-12",
    action: "1ST_DOZEN",
    bet: "1ST_DOZEN",
    highlight: "1ST_DOZEN"
  },
  {
    label: "13-24",
    action: "2ST_DOZEN",
    bet: "2ST_DOZEN",
    highlight: "2ST_DOZEN"
  },
  {
    label: "25-36",
    action: "3ST_DOZEN",
    bet: "3ST_DOZEN",
    highlight: "3ST_DOZEN"
  },
]

const rightSidebar: SidebarProps[] = [
  {
    label: "1st",
    action: "1ST_COLUMN",
    bet: "1ST_COLUMN",
    highlight: "1ST_COLUMN"
  },
  {
    label: "2nd",
    action: "2ND_COLUMN",
    bet: "2ND_COLUMN",
    highlight: "2ND_COLUMN"
  },
  {
    label: "3rd",
    action: "3RD_COLUMN",
    bet: "3RD_COLUMN",
    highlight: "3RD_COLUMN"
  },
]

export default function RouletteTable({ onAddBet, betAmount, winningNumber }: Props) {
  const [winhover, setWinhover] = useState<number>(0)
  const [hoveredNumbers, setHoveredNumbers] = useState<number[]>([])

  setTimeout(() => {
    if (winningNumber) {
      setWinhover(winningNumber);
    }
  }, 4200);


  const handleBetSingleNumber = (dataAction: string, num: number) => {
    onAddBet({ type: dataAction, value: num, amount: betAmount });
    console.log(num, dataAction)
  }

  const handleMultiEvent = (dataAction: string, nums: number[]) => {
    onAddBet({ type: dataAction, value: nums, amount: betAmount });
    console.log(nums, dataAction)
  }

  const handleRangeEvent = (betType: string, num: number) => {
    onAddBet({ type: betType, value: num, amount: betAmount })
  }

  const handleHoverEnter = (nums: number[]) => {
    setHoveredNumbers(nums);
  }

  const handleHoverLeave = () => {
    setHoveredNumbers([]);
  }


  return (
    <div className="flex justify-center">
      <div className="w-full max-w-4xl">
        <div className="roulette-table-container bg-green-700 p-6 rounded-2xl shadow-lg border-2 border-green-600">
          <section className="container-first">
            <div className={`zero-item ${hoveredNumbers.includes(0) ? "item-hover" : ""}`} data-action="0" data-bet="0">
              <div className="corner-bet-catcher bottom" data-action="BASKET_US" data-highlight="0-1-2-3"
                onMouseEnter={() => handleHoverEnter([0, 1, 2, 3])}
                onMouseLeave={handleHoverLeave}
                onClick={() => handleMultiEvent("line", [0, 1, 2, 3])}></div>
              <div className="split-up-bet-catcher-right split03" data-action="SPLIT" data-highlight="0-3"
                onMouseEnter={() => handleHoverEnter([0, 3])}
                onMouseLeave={handleHoverLeave}
                onClick={() => handleMultiEvent("split", [0, 3])}></div>
              <div className="split-up-bet-catcher-right split02" data-action="SPLIT" data-highlight="0-2"
                onMouseEnter={() => handleHoverEnter([0, 2])}
                onMouseLeave={handleHoverLeave}
                onClick={() => handleMultiEvent("split", [0, 2])}></div>
              <div className="split-up-bet-catcher-right split01" data-action="SPLIT" data-highlight="0-1"
                onMouseEnter={() => handleHoverEnter([0, 1])}
                onMouseLeave={handleHoverLeave}
                onClick={() => handleMultiEvent("split", [0, 1])}></div>
              <div className="value"
                onClick={() => handleBetSingleNumber("straight", 0)}>0</div>
            </div>
            {/* {
              ordernumbers.map((num, idx) => {
                return (
                  <NumberButton key={idx} number={num} winhover={winhover} />
                )
              })
            } */}
            {
              ordernumbers.map((number, index) => {
                const cornerVal: number[] = [number, number + 1, number + 3, number + 4];
                const splitVal1: number[] = [number, number + 1];
                const doubleStreetVal1: number[] = [number - 2, number - 1, number, number + 1, number + 2, number + 3];
                const streetVal1: number[] = [number, number - 1, number - 2];
                const splitVal2: number[] = [number, number + 3];
                const streetVal2: number[] = [number, number + 1, number + 2];
                const doubleStreetVal2: number[] = [number, number + 1, number + 2, number + 3, number + 4, number + 5];


                return (
                  <div key={index} data-action="STRAIGHT_UP" data-bet={number} className={`${redNumbers.includes(number) ? "red-item" : "black-item"} ${winhover === number ? "winning-number" : ""} ${hoveredNumbers.includes(number) ? "item-hover" : ""}`}

                  >
                    {(number % 3 !== 0 && number <= 33) ? <div className="corner-bet-catcher" data-action="CORNER" data-highlight={cornerVal}
                      onMouseEnter={() => handleHoverEnter(cornerVal)}
                      onMouseLeave={handleHoverLeave}
                      onClick={() => handleMultiEvent("corner", cornerVal)}></div> : ""}
                    {number === 1 ? <div className="spleet-bet-catcher" data-action="STREET" data-highlight={[0, 1, 2]} style={{ zIndex: 12 }}
                      onMouseEnter={() => handleHoverEnter([0, 1, 2])}
                      onMouseLeave={handleHoverLeave}
                      onClick={() => handleMultiEvent("street", [0, 1, 2])}></div> : ""}
                    {number === 2 ? <div className="spleet-bet-catcher" data-action="STREET" data-highlight={[0, 2, 3]} style={{ zIndex: 12 }}
                      onMouseEnter={() => handleHoverEnter([0, 2, 3])}
                      onMouseLeave={handleHoverLeave}
                      onClick={() => handleMultiEvent("street", [0, 2, 3])} ></div> : ""}
                    {(number % 3 !== 0) ? <div className="split-up-bet-catcher-top" data-action="SPLIT" data-highlight={splitVal1}
                      onMouseEnter={() => handleHoverEnter(splitVal1)}
                      onMouseLeave={handleHoverLeave}
                      onClick={() => handleMultiEvent("split", splitVal1)}></div> : ""}
                    {(number % 3 === 0 && number <= 33) ? <div className="double-street-catcher-top-right" data-action="DOUBLE_STREET" data-highlight={doubleStreetVal1}
                      onMouseEnter={() => handleHoverEnter(doubleStreetVal1)}
                      onMouseLeave={handleHoverLeave}
                      onClick={() => handleMultiEvent("line", doubleStreetVal1)}></div> : ""}
                    {number % 3 === 0 ? <div className="split-up-bet-catcher-top" data-action="STREET" data-highlight={streetVal1}
                      onMouseEnter={() => handleHoverEnter(streetVal1)}
                      onMouseLeave={handleHoverLeave}
                      onClick={() => handleMultiEvent("street", streetVal1)}></div> : ""}
                    <div className="value"
                      onClick={() => handleBetSingleNumber("straight", number)}>{number}</div>
                    <div className="split-up-bet-catcher-right" data-action="SPLIT" data-highlight={splitVal2}
                      onMouseEnter={() => handleHoverEnter(splitVal2)}
                      onMouseLeave={handleHoverLeave}
                      onClick={() => handleMultiEvent("split", splitVal2)}></div>
                    {number % 3 === 1 ? <div className="split-up-bet-catcher-bottom" data-action="STREET" data-highlight={streetVal2}
                      onMouseEnter={() => handleHoverEnter(streetVal2)}
                      onMouseLeave={handleHoverLeave}
                      onClick={() => handleMultiEvent("street", streetVal2)}></div> : ""}
                    {number % 3 === 1 ? <div className="six-lines-catcher" data-action="DOUBLE_STREET" data-highlight={doubleStreetVal2}
                      onMouseEnter={() => handleHoverEnter(doubleStreetVal2)}
                      onMouseLeave={handleHoverLeave}
                      onClick={() => handleMultiEvent("line", doubleStreetVal2)}></div> : ""}
                  </div>
                )
              })
            }
            {rightSidebar.map((item, index) => (
              <div key={index} className="column-item" data-action={item.action} data-bet={item.bet} data-highlight={item.highlight}
                onClick={() => handleBetSingleNumber("column", index + 1)}>
                <div className="value">{item.label}</div>
              </div>
            ))}
          </section>
          <section className="container-second">
            {dozenSidebar.map((item, index) => (
              <div key={index} className="doz-item" data-action={item.action} data-bet={item.bet} data-highlight={item.highlight}
                onClick={() => handleBetSingleNumber("dozen", index + 1)}>
                <div>{item.label}</div>
              </div>
            ))
            }
          </section>
          <div className="container-third">
            <div className="outside-section" data-action="1_TO_18" data-bet="1_TO_18" data-highlight="1_TO_18"
              onClick={() => handleRangeEvent("low", 0)}>
              <div>1-18</div>
            </div>
            <div className="outside-section" data-action="EVEN" data-bet="EVEN" data-highlight="EVEN"
              onClick={() => handleRangeEvent("even", 0)}>
              <div>EVEN</div>
            </div>
            <div className="outside-section" data-action="RED" data-bet="RED" data-highlight="RED"
              onClick={() => handleRangeEvent("red", 0)}>
              <div>
                <div className="rhomb-red"></div>
              </div>
            </div>
            <div className="outside-section" data-action="BLACK" data-bet="BLACK" data-highlight="BLACK"
              onClick={() => handleRangeEvent("black", 0)}>
              <div>
                <div className="rhomb-black"></div>
              </div>
            </div>
            <div className="outside-section" data-action="ODD" data-bet="ODD" data-highlight="ODD"
              onClick={() => handleRangeEvent("odd", 0)}>
              <div>ODD</div>
            </div>
            <div className="outside-section" data-action="19_TO_36" data-bet="19_TO_36" data-highlight="19_TO_36"
              onClick={() => handleRangeEvent("high", 0)}>
              <div>19-36</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
