import { useState } from 'react';
import FlagIcon from '@mui/icons-material/Flag';
import PlayArrowIcon from '@mui/icons-material/PlayArrow'; //Start
import './Item.css'

function Item(props) {
    const lockedColor = "#14181c";
    const colors = [
        "#1358b7", "#5d168d"
    ]

    const [colorIndex, setColorIndex] = useState(props.colorIndex ?? 2)
    const [border, setBorder] = useState(false);
    const [icon, setIcon] = useState(undefined)

    props.innerRef.current = () => { return getItemState() }

    const getItemState = () => {
        if (icon === 0) {
            return "S"
        } else if (icon === 1) {
            return "E"
        }
        if (border) {
            return "B"
        }
        return 0
    }

    const handleMouseEnter = () => {
        if (!props.locked) {
            setColorIndex((colorIndex + 1) % 2)
        }
    }

    const handleOnClick = () => {
        if (!props.locked) {
            if (props.iconSelected) {
                setIcon(props.iconCount)
                if (props.iconCount === 1) {
                    props.setIconSelected(false)
                } else {
                    props.setIconCount(props.iconCount+1)
                }
            } else {
            //setColorIndex((colorIndex + 1) % 2)
                setBorder(!border)
            }
        }
    }

    const getColor = () => {
        if (props.locked) {
            return lockedColor;
        } else if (border) {
            return lockedColor
        } else if (icon !== undefined) {
            return '#ae27ff'
        }
        //return colors[colorIndex]
    }

    const getIcon = () => {
        switch (icon) {
            case 1:
                return <FlagIcon />
            case 0:
                return <PlayArrowIcon />
            default:
                return 
        }
    }

    return <div className='item' onClick={handleOnClick} style={{backgroundColor: getColor(), width: props.width, height: props.width}}>
        {getIcon()}
    </div>
}

export default Item;