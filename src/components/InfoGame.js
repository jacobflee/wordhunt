function InfoGame(props) {
    const { score, curWord } = props;

    return (
        <div className='info-game'>
            <div className='curWord'>
                {curWord}
            </div>
            <div className='score'>
                {score}
            </div>
        </div>
    );
}

export default InfoGame;
