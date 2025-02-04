import * as Tone from 'tone';
import { ScaleType , Scale} from 'tonal';

const allScales = ScaleType.names();

const generate = (options) => {
    const randomScale = allScales[Math.floor(Math.random() * 92)];
    const notes = Scale.get('d4 ' + randomScale).notes;

    let melody = [];

    for(let i = 0; i < options.length; i++){
        const idx = Math.floor(Math.random() * notes.length);
        melody.push({
            note: notes[idx],
            type: Math.random() > 0.5 ? '4n' : '8n'
        });
    }
    console.log(melody, randomScale);
    return melody;
}  

const play = (melody) => {
    const synth = new Tone.Synth().toDestination();
          
    const now = Tone.now();
    melody.forEach((elem, index) => {
        synth.triggerAttackRelease(elem.note, elem.type, now + 0.5*index);
    });
};

export default {play, generate};