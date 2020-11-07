/* eslint-disable eqeqeq */
import { useLayoutEffect, useState } from 'react';
// import { isMobile } from 'react-device-detect';
import Header from './Header';
import InfoGame from './InfoGame';
import Grid from './Grid';
import InfoResult from './InfoResult';

function App() {
  const scores = [100, 400, 800, 1400, 2200, 3200, 4800, 7200, 10400, 15200, 21600, 28800, 40000, 100000];
  const [score, setScore] = useState(0);
  const randomBoxes = generateRandomBoxes();
  const [boxes, setBoxes] = useState(randomBoxes);
  const [wordsFound, setWordsFound] = useState([]);
  const [prevId, setPrevId] = useState(-1);
  const [curWord, setCurWord] = useState('');
  const [scroll, setScroll] = useState([0, 0]);
  useLayoutEffect(() => {
    function updateScroll() { setScroll([window.pageXOffset, window.pageYOffset]) };
    window.addEventListener('scroll', updateScroll);
    updateScroll();
    return () => { window.removeEventListener('scroll', updateScroll); }
  }, []);

  function generateRandomBoxes() {
    var randomBoxes = [];
    for (var i = 0; i < 16; i++)
      randomBoxes.push({
        isPressed: false,
        value: String.fromCharCode(Math.floor(26 * Math.random() + 65)),
        shouldUpdate: true
      });
    return randomBoxes;
  }

  function hasValidId(target) {
    return (
      target
      && !!target.id
      && boxes[target.id]
      && !boxes[target.id].isPressed
      && (
        prevId === -1
        || (
          Math.abs(Math.floor(target.id % 4) - Math.floor(prevId % 4)) <= 1
          && Math.abs(Math.floor(prevId / 4) - Math.floor(target.id / 4)) <= 1
        )
      )
    );
  }

  function evaluateDegrees(id) {
    const x = Math.floor(id % 4) - Math.floor(prevId % 4);
    const y = Math.floor(prevId / 4) - Math.floor(id / 4);
    return 45 * (y > 0 ? -1 : 1) * (2 - x * (y === 0 ? 2 : 1));
  }

  function addLetter(id) {
    setBoxes(boxes => boxes.map((box, i) => {
      if (i == id) return { ...box, isPressed: true, shouldUpdate: true, }
      else if (i == prevId) return { ...box, degrees: evaluateDegrees(id) };
      else return { ...box, shouldUpdate: false };
    }));
    setCurWord(curWord => curWord + boxes[id].value);
    setPrevId(id);
  }

  function addWord() {
    if (curWord.length > 2 && !wordsFound.includes(curWord)) {
      setWordsFound(wordsFound => [...wordsFound, curWord]);
      setScore(score => score + scores[curWord.length - 3]);
    }
    setBoxes(boxes => boxes.map((box) => ({
      isPressed: false,
      value: box.value,
      shouldUpdate: true
    })));
    setCurWord('');
    setPrevId(-1);
  }

  function handleTouch(event) {
    if (event.type === 'touchstart' || event.type === 'touchmove') {
      const target = document.elementFromPoint(event.touches[0].pageX - scroll[0], event.touches[0].pageY - scroll[1]);
      if (hasValidId(target)) addLetter(target.id);
    } else addWord();
  }

  return (
    <div>
      <Header />
      <br />
      <InfoGame score={score} curWord={curWord} />
      <br />
      <Grid boxes={boxes} handleTouch={handleTouch} />
      <br />
      <InfoResult wordsFound={wordsFound} />
    </div>
  );
}

export default App;
