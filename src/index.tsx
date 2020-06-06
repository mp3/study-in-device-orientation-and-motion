import { h, render } from 'preact'

const Main = () => {
  return (
    <div>Hello, world</div>
  )
}

const root = document.getElementById('root')

if (root) {
  render(<Main />, root)
}
