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

    const [gridMatrix, setGridMatrix] = useState(Array.from(new Array(gridSize * gridSize)).map((_,i) => {return {ref: createRef()}}))

    const getStarted = () => {
        return started
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
              }, []), gridSize, timer, x)
              x++;
            }
            timer = setInterval(func,100)
        } else {
            clearInterval(timer);
        }
        setStarted(!started);
    }

    const resetGrid = (size) => {
        gridMatrix.forEach(e => e.ref.current.resetState());
        setGridMatrix(Array.from(new Array(size * size)).map((_,i) => {return {ref: createRef()}}))
        setFreeIcons([2,3])
    }

    const handlegridSizeChange = (e) => {
        setgridSize(e);
        resetGrid(e)
    }

    //TODO Make presets for the borders -> maze, maybe have a algorithm for generating a random maze
    //TODO Save to file and upload to load a state

    return <>
        <div className='Grid' style={{gridTemplateColumns: `repeat(${gridSize}, 1fr)`}} onMouseDown={() => props.setPressedDown(true)}>
            {gridMatrix.map((e, i) => {
                return <Item getStarted={getStarted} getPressedDown={props.getPressedDown} innerRef={e.ref} setFreeIcons={setFreeIcons} freeIcons={freeIcons} iconSelected={iconSelected} setIconSelected={setIconSelected} key={i}/>
            })}
        </div>
        <Options started={started} toggleStart={toggleStart} setFreeIcons={setFreeIcons} freeIcons={freeIcons} iconSelected={iconSelected} setIconSelected={setIconSelected} setGridSize={handlegridSizeChange} gridSize={gridSize}/>  
    </>
}

export default Grid;