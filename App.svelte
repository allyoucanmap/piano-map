<!-- copyright 2019, stefano bovio @allyoucanmap. -->
<script>
    
    import Container from './src/Container';
    import List from './src/List';
    import Map from './src/Map';
    import Piano from './src/Piano';
    import axios from 'axios';
    import * as turf from '@turf/turf';
    import uniq from 'lodash/uniq';

     const keys = ['F3', 'F3#', 'G3', 'G3#', 'A3', 'A3#', 'B3',
        'C4', 'C4#', 'D4', 'D4#', 'E4', 'F4', 'F4#', 'G4', 'G4#', 'A4', 'A4#', 'B4',
        'C5', 'C5#', 'D5', 'D5#', 'E5', 'F5', 'F5#', 'G5', 'G5#', 'A5', 'A5#', 'B5',
        'C6', 'C6#', 'D6', 'D6#', 'E6', 'F6'];

    let layers = [];
    let pressedKeys = [];

    let layerName = 'data/countries.geo.json';
    axios.get(layerName)
        .then(({ data: collection }) => {
            const properties = Object.keys(
                turf.propReduce(collection, (prev, curr) => ({ ...prev, ...curr }))
            );

            const selectedProperty = properties[0];

            const classification = uniq(
                turf.propReduce(collection, (acc, curr) => [
                    ...acc,
                    curr[selectedProperty]
                ], [])).map((value, idx) => ({ value, note: keys[idx % keys.length] }));

            layers = [
                ...layers,
                {
                    id: layerName,
                    type: 'vector',
                    collection,
                    properties,
                    selectedProperty,
                    classification
                }
            ];
        });

</script>

<style>
    :global(body),
    :global(#container) {
        position: absolute;
        width: 100%;
        height: 100%;
        margin: 0;
        padding: 0;
    }
    :global(*) {
        box-sizing: border-box;
    }
</style>

<Container vertical>
    <div slot="background">
        <Map
            layers={layers}/>
    </div>
    <div slot="left">
        <List
            layers={layers}/>
    </div>

        <Piano
            style="bottom: 0; position: absolute; width: 100%;"
            pressedKeys={pressedKeys}
            onKeyDown="{(notes) => {
                pressedKeys = notes;
                layers = layers.map((layer) => ({
                    ...layer,
                    style: (notes || []).filter((val) => val)[0] !== undefined ? { type: 'audio', notes } : false
                }))
            }}"/>

</Container>
