import { useState } from 'react'
import reactLogo from './assets/react.svg'
import { invoke } from '@tauri-apps/api/core'
import './App.css'
import 'remirror/styles/all.css'
import { Editable, Slate, withReact } from 'slate-react'
import { BoldExtension } from 'remirror/extensions'
import { Remirror, useRemirror } from '@remirror/react'
import { createEditor } from 'slate'
import { withHistory } from 'slate-history'

export const RemirrorEditor = () => {
  const { manager, state } = useRemirror({
    extensions: () => [new BoldExtension({})],
    content: '<p>this is <b>remirror</b></p>',
    selection: 'start',
    stringHandler: 'html',
  })

  return (
    <div className="remirror-theme">
      {/* the className is used to define css variables necessary for the editor */}
      <Remirror manager={manager} initialContent={state} />
    </div>
  )
}

const SlateEditor = () => {
  const [editor] = useState(() => withHistory(withReact(createEditor())))
  const initialValue = [
    {
      type: 'paragraph',
      children: [{ text: 'this is a slate.' }],
    },
  ]
  // Render the Slate context.
  return (
    <Slate editor={editor} initialValue={initialValue}>
      <Editable />
    </Slate>
  )
}
function App() {
  const [greetMsg, setGreetMsg] = useState('')
  const [name, setName] = useState('')

  async function greet() {
    // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
    setGreetMsg(await invoke('greet', { name }))
  }

  return (
    <div className="container">
      <h1>Welcome to Tauri!</h1>
      <input placeholder="input"></input>
      <p contentEditable />
      <RemirrorEditor />
      <SlateEditor />
      {/* <div className="row">
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo vite" alt="Vite logo" />
        </a>
        <a href="https://tauri.app" target="_blank">
          <img src="/tauri.svg" className="logo tauri" alt="Tauri logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>

      <p>Click on the Tauri, Vite, and React logos to learn more.</p>

      <form
        className="row"
        onSubmit={(e) => {
          e.preventDefault();
          greet();
        }}
      >
        <input
          id="greet-input"
          onChange={(e) => setName(e.currentTarget.value)}
          placeholder="Enter a name..."
        />
        <button type="submit">Greet</button>
      </form>

      <p>{greetMsg}</p> */}
    </div>
  )
}

export default App
