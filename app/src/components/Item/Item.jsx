import { useState } from 'react';
import FlagIcon from '@mui/icons-material/Flag';
import PlayArrowIcon from '@mui/icons-material/PlayArrow'; //Start
import './Item.css'

function Item(props) {
    const lockedColor = "#14181c";

    const [status, setStatus] = useState(0)
    // 0 default, 1 Border, 2 Start, 3 End, 4 Searching, 5 Searched

    const getItemState = () => {
        return status;
        /*switch (status) {
            case 1:
                return "B"
            case 2:
                return "S"
            case 3:
                return "E"
            default:
                return 0
        }*/
    }
    if (props.innerRef) {
        props.innerRef.current = { 
            getItemState: function() { return getItemState() }, 
            resetItemState: function() { setStatus(0); },
            setItemState: function(value) { setStatus(value); }
        }
    }

    const handleOnClick = () => {
        if (props.iconSelected) {
            if (props.freeIcons.length === 1) {
                props.setIconSelected(false)
            }
            setStatus(props.freeIcons[0])
            props.setFreeIcons(props.freeIcons.slice(1))
        } else {
            setStatus(status ? 0 : 1)
        }
    }

    const getColor = () => {
        switch (status) {
            case 1:
                return lockedColor
            case 2:
                return "#AE27FF"
            case 3:
                return "#AE27FF"
            case 4:
                return "#111111"
            case 5:
                return "#222222"
            default:
                return "#444444"
        }
    }

    const getIcon = () => {
        switch (status) {
            case 2:
                return <PlayArrowIcon />
            case 3:
                return <FlagIcon />
            default:
                return 
        }
    }

    return <div className='item' onClick={handleOnClick} style={{backgroundColor: getColor()}}>
        {getIcon()}
    </div>
}

export default Item;