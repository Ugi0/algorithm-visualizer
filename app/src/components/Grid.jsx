import './Grid.css'

const gridSize = 11;

function Grid(props) {
    return <div className='Grid' style={{gridTemplateColumns: `repeat(${gridSize}, 1fr)`}}>
        {Array.from(new Array(gridSize*gridSize)).map((_, i) => {
            return <div className='item' key={i}>

            </div>
        })}
    </div>
}

export default Grid;