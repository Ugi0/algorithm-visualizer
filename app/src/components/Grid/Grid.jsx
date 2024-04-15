import Options from '../Options/Options';
import { createRef, useState } from 'react';
import './Grid.css'
import Item from '../Item/Item';
import distanceCalculation from "../../algorithms/distanceCalculation";
import heuristicCalculation from '../../algorithms/heuristicCalculation';
import dijkstraSearch from "../../algorithms/dijkstraSearch";
import aSearch from '../../algorithms/aSearch';
import bfsSearch from '../../algorithms/bfsSearch';
import dfsSearch from '../../algorithms/dfsSearch'
import { ToastContainer, toast, Flip } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

var timer1;
var timer2;

function Grid(props) {
    const [gridSize, setGridSize] = useState(20);
    const [iconSelected, setIconSelected] = useState(false);
    const [freeIcons, setFreeIcons] = useState([2,3])
    const [started, setStarted] = useState(false);
    const [algorithm, setAlgorithm] = useState(0);

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

    const toggleAlgorithm = (event) => {
        var click = event.target.id;
        switch (click) {
            case 'Dijkstra':
                setAlgorithm(1);
                break;
            case 'A*':
                setAlgorithm(2);
                break;
            case 'BFS':
                setAlgorithm(3);
                break;
            case 'DFS':
                setAlgorithm(4);
                break;
            default:
                return false;
        }
    }

    const toggleStart = () => {
        if (algorithm === 0) {
            toast("You need to select an algorithm");
            return
        }
        if (freeIcons.length !== 0) {
            toast("You need to set start and end nodes");
            return
        }
        if (!started) {
            var rounds1 = 0;
            var rounds2 = 0;
            var ended = 0;
            if (algorithm === 1){
                console.log("Dijkstra's algorithm starts!")
                const func = () => {
                    console.log("Dijkstra's algorithm searching...")
                    dijkstraSearch(gridMatrix.reduce((acc, curr, i) => {
                        if ( !(i % gridSize)  ) {  
                            acc.push(gridMatrix.slice(i, i + gridSize));
                        }
                        return acc;
                    }, []), gridSize, timer1, rounds1)
                    rounds1++;
                }
                timer1 = setInterval(func)
            } if (algorithm === 2) {
                console.log("A* algorithm starts!")
                const func1 = () => {
                    console.log("Calculating heuristics...")
                    ended = heuristicCalculation(gridMatrix.reduce((acc, curr, i) => {
                        if ( !(i % gridSize)  ) {  
                            acc.push(gridMatrix.slice(i, i + gridSize));
                        }
                        return acc;
                    }, []), gridSize, timer1, rounds1)
                    rounds1++;
                }
                timer1 = setInterval(func1)
                const func2 = () => {
                    if (ended === 1){
                        console.log("A* algorithm searching...")
                        aSearch(gridMatrix.reduce((acc, curr, i) => {
                            if ( !(i % gridSize)  ) {  
                                acc.push(gridMatrix.slice(i, i + gridSize));
                            }
                            return acc;
                        }, []), gridSize, timer2, rounds2)
                        rounds2++;
                    }
                }
                timer2 = setInterval(func2) 
            }
            if (algorithm === 3){
                console.log("Breadth-first search starts!")
                const func = () => {
                    console.log("Breadth-first search searching...")
                    bfsSearch(gridMatrix.reduce((acc, curr, i) => {
                        if ( !(i % gridSize)  ) {  
                            acc.push(gridMatrix.slice(i, i + gridSize));
                        }
                        return acc;
                    }, []), gridSize, timer1, rounds1)
                    rounds1++;
                }
                timer1 = setInterval(func)
            }
            if (algorithm === 4){
                console.log("Depth-first search starts!")
                const func = () => {
                    console.log("Depth-first search searching...")
                    dfsSearch(gridMatrix.reduce((acc, curr, i) => {
                        if ( !(i % gridSize)  ) {  
                            acc.push(gridMatrix.slice(i, i + gridSize));
                        }
                        return acc;
                    }, []), gridSize, timer1, rounds1)
                    rounds1++;
                }
                timer1 = setInterval(func)
            }
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
<<<<<<< HEAD
        <Options started={started} toggleStart={toggleStart} setFreeIcons={setFreeIcons} freeIcons={freeIcons} iconSelected={iconSelected} setIconSelected={setIconSelected} setGridSize={handlegridSizeChange} gridSize={gridSize} resetGrid={resetGrid}/>  
=======
        <Options innerRef={optionsRef} toggleAlgorithm={toggleAlgorithm} getGridState={getData} setGridState={setData} started={started} toggleStart={toggleStart} setFreeIcons={setFreeIcons} freeIcons={freeIcons} iconSelected={iconSelected} setIconSelected={setIconSelected} setGridSize={handlegridSizeChange} gridSize={gridSize}/>  
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
>>>>>>> 12bbc46524cd5f0cc61915e1b90c616fe8867f31
    </>
}

export default Grid;