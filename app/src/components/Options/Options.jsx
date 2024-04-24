import './Options.css'
import FlagIcon from '@mui/icons-material/Flag';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { useRef, useState } from 'react';

var tileType = 1;

function Options(props) {
    const [slowTileBorder, setSlowTileBorder] = useState(1)

    if (props.innerRef) {
        props.innerRef.current = { 
            setTileType: function(value) { tileType = value; },
            getTileType: function() { return tileType },
            getCurrent: function() { return slowTileBorder; }
        }
    }

    const getStartEndIcon = () => {
        switch (props.freeIcons[0]) {
            case 2:
                return <PlayArrowIcon style={{fontSize: 50, color: `${props.iconSelected ? 'black' : ""}`}} />
            case 3:
                return <FlagIcon style={{fontSize: 50, color: `${props.iconSelected ? 'black' : ""}`}} />
            default:
                return
        }
    }

    const getSlowTileIconStyle = () => {
        switch (slowTileBorder) {
            case 1:
                return {width: 50, height: 50, backgroundColor: "#14181c"}
            case 7:
                return {width: 50, height: 50, backgroundColor: '#C0C0C0'}
            default:
                return <></>
        }
    }

    const saveFile = async (blob) => {
        const a = document.createElement('a');
        a.download = 'state.txt';
        a.href = URL.createObjectURL(blob);
        a.addEventListener('click', (e) => {
          setTimeout(() => URL.revokeObjectURL(a.href), 30 * 1000);
        });
        a.click();
    };

    const fileInputRef = useRef();

    const handleChange = (event) => {
        props.resetGrid(props.gridSize)
        const file = event.target.files[0];
        if (file === undefined) return;
        if (file.type === 'text/plain') {
            file.text().then(e => props.setGridState(e))
        }
    };

    const getStartButtonText = () => {
        if (props.started === undefined) {
            return "Start"
        }
        if (props.started && props.running) {
            return "Stop"
        }
        if (props.started && !props.running) {
            return "Continue"
        }
    }

    const getStartButton = () => {
        if (props.started === false) return <></>
        return (
            <button onClick={handleStartButtonClick}>
                {getStartButtonText()}
            </button>
        )
    }

    const handleStartButtonClick = () => {
        if (props.started === false) {
            props.resetGrid(props.gridSize)
        } else {
            props.toggleStart()
        }
    }

    const getExportButton = () =>{
        if (props.started === undefined) {
            return ( 
                <button onClick={handleExportButtonClick}>
                    Export data
                </button>
                )
        } else {
            return <></>
        }


    }

    const handleExportButtonClick = () => {
        const blob = new Blob([props.getGridState()], {type : 'application/json'}); 
        saveFile(blob);
    }

    return <div className="Options">
        <div className='OptionsItem' id="algorithmChooser">
            <select onChange={(e) => { props.setAlgorithm(parseInt(e.target.value)); props.resetGrid(props.gridSize, false) }}>
                <option value={1}> Dijkstra's algorithm </option>
                <option value={2}> A* algorithm </option>
                <option value={3}> Breadth-first search </option>
                <option value={4}> Depth-first search </option>
            </select>
        </div>
        <div className='OptionsItem' id="gridWidthOption">
            <input type="range" min="10" max="50" value={props.gridSize} onChange={(e) => { if (props.started === undefined) props.setGridSize(parseInt(e.target.value))}} />
        </div>
        <div className='icons' style={{display: 'flex', flexDirection: 'row'}}>
            <div className='OptionsItem' id='startAndEndFlag' onClick={() => {if (props.freeIcons.length !== 0) props.setIconSelected(true)}}>
                {getStartEndIcon()}
            </div>
            <div className='slowTile' style={getSlowTileIconStyle()} onClick={() => setSlowTileBorder(slowTileBorder === 1 ? 7 : 1)} />
        </div>
        <div className='OptionsItem' id='start'>
            {getStartButton()}
        </div>
        <div className='OptionsItem' id='reset'>
            <button onClick={() => props.resetGrid(props.gridSize)}>Reset Grid
            </button>
        </div>
        <div className='OptionsItem' id='generateMaze'>
            <button onClick={() => {props.resetGrid(props.gridSize); props.generateMaze()}}>
                Generate Maze
            </button>
        </div>
        <div>
            <input 
                type='file'
                style={{display: 'none'}}
                ref={fileInputRef}
                onChange={handleChange}
            />
            <button onClick={() => fileInputRef.current.click()}>
                Import data
            </button>
                {getExportButton()}
        </div>
    </div>
}

export default Options;