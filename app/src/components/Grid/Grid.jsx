import Options from '../Options/Options';
import { createRef, useState } from 'react';
import './Grid.css'
import Item from '../Item/Item';
import dijkstraSearch from "../../algorithms/dijkstraSearch";
import aSearch from '../../algorithms/aSearch';
import bfsSearch from '../../algorithms/bfsSearch';
import dfsSearch from '../../algorithms/dfsSearch';
import  generateMaze  from '../../algorithms/mazeGenerator';
import { ToastContainer, toast, Flip } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

var timer;
var started

function Grid(props) {
    const [gridSize, setGridSize] = useState(20);
    const [iconSelected, setIconSelected] = useState(false);
    const [freeIcons, setFreeIcons] = useState([2,3])
    const [running, setRunning] = useState(false);
    const [algorithm, setAlgorithm] = useState(1);

    //TODO make the interface look better

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
            newGrid[i].ref.current.setDistance(100000)
        }), 200)
    }

    //TODO A function to get the required algorithm functions, removes code repetition
    const getAlgorithm = (algorithm) => {
        switch (algorithm) {
            case 1:
                return ["Dijkstra's algorithm", dijkstraSearch]
            case 2:
                return ["A* algorithm", aSearch] //An empty function since this case should never happen
            case 3:
                return ["Breadth-first search", bfsSearch]
            case 4:
                return ["Depth first search", dfsSearch]
            default:
                return
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
        const gridAs2dMatrix = gridMatrix.reduce((acc, curr, i) => {
            if ( !(i % gridSize)  ) {  
                acc.push(gridMatrix.slice(i, i + gridSize));
            }
            return acc;
        }, [])

        if (!running) {
            started = true;
            var rounds = 0;
            var found = 0;
            const [algorithmName, algorithmFunc] = getAlgorithm(algorithm);
            console.log(`${algorithmName} starts!`)
            const func = () => {
                try {
                    console.log(`${algorithmName} searching...`)
                    found = algorithmFunc(gridAs2dMatrix, gridSize, timer, rounds, toast)
                    rounds++;
                    if (found === 1){
                        setRunning(false)
                        started = false
                    }
                } catch (e) {
                    toast("Error occured, stopping timers.")
                    console.log(e)
                    clearInterval(timer);
                }
            }
            timer = setInterval(func,10)
        } else {
            clearInterval(timer);
        }
        setRunning(!running);
    }

    //If fullClear is set to false, does a "soft clear", only resetting tiles that are searching, searched or a part of the path
    const resetGrid = (size, fullClear=true) => {
        started = undefined;
        if (fullClear) {
            setRunning(false);
            gridMatrix.forEach(e => {
                e.ref.current.resetState()
                e.ref.current.resetDistance()
        });
            setGridMatrix(Array.from(new Array(size * size)).map((_,i) => {return {ref: createRef()}}))
            setFreeIcons([2,3])
        } else {
            gridMatrix.forEach(e => {
                if ([4,5,6,8,9,10].includes(e.ref.current.getState())) {
                    e.ref.current.resetState();
                    e.ref.current.resetDistance();
                }
            });
        }
        setRunning(false);
    }

    const handlegridSizeChange = (e) => {
        setGridSize(e);
        resetGrid(e)
    }

    //TODO Make presets for the borders -> maze, maybe have a algorithm for generating a random maze

    const generateMazeInGrid = () => {
        console.log("Generating maze...");
        const gridAs2dMatrix = gridMatrix.reduce((acc, curr, i) => {
            if ( !(i % gridSize)  ) {  
                acc.push(gridMatrix.slice(i, i + gridSize));
            }
            return acc;
        }, [])
        const maze = generateMaze(gridSize, gridAs2dMatrix);
  
        console.log(maze);
        // Update the grid with the maze data
        // Similar to the previous implementation
    };


    const optionsRef = createRef();

    return <>
        <div className='Grid' style={{gridTemplateColumns: `repeat(${gridSize}, 1fr)`}} onMouseDown={() => props.setPressedDown(true)}>
            {gridMatrix.map((e, i) => {
                return <Item optionsRef={optionsRef} getStarted={getStarted} getPressedDown={props.getPressedDown} innerRef={e.ref} setFreeIcons={setFreeIcons} freeIcons={freeIcons} iconSelected={iconSelected} setIconSelected={setIconSelected} key={i}/>
            })}
        </div>
        <Options innerRef={optionsRef} setAlgorithm={setAlgorithm} getGridState={getData} setGridState={setData} started={started} running={running} toggleStart={toggleStart} setFreeIcons={setFreeIcons} freeIcons={freeIcons} iconSelected={iconSelected} setIconSelected={setIconSelected} setGridSize={handlegridSizeChange} gridSize={gridSize} resetGrid={resetGrid} generateMaze={generateMazeInGrid} />  
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