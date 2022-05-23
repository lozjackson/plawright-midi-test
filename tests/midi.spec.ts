import { test, expect } from "@playwright/test";
import Midi from "midi";

let input = null;

function openVirtualMIDIPort(portName = "MIDI Port") {
  // Set up a new input.
  input = new Midi.Input();
  input.openVirtualPort(portName);
}

test.beforeEach(async ({ page, context }) => {
  await openVirtualMIDIPort();

  page.on("crash", () => console.log('Chrome crashed, "Aw Snap" etc...'));

  // grant permissions for midi and midi-sysex
  context.grantPermissions(["midi", "midi-sysex"], {
    origin: "http://localhost:8080",
  });

  await page.goto("http://localhost:8080");

  await page.waitForSelector("[data-test-midi-enabled]");
});

test.afterEach(() => {
  input?.closePort();
  input = null;
});

test.describe("Test MIDI", () => {
  // this test sends a CC messaeg, and works ok
  test("can send CC messages", async ({ page }) => {
    // send CC message
    await page.click("button[data-test-send-cc]");

    expect(await page.locator("li").first().innerText()).toBe("176,0,1");
  });

  // this test sends a sysex message and crashes chrome
  test("can send sysex messages", async ({ page }) => {
    // send Sysex message
    await page.click("button[data-test-send-sysex]");

    expect(await page.locator("li").first().innerText()).toBe(
      "240,126,127,6,1,247"
    );
  });
});
