import { h, render } from 'preact'
import { useState } from 'preact/hooks'
import { throttle } from 'lodash-es'

type Orientation = {
  absolute: boolean
  alpha: number | null
  beta: number | null
  gamma: number | null
}

type Motion = {
  acceleration: DeviceMotionEventAcceleration | null
  accelerationIncludingGravity: DeviceMotionEventAcceleration | null
  rotationRate: DeviceMotionEventRotationRate | null
  interval: number
}

const Main = () => {
  const [orientation, setOrientaion] = useState<Orientation>({
    absolute: false,
    alpha: 0,
    beta: 0,
    gamma: 0
  })

  const [motion, setMotion] = useState<Motion>({
    acceleration: null,
    accelerationIncludingGravity: null,
    rotationRate: null,
    interval: 0
  })

  const requestPermission = () => {
    DeviceOrientationEvent.requestPermission()
      .then((response) => {
        if (response === 'granted') {
          window.addEventListener('deviceorientation', throttle(handleOrientation, 16), true)
        }
      })

    DeviceMotionEvent.requestPermission()
      .then((response) => {
        if (response === 'granted') {
          window.addEventListener('devicemotion', throttle(handleMotion, 16), true)
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

  const handleMotion = (event: DeviceMotionEvent) => {
    const { acceleration, accelerationIncludingGravity, rotationRate, interval } = event

    setMotion({
      acceleration,
      accelerationIncludingGravity,
      rotationRate,
      interval
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

      <h2>devicemotion</h2>
      <div>{`acceleration: ${JSON.stringify(motion.acceleration)}`}</div>
      <div>{`accelerationIncludingGravity: ${JSON.stringify(motion.accelerationIncludingGravity)}`}</div>
      <div>{`rotationRate: ${JSON.stringify(motion.rotationRate)}`}</div>
      <div>{`interval: ${motion.interval}`}</div>
    </div>
  )
}

const root = document.getElementById('root')

if (root) {
  render(<Main />, root)
}
