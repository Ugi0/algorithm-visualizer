import './Options.css'
import FlagIcon from '@mui/icons-material/Flag';
import PlayArrowIcon from '@mui/icons-material/PlayArrow'; //Start

function Options(props) {

    const getIcon = () => {
        switch (props.freeIcons[0]) {
            case 2:
                return <PlayArrowIcon style={{fontSize: 50, color: `${props.iconSelected ? 'black' : ""}`}} />
            case 3:
                return <FlagIcon style={{fontSize: 50, color: `${props.iconSelected ? 'black' : ""}`}} />
            default:
                return
        }
    }

    //TODO Add reset button
    //TODO Button to change between choosing weighted tiles and borders
    return <div className="Options">
        <div className='OptionsItem' id="gridWidthOption">
            gridSize
            <input onChange={(e) => props.setGridSize(parseInt(e.target.value))} value={props.gridSize} type="number" min={10} max={50} />
        </div>
        <div className='OptionsItem' id='startAndEndFlag' onClick={() => {if (props.freeIcons.length !== 0) props.setIconSelected(true)}}>
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