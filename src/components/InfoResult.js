function InfoResult(props) {
    const { wordsFound } = props;

    const wordsFoundComponents = wordsFound.map((word) => <div key={word}>{word}<br /></div>);

    return (
        <div className='info-result'>
            {wordsFoundComponents}
        </div>
    );
}

export default InfoResult;
