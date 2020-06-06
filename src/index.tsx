import { h, render } from 'preact'
import { useState } from 'preact/hooks'

type Orientation = {
  absolute: boolean
  alpha: number | null
  beta: number | null
  gamma: number | null
}

const Main = () => {
  const [orientation, setOrientaion] = useState<Orientation>({
    absolute: false,
    alpha: 0,
    beta: 0,
    gamma: 0
  })

  const requestPermission = () => {
    DeviceOrientationEvent.requestPermission()
      .then((response) => {
        if (response === 'granted') {
          window.addEventListener('deviceorientation', handleOrientation, true)
        }
      })
  }

  const handleOrientation = (event: DeviceOrientationEvent) => {
    const { absolute, alpha, beta, gamma } = event
    
    setOrientaion({
      absolute,
      alpha,
      beta,
      gamma
    })
  }

  return (
    <div>
      <button onClick={requestPermission}>request permission</button>
      <h2>deviceorientation</h2>
      <div>{`absolute: ${orientation.absolute}`}</div>
      <div>{`alpha: ${orientation.alpha}`}</div>
      <div>{`beta: ${orientation.beta}`}</div>
      <div>{`gamma: ${orientation.gamma}`}</div>
    </div>
  )
}

const root = document.getElementById('root')

if (root) {
  render(<Main />, root)
}
