import Cell from './Cell';

function Grid(props) {
    const { boxes, handleTouch } = props;

    return (
        <div className='grid'>
            {boxes.map((box, i) => <Cell key={i} id={i} box={box} handleTouch={handleTouch} />)}
        </div>
    );
}

export default Grid;
