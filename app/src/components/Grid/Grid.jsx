import Item from '../Item/Item';
import './Grid.css'

const gridWidth = 35;
const gridHeight = 20;

function Grid(props) {
    return <div className='Grid' style={{gridTemplateColumns: `repeat(${gridWidth}, 1fr)`}}>
        {Array.from(new Array(gridWidth * gridHeight)).map((_, i) => {
            if (i % gridWidth === 0 || i % gridWidth === gridWidth-1 || i < gridWidth-1 || i > (gridWidth*gridHeight-gridWidth)) {
                return <Item locked={true} colorIndex={0}/>
            }
            return <Item />
        })}
    </div>
}

export default Grid;