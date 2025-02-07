/*
The MIT License (MIT)
Copyright (c) 2014 Chris Wilson
Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

Note: autoCorrelate comes from https://github.com/cwilso/PitchDetect/pull/23
with the above license.

*/

import { Note } from "tonal";

class NoteDetector {
  constructor () {
    this.audioContext = null;
    this.analyzer = null;
    this.source = null;
    this.silence = false;
    this.prevNote = null;
    // smoothing count threshold determines the number of iterations the note should be the same 
    this.smoothingCount = 0;
    this.smoothingCountThreshold = 2;
    this.animationFrameId = null;
    this.count = 0;
    this.listeners = [];
  }

  start() {
    if(this.audioContext){
      console.log('audio context is alreadly initialized');
      return;
    }
  
    this.audioContext = new window.AudioContext();
    this.analyzer = this.audioContext.createAnalyser();
  
    navigator.mediaDevices.getUserMedia({audio: true})
      .then((stream) => {
        this.source = this.audioContext.createMediaStreamSource(stream);
        this.source.connect(this.analyzer);
        this.detect();
      })
      .catch(err => {
        console.log(err);
        alert('mic access was denied');
      });
  }

  detect = () => {
    this.animationFrameId = requestAnimationFrame(this.detect.bind(this));

    const bufferSize = this.analyzer.fftSize;
    const buffer = new Float32Array(bufferSize);
    this.analyzer.getFloatTimeDomainData(buffer);

    const autoCorrelateValue = this.autoCorrelate(buffer, this.audioContext.sampleRate);

    if(autoCorrelateValue === -1) {
      this.silence = true;
      return;
    }

    const curNote = Note.fromFreq(autoCorrelateValue);
    
    if(this.prevNote === curNote){
      if(this.smoothingCount < this.smoothingCountThreshold){
        this.smoothingCount++;
        return;
      }
      else{
        this.smoothingCount = 0;
        this.prevNote = curNote;  
        if([2,3,4,5].includes(Note.octave(curNote)) && this.silence){
          this.silence = false;
          this.listeners.forEach((callback) => callback(curNote, this.count));
          this.count++;
          console.log(curNote);
        }
      }
    }
    else{
      this.smoothingCount = 0;
      this.prevNote = curNote;
      return;
    }

  }

  stop() {
    if(this.source){
      this.source.disconnect();
    }

    if(this.audioContext){
      this.audioContext.close();
    }
  }

  onNoteDetected(callback) {
    this.listeners.push(callback);
  }


  autoCorrelate(buffer, sampleRate) {
    // Perform a quick root-mean-square to see if we have enough signal
    var SIZE = buffer.length;
    var sumOfSquares = 0;
    for (var i = 0; i < SIZE; i++) {
      var val = buffer[i];
      sumOfSquares += val * val;
    }
    var rootMeanSquare = Math.sqrt(sumOfSquares / SIZE)
    if (rootMeanSquare < 0.04) {
      return -1;
    }
  
    // Find a range in the buffer where the values are below a given threshold.
    var r1 = 0;
    var r2 = SIZE - 1;
    var threshold = 0.2;
  
    // Walk up for r1
    for (var i = 0; i < SIZE / 2; i++) {
      if (Math.abs(buffer[i]) < threshold) {
        r1 = i;
        break;
      }
    }
  
    // Walk down for r2
    for (var i = 1; i < SIZE / 2; i++) {
      if (Math.abs(buffer[SIZE - i]) < threshold) {
        r2 = SIZE - i;
        break;
      }
    }
  
    // Trim the buffer to these ranges and update SIZE.
    buffer = buffer.slice(r1, r2);
    SIZE = buffer.length
  
    // Create a new array of the sums of offsets to do the autocorrelation
    var c = new Array(SIZE).fill(0);
    // For each potential offset, calculate the sum of each buffer value times its offset value
    for (let i = 0; i < SIZE; i++) {
      for (let j = 0; j < SIZE - i; j++) {
        c[i] = c[i] + buffer[j] * buffer[j+i]
      }
    }
  
    // Find the last index where that value is greater than the next one (the dip)
    var d = 0;
    while (c[d] > c[d+1]) {
      d++;
    }
  
    // Iterate from that index through the end and find the maximum sum
    var maxValue = -1;
    var maxIndex = -1;
    for (var i = d; i < SIZE; i++) {
      if (c[i] > maxValue) {
        maxValue = c[i];
        maxIndex = i;
      }
    }
  
    var T0 = maxIndex;
  
    // From the original author:
    // interpolation is parabolic interpolation. It helps with precision. We suppose that a parabola pass through the
    // three points that comprise the peak. 'a' and 'b' are the unknowns from the linear equation system and b/(2a) is
    // the "error" in the abscissa. Well x1,x2,x3 should be y1,y2,y3 because they are the ordinates.
    var x1 = c[T0 - 1];
    var x2 = c[T0];
    var x3 = c[T0 + 1]
  
    var a = (x1 + x3 - 2 * x2) / 2;
    var b = (x3 - x1) / 2
    if (a) {
      T0 = T0 - b / (2 * a);
    }

    return sampleRate/T0;
  }

}


  export default NoteDetector;