<!-- copyright 2019, stefano bovio @allyoucanmap. -->
<script>
  import Container from "./Container";
  import notes, { getColor } from './_notes';

  export let width = 0;
  export let height = 0;
  export let note = null;
  export let x = 0;
  export let y = 0;
  export let semitone = false;
  export let onKeyDown = () => {};
  export let pressed = false;

  let color = semitone ? '#777' : '#fff';
  let border = semitone ? '#555' : '#ccc';
  let shadow = semitone ? '#333' : '#eee';
</script>

<g
    transform={`translate(${x}, ${y})`}
    on:mousedown={() => { onKeyDown(true); }}
    on:mouseup={() => { onKeyDown(false); }}
    on:mouseleave={() => { onKeyDown(false); }}>
  <rect
    x={0}
    y={0}
    {width}
    {height}
    fill={color}
    stroke={border}
    stroke-width={0.2} />
  {#if pressed}
    <rect x={0} y={0} width={width / 4} {height} fill={shadow} />
    <rect x={width * 3 / 4} y={0} width={width / 4} {height} fill={shadow} />
    <rect x={width / 4} y={0} width={width / 2} height={width / 2} fill={shadow} />
    <circle cx={width / 2} cy={-3} r={1} fill={getColor(notes[note])} />
    <rect x={0} y={height - 2} width={width} height={2} fill={getColor(notes[note])} />
  {/if}
</g>
