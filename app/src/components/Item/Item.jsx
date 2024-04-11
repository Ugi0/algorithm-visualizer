import { useState } from 'react';
import FlagIcon from '@mui/icons-material/Flag';
import PlayArrowIcon from '@mui/icons-material/PlayArrow'; //Start
import './Item.css'

function Item(props) {
    const [status, setStatus] = useState(0)
    const [distance, setDistance] = useState(60000)
    // 0 default, 1 Border, 2 Start, 3 End, 4 Searching, 5 Searched, 6 Path

    if (props.innerRef) {
        props.innerRef.current = { 
            getState: function() { return status }, 
            resetState: function() { setStatus(0); },
            setState: function(value) { setStatus(value); },
            getDistance: function() { return distance; },
            setDistance: function(value) { setDistance(value); }
        }
    }

    const handleOnClick = () => {
        if (props.getStarted()) return
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

    const handleDrag = () => {
        if (props.getStarted()) return
        if (status === 2 || status === 3) return
        if (props.getPressedDown()) {
            setStatus(status ? 0 : 1)
        }
        //If mouse is being pressed down, change state
    }

    const getColor = () => {
        switch (status) {
            case 1:
                return "#14181c"
            case 2:
                return "#11111105"
            case 3:
                return "#11111105"
            case 4:
                return "#6343f4"
            case 5:
                return "#1358b7"
            case 6:
                return '#e41f11'
            default:
                return "#444444"
        }
    }

    const getIcon = () => {
        switch (status) {
            case 2:
                return <PlayArrowIcon style={{color: '#fa5d32'}} />
            case 3:
                return <FlagIcon style={{color: '#043dc2'}}/>
            default:
                return 
        }
    }
    //TODO Make border change with drag

    return <div className='item' onMouseDown={handleOnClick} onMouseOver={handleDrag} style={{
        backgroundColor: getColor(), 
        transition: "all .8s ease",
        WebkitTransition: "all .8s ease",
        MozTransition: "all .8s ease"
    }}>
        {getIcon()}
    </div>
}

export default Item;