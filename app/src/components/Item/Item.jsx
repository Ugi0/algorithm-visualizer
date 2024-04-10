import { useState } from 'react';
import FlagIcon from '@mui/icons-material/Flag';
import PlayArrowIcon from '@mui/icons-material/PlayArrow'; //Start
import './Item.css'

function Item(props) {
    const lockedColor = "#14181c";

    const [status, setStatus] = useState(0)
    const [distance, setDistance] = useState(60000)
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
    const getItemDistance = () => {
        return distance;
    }
    if (props.innerRef) {
        props.innerRef.current = { 
            getItemState: function() { return getItemState() }, 
            resetItemState: function() { setStatus(0); },
            setItemState: function(value) { setStatus(value); },
            getItemDistance: function() { return getItemDistance(); },
            setItemDistance: function(value) { setDistance(value); },
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
           // setDistance(distance ? 0 : 60000)
           // console.log("status: ", status)
           // console.log("distance: ", distance)
        }
    }

    const getColor = () => {
        switch (status) {
            case 1:
                return lockedColor
            case 2:
                return "#11111105"
            case 3:
                return "#11111105"
            case 4:
                return "#6343f4"
            case 5:
                return "#1358b7"
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

    return <div className='item' onClick={handleOnClick} style={{
        backgroundColor: getColor(), 
        transition: "all .8s ease",
        WebkitTransition: "all .8s ease",
        MozTransition: "all .8s ease"
    }}>
        {getIcon()}
    </div>
}

export default Item;