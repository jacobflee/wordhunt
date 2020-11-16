import { memo } from 'react';

function Cell(props) {
    const { id, box, handleTouch } = props;
    // if (props.prevId !== -1)
        // console.log(id, box);
        // console.log(id);

    return (
        <div className='cell-container'>
            <div
                className='cell'
                // button pressed
                style={{
                    borderColor: box.isPressed && 'blue',
                    color: box.isPressed && 'blue'
                }}
            />
            {/* dot */}
            {box.isPressed &&
                <img
                    className='dot'
                    src={process.env.PUBLIC_URL + '/dot.svg'}
                    alt='oops'
                />
            }

            {/* pointer */}
            {box.degrees !== undefined &&
                <img
                    className='pointer'
                    style={{
                        width: box.degrees % 90 === 0
                            ? '220%'
                            : '308%',
                        transform: 'rotate(' + box.degrees + 'deg)',
                    }}
                    src={process.env.PUBLIC_URL + (box.degrees % 90 === 0
                        ? '/lineShort.svg'
                        : '/lineLong.svg')}
                    alt='oops'
                />
            }

            {/* touch */}
            <div
                id={id}
                className='touch'
                onTouchStart={handleTouch}
                onTouchMove={handleTouch}
                onTouchEnd={handleTouch}
                onTouchCancel={handleTouch}
            />

            {box.value}
        </div>
    );
}

export default Cell;
// export default memo(Cell, () => true);
// export default memo(Cell, (prevProps, nextProps) => {
//     console.log(nextProps.box.shouldUpdate);
//     return !(nextProps.prevId === -1 || (nextProps.box.shouldUpdate));
// });
