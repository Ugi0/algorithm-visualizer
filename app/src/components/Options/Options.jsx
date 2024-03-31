import './Options.css'
import FlagIcon from '@mui/icons-material/Flag';
import PlayArrowIcon from '@mui/icons-material/PlayArrow'; //Start
import { useState } from 'react';

function Options(props) {

    const getIcon = () => {
        switch (props.iconCount) {
            case 1:
                return <FlagIcon style={{fontSize: 50, color: `${props.iconSelected ? 'black' : ""}`}} />
            case 0:
                return <PlayArrowIcon style={{fontSize: 50, color: `${props.iconSelected ? 'black' : ""}`}} />
            default:
                return
        }
    }

    return <div className="Options">
        <div className='OptionsItem' id="gridWidthOption">
            gridWidth
            <input onChange={(e) => props.setGridWidth(e.target.value)} value={props.gridWidth} type="number" min={0} max={50} />
        </div>
        <div className='OptionsItem' id="gridHeightOption">
            gridHeight
            <input onChange={(e) => props.setGridHeight(e.target.value)} value={props.gridHeight} type="number" min={0} max={50} />
        </div>
        <div className='OptionsItem' id='startAndEndFlag' onClick={() => {if (props.iconCount !== 1) props.setIconSelected(!props.iconSelected)}}>
            {getIcon()}
        </div>
        <div className='OptionsItem' id='start'>
            <button onClick={props.toggleStart}>
                {props.started ? "Stop" : "Start"}
            </button>
        </div>
    </div>
}

export default Options;