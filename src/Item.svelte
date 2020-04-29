<!-- copyright 2019, stefano bovio @allyoucanmap. -->
<script>
    import notes, { getColor } from './_notes';
    export let properties = {};
</script>
<style>
    div {
        font-family: monospace;
        font-size: 12px;
        width: 100%;
        color: #eef;
    }
    .field {
        border: 1px solid #778;
        padding: 4px;
    }
    .field +.field {
        margin-top: 4px;
    }
    .classification {
        display: flex;
    }
    .classification > div {
        flex: 1;
    }
    .note {
        text-align: right;
        border: 1px solid transparent;
    }
</style>

<div>
    <div>
        <div class="field">{properties.id}</div>
        <div class="field">{properties.selectedProperty}</div>
        <div class="field">
            {#each (properties.classification || []) as field}
            <div class="classification">
                <div>
                    {field.value}
                </div>
                <div class="note" style={`
                    border-color: ${getColor(notes[field.note])};
                    ${properties.style && (properties.style.notes || []).filter(pressedNote => pressedNote === field.note)[0]
                    ? `background-color: ${getColor(notes[field.note])};`
                    : ''}
                `}>
                    {field.note}
                </div>
            </div>
            {/each}
        </div>
    </div>
</div>