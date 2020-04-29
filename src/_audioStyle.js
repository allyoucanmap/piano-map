/* copyright 2019, stefano bovio @allyoucanmap. */

import Style from 'ol/style/Style';
import Fill from 'ol/style/Fill';
import Stroke from 'ol/style/Stroke';
import { head } from 'lodash';
import notes, { getColor } from './_notes';
import tinycolor from 'tinycolor2';

export default (options = {}) => {
    return (olFeature) => {
        const properties = olFeature.getProperties();
        const selectedValue = properties[options.selectedProperty];
        const { note } = head((options.classification || [])
            .filter(({ value }) => value === selectedValue));
        if (note) {
            const color = getColor(notes[note]);
            return options.style && (options.style.notes || []).filter(pressedNote => pressedNote === note)[0]
                ? new Style({
                    fill: new Fill({
                        color: tinycolor(color).setAlpha(0.75).toRgbString()
                    }),
                    stroke: new Stroke({
                        color
                    })
                })
                : new Style({
                    stroke: new Stroke({
                        color: tinycolor(color).setAlpha(0.75).toRgbString()
                    })
                })
        }
        return null;
    }
};