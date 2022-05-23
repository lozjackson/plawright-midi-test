# Playwright MIDI Test

This is package is a minimal reproduction of a bug when using Playwright to test MIDI comms in Chrome

It uses [node-midi](https://www.npmjs.com/package/midi) to create a virtual MIDI port for testing with.

The javascript in the application requests MIDI access, and then sends a MIDI message to any available MIDI
ports via two buttons, 1 for sending CC messages, and another for sending sysex messages

## Install

`yarn` to install dependencies
`yarn test` to run Playwright test
`yarn start` to start a dev server running on http://localhost:8080

## When testing with Playwright

`yarn test` (or `npx playwright test`)

### with `permissions: ['midi', 'midi-sysex']`

- Sending CC messages works. You can see a log of sucessfully sent messages in the page
- Sending Sysex messages causes Chrome to crash and display the "Aw Snap" page

### with no permissions set

On requesting MIDI access the MIDI permission prompt is displayed, if you click "Allow", then everything
works and Chrome doesn't crash

- Sending CC messages works. You can see a log of sucessfully sent messages in the page
- Sending Sysex messages works. You can see a log of sucessfully sent messages in the page

## When running in Chrome (without Playwright)

`yarn start` (or `npx http-server`)

This works as expected when running in Chrome

- Sending CC messages works. You can see a log of sucessfully sent messages in the page
- Sending Sysex messages works. You can see a log of sucessfully sent messages in the page
