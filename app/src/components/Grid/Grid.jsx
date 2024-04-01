import Options from '../Options/Options';
import { createRef, useState } from 'react';
import './Grid.css'
import Item from '../item/Item';
import test from '../../algorithms/test';

function Grid(props) {
    const [gridSize, setgridSize] = useState(20);
    const [iconSelected, setIconSelected] = useState(false);
    const [freeIcons, setFreeIcons] = useState([2,3])
    const [started, setStarted] = useState(false);

    const [gridMatrix, setGridMatrix] = useState(Array.from(new Array(gridSize * gridSize)).map((_,i) => initialMap(i)))

    function initialMap(index) {
        return {state: 1, ref: createRef()}
    }

    const getGridState = () => {
        for (let i = 0; i < gridSize; i++) {
            console.log(gridMatrix.slice((gridSize*(i)), gridSize + (gridSize*(i))).map(e => e.ref.current.getItemState()))
        }
    }

    const toggleStart = () => {
        setStarted(!started);
        const newMatrix = test(gridMatrix.reduce((acc, curr, i) => {
            if ( !(i % gridSize)  ) {  
              acc.push(gridMatrix.slice(i, i + gridSize));
            }
            return acc;
          }, []), gridSize)
        setGridMatrix(newMatrix.flat())
    }

    const resetGrid = (size) => {
        gridMatrix.forEach(e => e.ref.current.resetItemState());
        setGridMatrix(Array.from(new Array(size * size)).map((_,i) => initialMap(i)))
        setFreeIcons([2,3])
    }

    const handlegridSizeChange = (e) => {
        setgridSize(e);
        resetGrid(e)
    }

    return <>
        <div className='Grid' style={{gridTemplateColumns: `repeat(${gridSize}, 1fr)`}}>
            {gridMatrix.map((e, i) => {
                return <Item innerRef={e.ref} setFreeIcons={setFreeIcons} freeIcons={freeIcons} iconSelected={iconSelected} setIconSelected={setIconSelected} key={i} width={`calc(min(80vh, 80vw) / ${gridSize})`}/>
            })}
        </div>
        <Options started={started} toggleStart={toggleStart} setFreeIcons={setFreeIcons} freeIcons={freeIcons} iconSelected={iconSelected} setIconSelected={setIconSelected} setGridSize={handlegridSizeChange} gridSize={gridSize}/>  
    </>
}

export default Grid;