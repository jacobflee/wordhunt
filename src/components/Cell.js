import { memo } from 'react';

function Cell(props) {
    const { id, box, handleTouch } = props;
    console.log(id);

    return (
        <div
            className='cell'
            // button pressed
            style={{
                borderColor: box.isPressed && 'blue',
                color: box.isPressed && 'blue'
            }}
        >

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

export default memo(Cell, (prevProps, nextProps) => {
    return !(nextProps.box.shouldUpdate);
});
