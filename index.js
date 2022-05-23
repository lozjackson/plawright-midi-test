const ccMessage = new Uint8Array([0xb0, 0x00, 0x01]);
const sysexMessage = new Uint8Array([0xf0, 0x7e, 0x7f, 0x06, 0x01, 0xf7]);

(async function () {
  const midiEnabledDiv = document.getElementById("midi-enabled");
  const midiCCButton = document.getElementById("send-midi-cc-button");
  const midiSysexButton = document.getElementById("send-midi-sysex-button");

  // request MIDI Access (with sysex enabled)
  const midiAccess = await navigator.requestMIDIAccess({ sysex: true });

  // change the `midi-enabled` div to show "MIDI Enabled" (this is only for helping with debugging)
  midiEnabledDiv.innerHTML = "<span data-test-midi-enabled>MIDI Enabled</span>";

  // link the "Send MIDI" button action.  Clicking the button will send a
  // MIDI sysex message to all connected MIDI outputs
  midiCCButton.onclick = () => sendMIDI(midiAccess, ccMessage);
  midiSysexButton.onclick = () => sendMIDI(midiAccess, sysexMessage);
})();

function sendMIDI(midiAccess, midiMessage) {
  for (const [_, output] of midiAccess.outputs) {
    output.send(midiMessage);
    addMidiMessageLog(midiMessage.toString());
  }
}

function addMidiMessageLog(html) {
  const midiMessageLog = document.getElementById("midi-message-log");
  const li = document.createElement("li");
  li.innerHTML = html;
  midiMessageLog.appendChild(li);
}
