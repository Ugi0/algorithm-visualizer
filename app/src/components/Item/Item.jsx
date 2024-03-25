import { useState } from 'react';
import './Item.css'

function Item(props) {
    const lockedColor = "#14181c";
    const colors = [
        "#1358b7", "#5d168d"
    ]

    const [colorIndex, setColorIndex] = useState(props.colorIndex ?? 2)
    const [border, setBorder] = useState(false);

    const handleMouseEnter = () => {
        if (!props.locked) {
            setColorIndex((colorIndex + 1) % 2)
        }
    }

    const handleOnClick = () => {
        if (!props.locked) {
            //setColorIndex((colorIndex + 1) % 2)
            setBorder(!border)
        }
    }

    const getColor = () => {
        if (props.locked) {
            return lockedColor;
        } else if (border) {
            return lockedColor
        }
        //return colors[colorIndex]
    }

    return <div className='item' key={props.index} onClick={handleOnClick} style={{backgroundColor: getColor()}}>

    </div>
}

export default Item;