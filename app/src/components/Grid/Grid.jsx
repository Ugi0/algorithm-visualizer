import Options from '../Options/Options';
import { createRef, useState } from 'react';
import './Grid.css'
import Item from '../item/Item';

function Grid(props) {
    const [gridWidth, setGridWidth] = useState(20);
    const [gridHeight, setGridHeight] = useState(20);
    const [iconSelected, setIconSelected] = useState(false);
    const [iconCount, setIconCount] = useState(0);
    const [started, setStarted] = useState(false);

    const gridMatrix = Array.from(new Array(gridWidth * gridHeight)).map((_,i) => initialMap(i))

    function initialMap(index) {
        if (index % gridWidth === 0 || index % gridWidth === gridWidth-1 || index < gridWidth-1 || index > (gridWidth*gridHeight-gridWidth)) {
            return {state: 0, ref: createRef()}
        }
        return {state: 1, ref: createRef()}
    }

    const getGridState = () => {
        for (let i = 0; i < gridHeight-2; i++) {
            console.log(gridMatrix.slice(gridWidth+1+(gridWidth*(i)), 2*gridWidth - 1 + (gridWidth*(i))).map(e => e.ref.current()))
        }
    }

    const toggleStart = () => {
        setStarted(!started);
        getGridState()
    }

    const handleGridWidthChange = (e) => {
        setGridWidth(e);
    }

    const handleGridHeightChange = (e) => {
        setGridHeight(e);
    }

    return <>
        <div className='Grid' style={{gridTemplateColumns: `repeat(${gridWidth}, 1fr)`}}>
            {gridMatrix.map((e, i) => {
                return <Item innerRef={e.ref} setIconCount={setIconCount} iconCount={iconCount} iconSelected={iconSelected} setIconSelected={setIconSelected} key={i} locked={e.state === 0} colorIndex={0} width={`calc(min(80vh, 80vw) / ${gridHeight})`}/>
            })}
        </div>
        <Options started={started} toggleStart={toggleStart} iconCount={iconCount} iconSelected={iconSelected} setIconSelected={setIconSelected} setGridHeight={handleGridHeightChange} setGridWidth={handleGridWidthChange} gridHeight={gridHeight} gridWidth={gridWidth}/>  
    </>
}

export default Grid;