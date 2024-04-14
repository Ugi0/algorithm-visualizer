import Options from '../Options/Options';
import { createRef, useState } from 'react';
import './Grid.css'
import Item from '../Item/Item';
import distanceCalculation from '../../algorithms/distanceCalculation';
import search from '../../algorithms/search';
import { ToastContainer, toast, Flip } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

var timer1;
var timer2;

function Grid(props) {
    const [gridSize, setGridSize] = useState(20);
    const [iconSelected, setIconSelected] = useState(false);
    const [freeIcons, setFreeIcons] = useState([2,3])
    const [started, setStarted] = useState(false);

    const [gridMatrix, setGridMatrix] = useState(Array.from(new Array(gridSize * gridSize)).map((_,i) => {return {ref: createRef()}}))

    const getStarted = () => {
        return started
    }

    const getData = () => {
        return `${gridSize};${freeIcons.join("")};${gridMatrix.map(e => e.ref.current.getState()).join(";")}`
    }

    const setData = (data) => {
        const parts = data.split(";")
        setGridSize(parseInt(parts[0]));
        setFreeIcons(Array.from(parts[1]).map(e => parseInt(e)))
        const newGrid = Array.from(new Array(parseInt(parts[0])*parseInt(parts[0]))).map((_,i) => {return {ref: createRef()}});
        setGridMatrix(newGrid)
        setTimeout(() => parts.slice(2).forEach((e,i) => {
            newGrid[i].ref.current.setState(parseInt(e))
        }), 200)
    }

    const toggleStart = () => {
        if (freeIcons.length !== 0) {
            toast("You need to set start and end nodes");
            return
        }
        if (!started) {
            var x = 0;
            var y = 0;
            var state = 0;
            const func1 = () => { 
                state = distanceCalculation(gridMatrix.reduce((acc, curr, i) => {
                if ( !(i % gridSize)  ) {  
                  acc.push(gridMatrix.slice(i, i + gridSize));
                }
                return acc;
              }, []), gridSize, timer1, x)
              x++;
            }
            timer1 = setInterval(func1)
            const func2 = () => {
                if (state === 1){
                    search(gridMatrix.reduce((acc, curr, i) => {
                        if ( !(i % gridSize)  ) {  
                            acc.push(gridMatrix.slice(i, i + gridSize));
                        }
                        return acc;
                    }, []), gridSize, timer2, y)
                    y++;
                }
            }
            timer2 = setInterval(func2,100)
        } else {
            clearInterval(timer1);
            clearInterval(timer2);
        }
        setStarted(!started);
    }

    const resetGrid = (size) => {
        gridMatrix.forEach(e => e.ref.current.resetState());
        setGridMatrix(Array.from(new Array(size * size)).map((_,i) => {return {ref: createRef()}}))
        setFreeIcons([2,3])
    }

    const handlegridSizeChange = (e) => {
        setGridSize(e);
        resetGrid(e)
    }

    //TODO Make presets for the borders -> maze, maybe have a algorithm for generating a random maze
    //TODO Save to file and upload to load a state
    const optionsRef = createRef();

    return <>
        <div className='Grid' style={{gridTemplateColumns: `repeat(${gridSize}, 1fr)`}} onMouseDown={() => props.setPressedDown(true)}>
            {gridMatrix.map((e, i) => {
                return <Item optionsRef={optionsRef} getStarted={getStarted} getPressedDown={props.getPressedDown} innerRef={e.ref} setFreeIcons={setFreeIcons} freeIcons={freeIcons} iconSelected={iconSelected} setIconSelected={setIconSelected} key={i}/>
            })}
        </div>
        <Options innerRef={optionsRef} getGridState={getData} setGridState={setData} started={started} toggleStart={toggleStart} setFreeIcons={setFreeIcons} freeIcons={freeIcons} iconSelected={iconSelected} setIconSelected={setIconSelected} setGridSize={handlegridSizeChange} gridSize={gridSize}/>  
        <ToastContainer
            position="top-right"
            autoClose={2000}
            hideProgressBar
            newestOnTop={false}
            closeOnClick={false}
            rtl={false}
            pauseOnFocusLoss={false}
            draggable
            pauseOnHover={false}
            theme="dark"
            transition={Flip}    
        />
    </>
}

export default Grid;