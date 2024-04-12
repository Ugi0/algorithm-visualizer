import './Options.css'
import FlagIcon from '@mui/icons-material/Flag';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { useRef, useState } from 'react';

function Options(props) {
    const [slowTileBorder, setSlowTileBorder] = useState(1)

    if (props.innerRef) {
        props.innerRef.current = { 
            getTileType: function() { return slowTileBorder; }
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

    //TODO Add reset button

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

    const handleChange = event => {
        const file = event.target.files[0];
        if (file.type === 'text/plain') {
            file.text().then(e => props.setGridState(e))
        }
    };

    return <div className="Options">
        <div className='OptionsItem' id="gridWidthOption">
            gridSize
            <input onChange={(e) => props.setGridSize(parseInt(e.target.value))} value={props.gridSize} type="number" min={10} max={50} />
        </div>
        <div className='icons' style={{display: 'flex', flexDirection: 'row'}}>
            <div className='OptionsItem' id='startAndEndFlag' onClick={() => {if (props.freeIcons.length !== 0) props.setIconSelected(true)}}>
                {getStartEndIcon()}
            </div>
            <div className='slowTile' style={getSlowTileIconStyle()} onClick={() => setSlowTileBorder(slowTileBorder === 1 ? 7 : 1)} />
        </div>
        <div className='OptionsItem' id='start'>
            <button onClick={props.toggleStart}>
                {props.started ? "Stop" : "Start"}
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
            <button onClick={() => {const blob = new Blob([props.getGridState()], {type : 'application/json'}); saveFile(blob)}}>
                Export data
            </button>
        </div>
    </div>
}

export default Options;