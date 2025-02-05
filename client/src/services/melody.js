import * as Tone from 'tone';
import { ScaleType , Scale} from 'tonal';

const allScales = ScaleType.names();
const roots = ["C", "D", "E", "F", "G", "A", "B"];

const generate = (options) => {
    Tone.getTransport().bpm.value = options.bpm;
    
    const randomRoot = roots[Math.floor(Math.random() * roots.length)] + "3";

    let curScale;
    if(options.scale === 'All scales'){
        curScale = allScales[Math.floor(Math.random() * allScales.length)];
    }
    else{
        curScale = options.scale;
    }
    const notes = Scale.get(randomRoot + " " +curScale).notes;


    let melody = [];

    for(let i = 0; i < options.length; i++){
        const idx = Math.floor(Math.random() * notes.length);
        melody.push({
            note: notes[idx],
            type: Math.random() > 0.5 ? '4n' : Math.random() > 0.5 ? '16n' : '8n'
        });
    }
    console.log(melody, curScale);
    return melody;
}  

const play = (melody) => {

    const synth = new Tone.Synth().toDestination();

    Tone.getTransport().stop();
    Tone.getTransport().cancel(0);
    Tone.getTransport().position = 0;
    

    let curTime = 0;

    melody.forEach((elem) => {
        Tone.getTransport().scheduleOnce((time) => {
            synth.triggerAttackRelease(elem.note, elem.type , time);
        }, curTime);
        curTime += Tone.Time(elem.type).toSeconds();
    });

    Tone.getTransport().start();
};

export default {play, generate};