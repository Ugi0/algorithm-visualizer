import Options from '../Options/Options';
import { createRef, useState } from 'react';
import './Grid.css'
import Item from '../Item/Item';
import search from '../../algorithms/search';

var timer;

function Grid(props) {
    const [gridSize, setgridSize] = useState(20);
    const [iconSelected, setIconSelected] = useState(false);
    const [freeIcons, setFreeIcons] = useState([2,3])
    const [started, setStarted] = useState(false);

    const [gridMatrix, setGridMatrix] = useState(Array.from(new Array(gridSize * gridSize)).map((_,i) => initialMap(i)))

    function initialMap(index) {
        return {state: 1, ref: createRef()}
    }

    const toggleStart = () => {
        if (freeIcons.length !== 0) return
        if (!started) {
            var x = 0;
            const func = () => { search(gridMatrix.reduce((acc, curr, i) => {

                if ( !(i % gridSize)  ) {  
                  acc.push(gridMatrix.slice(i, i + gridSize));
                }
                return acc;
              }, []), gridSize, timer)
              x++;
            }
            timer = setInterval(func, 200)
        }
        setStarted(!started);
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
                return <Item innerRef={e.ref} setFreeIcons={setFreeIcons} freeIcons={freeIcons} iconSelected={iconSelected} setIconSelected={setIconSelected} key={i}/>
            })}
        </div>
        <Options started={started} toggleStart={toggleStart} setFreeIcons={setFreeIcons} freeIcons={freeIcons} iconSelected={iconSelected} setIconSelected={setIconSelected} setGridSize={handlegridSizeChange} gridSize={gridSize}/>  
    </>
}

export default Grid;