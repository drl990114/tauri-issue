## https://github.com/tauri-apps/tauri/issues/9426

### Reproduction

- yarn tauri dev
- open `http://localhost:1420/` in browser
- `command + z` is work
- in tauri window
  - input can undo by `command + z`
  - div contenteditable can undo by `command + z`
  - remirror can not undo by `command + z` when `command + v` to paste text
  - slate can not undo by `command + z`
