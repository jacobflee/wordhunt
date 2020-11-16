import Cell from './Cell';

function Grid(props) {
    const { boxes, prevId, handleTouch } = props;
    // console.log(prevId, '|||||||||||||||||||||||');

    return (
        <div className='grid'>
            {boxes.map((box, i) => <Cell key={i} id={i} box={box} prevId={prevId} handleTouch={handleTouch} />)}
        </div>
    );
}

export default Grid;
