<!-- copyright 2019, stefano bovio @allyoucanmap. -->
<script>
  import Container from "./Container";
  import PianoKey from "./PianoKey";
  import { setOscillator } from "./_audio";

  export let style = "";
  export let id = "piano";
  export let pressedKeys = [];
  export let onKeyDown = () => {};

  const margin = 5;

  const wKeys = [
    "F3",
    "G3",
    "A3",
    "B3",
    "C4",
    "D4",
    "E4",
    "F4",
    "G4",
    "A4",
    "B4",
    "C5",
    "D5",
    "E5",
    "F5",
    "G5",
    "A5",
    "B5",
    "C6",
    "D6",
    "E6",
    "F6"
  ];

  const pianoWKeysLength = wKeys.length;
  const pianoWKeys = Object.keys([...new Array(pianoWKeysLength)]);
  const pianoWKeyWidth = 10;
  const pianoWKeyHeight = 50;

  const bKeys = [
    "F3#",
    "G3#",
    "A3#",
    null,
    "C4#",
    "D4#",
    null,
    "F4#",
    "G4#",
    "A4#",
    null,
    "C5#",
    "D5#",
    null,
    "F5#",
    "G5#",
    "A5#",
    null,
    "C6#",
    "D6#"
  ];
  const pianoBKeysLength = bKeys.length;
  const pianoBKeys = Object.keys([...new Array(pianoBKeysLength)]);
  const pianoBKeyWidth = 5;
  const pianoBKeyHeight = 30;

  const pianoWidth = pianoWKeyWidth * pianoWKeysLength + margin * 2;
  const pianoHeight = pianoWKeyHeight + margin * 4;

  let fingers = [false, false, false, false];

  const mappedKeys = {
    81: "F3",
    50: "F3#",
    87: "G3",
    51: "G3#",
    69: "A3",
    52: "A3#",
    82: "B3",
    84: "C4",
    54: "C4#",
    89: "D4",
    55: "D4#",
    85: "E4",
    73: "F4",
    57: "F4#",
    79: "G4",
    48: "G4#",
    80: "A4",
    219: "A4#",
    186: "B4",
    187: "C5",
    //
    226: "C5",
    65: "C5#",
    90: "D5",

    83: "D5#",
    88: "E5",
    67: "F5",
    70: "F5#",
    86: "G5",
    71: "G5#",
    66: "A5",
    72: "A5#",
    78: "B5",
    77: "C6",
    75: "C6#",
    188: "D6",
    76: "D6#",
    190: "E6",
    189: "F6"
  };
  const onDown = event => {
    const currentFingerEmptyIdx = fingers
      .map((val, idx) => (!val ? idx : null))
      .filter(val => val !== null)[0];
    const currentFingerUsedIdx = fingers
      .map((val, idx) => (event.keyCode === val ? idx : null))
      .filter(val => val !== null)[0];
    if (
      mappedKeys[event.keyCode] &&
      currentFingerEmptyIdx !== undefined &&
      currentFingerUsedIdx === undefined
    ) {
      fingers[currentFingerEmptyIdx] = event.keyCode;
      onKeyDown(fingers.map(keyCode => mappedKeys[keyCode]));
      setOscillator(0.3, mappedKeys[event.keyCode], currentFingerEmptyIdx, {
        length: fingers.length
      });
    }
  };
  const onUp = event => {
    const currentFingerUsedIdx = fingers
      .map((val, idx) => (event.keyCode === val ? idx : null))
      .filter(val => val !== null)[0];
    if (currentFingerUsedIdx !== undefined) {
      fingers[currentFingerUsedIdx] = false;
      onKeyDown(fingers.map(keyCode => mappedKeys[keyCode]));
      setOscillator(0, 0, currentFingerUsedIdx, { length: fingers.length });
    }
  };
  const keyBoard = () => {
    window.addEventListener("keydown", onDown);
    window.addEventListener("keyup", onUp);
    return {
      destroy() {
        window.removeEventListener("keydown", onDown);
        window.removeEventListener("keyup", onUp);
      }
    };
  };
</script>

<style>
  svg {
    position: relative;
    width: 100%;
    height: 200px;
    padding: 8px 0;
  }
</style>

<Container {style}>
  <svg viewBox={`0 0 ${pianoWidth} ${pianoHeight}`} use:keyBoard={id}>
    <rect
      x="0"
      y="0"
      width={pianoWidth}
      height={pianoHeight - margin}
      fill="#557"
      stroke="#0ff"
      stroke-width="4"
      stroke-opacity="0.3" />
    <rect
      x={margin}
      y={margin * 3}
      width={pianoWidth - margin * 2}
      height={margin}
      fill="#668" />
    <g transform={`translate(${margin}, ${margin * 4})`}>
      {#each pianoWKeys as pianoWKey, i}
        <PianoKey
          x={i * pianoWKeyWidth}
          y={0}
          width={pianoWKeyWidth}
          height={pianoWKeyHeight}
          note={wKeys[i]}
          pressed={(pressedKeys || []).filter(pressedKey => pressedKey === wKeys[i])[0]}
          onKeyDown={isDown => {
            const keyCode = Object.keys(mappedKeys)
              .filter((code) => mappedKeys[code] === wKeys[i])
              .map(code => code)[0];
            if (isDown) {
              onDown({ keyCode });
            } else {
              onUp({ keyCode });
            }
          }} />
      {/each}
      {#each bKeys as pianoBKey, i}
        {#if pianoBKey !== null}
          <PianoKey
            x={pianoWKeyWidth + i * pianoWKeyWidth - pianoBKeyWidth / 2}
            y={0}
            width={pianoBKeyWidth}
            height={pianoBKeyHeight}
            note={bKeys[i]}
            pressed={(pressedKeys || []).filter(pressedKey => pressedKey === bKeys[i])[0]}
            semitone
            onKeyDown={isDown => {
              const keyCode = Object.keys(mappedKeys)
                .filter((code) => mappedKeys[code] === bKeys[i])
                .map(code => code)[0];
              if (isDown) {
                onDown({ keyCode });
              } else {
                onUp({ keyCode });
              }
            }} />
        {/if}
      {/each}
    </g>
  </svg>
</Container>
