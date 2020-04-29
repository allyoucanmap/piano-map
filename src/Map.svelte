<!-- copyright 2019, stefano bovio @allyoucanmap. -->
<script>
    import * as layerTypes from './_layerTypes';
    import View from 'ol/View';
    import olMap from 'ol/Map';
    import layerImage from 'ol/layer/Image';
    import { fromLonLat, transform } from 'ol/proj';
    import Zoom from 'ol/control/Zoom';

    import audioStyle from './_audioStyle';

    export let id = 'map';
    export let layers = [];
    export let center = [ 0, 10];
    export let zoom = 2;
    export let bounds = {};
    export let backgroundColor = '#111122';
    export let options = {};
    export let onUpdate = () => {};
    
    const projection = options.projection || 'EPSG:3857';

    let map = null;

    function setupMap(node, _id) {
        map = new olMap({
            target: id,
            view: new View({
                center: projection === 'EPSG:4326' ? center : fromLonLat(center),
                zoom,
                projection
            })
        });

        const moveEnd = function() {
            const view = map.getView();
            const code = view.getProjection().getCode();
            const _center = transform(view.getCenter(), code, 'EPSG:4326');
            const _zoom = view.getZoom();
            onUpdate(_center, _zoom);
        };

        map.on('moveend', moveEnd);

        return {
            destroy() {
                if (map) {
                    map.setTarget(null);
                    map = null;
                }
            }
        };
    }

    function updateLayers(node, _layers) {

        return {
            update(currentLayers) {
                const oldLayers = map.getLayers();
                if (oldLayers) {
                    oldLayers.forEach((oldLayer) => {
                        map.removeLayer(oldLayer);
                    });
                }
                currentLayers.forEach((currentLayer) => {
                    const { type, style } = currentLayer;
                    if (layerTypes[type]) {
                        const olLayer = layerTypes[type](currentLayer, projection);
                        if (olLayer) {
                            map.addLayer(olLayer);
                            olLayer.setStyle(audioStyle(currentLayer));
                        }
                    }
                });
            }
        };
    }
</script>

<style>
    div {
        position: absolute;
        width: 100%;
        height: 100%;
        background-color: #e2e2e2;
    }
    
</style>

<div
    id={id}
    use:setupMap={id}
    use:updateLayers={layers}
    style={`background-color: ${backgroundColor};`}/>