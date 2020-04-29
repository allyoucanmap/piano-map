/* copyright 2019, stefano bovio @allyoucanmap. */

import GeoJSON from 'ol/format/GeoJSON';
import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';

export const vector = (options = {}, projection) => {
    const { collection } = options;
    if (collection) {
        return new VectorLayer({
            source: new VectorSource({
                features: (new GeoJSON())
                    .readFeatures(collection, {
                        featureProjection: projection
                    })
            })
        });
    }
};
