/* copyright 2019, stefano bovio @allyoucanmap. */

import notes from './_notes';

let started = false;
let audioCtx;


let oscillators = [];

const createOscillator = () => {

    let gain = audioCtx.createGain();
    gain.gain.value = 0;
    gain.connect(audioCtx.destination);

    let oscillator = audioCtx.createOscillator();
    oscillator.connect(gain);
    oscillator.start(audioCtx.currentTime);

    return {
        gain,
        oscillator
    };
};

export const setOscillator = (_gain, note, idx = 0, options = {}) => {

    if (!started) {
        audioCtx = new AudioContext();
        const oscillatorLength = options.length || 1;
        const oscillatorRange = Object.keys([...new Array(oscillatorLength)]);
        oscillators = oscillatorRange.map(() => ({
            oA: createOscillator()
        }));
        started = true;
    }

    const { oA } = oscillators[idx]
    const { oscillator, gain } = oA;
    const frequency = note && notes[note];
    gain.gain.value = _gain;
    oscillator.type = 'triangle';
    if (frequency) oscillator.frequency.value = frequency;
};
