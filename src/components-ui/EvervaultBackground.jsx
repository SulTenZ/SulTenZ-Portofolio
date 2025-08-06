// src/components-ui/EvervaultBackground.jsx
"use client"
import { useMotionValue, useMotionTemplate, motion } from "motion/react"
import { useState, useEffect } from "react"
import { cn } from "../utils/util"

const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"

const generateRandomString = (length) => {
  let result = ""
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length))
  }
  return result
}

export const EvervaultBackground = ({ children, className }) => {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const [randomString, setRandomString] = useState("")

  useEffect(() => {
    const str = generateRandomString(15000)
    setRandomString(str)
  }, [])

  function onMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top } = currentTarget.getBoundingClientRect()
    mouseX.set(clientX - left)
    mouseY.set(clientY - top)

    const str = generateRandomString(30000)
    setRandomString(str)
  }

  return (
    <div className={cn("w-full h-full relative overflow-hidden bg-transparent", className)}>
      <div onMouseMove={onMouseMove} className="group/card absolute inset-0 w-full h-full pointer-events-none">
        <TextPattern mouseX={mouseX} mouseY={mouseY} randomString={randomString} />
      </div>

      <div className="relative z-20 w-full h-full flex items-center justify-center pointer-events-none">
        <div className="pointer-events-auto">{children}</div>
      </div>
    </div>
  )
}

function TextPattern({ mouseX, mouseY, randomString }) {
  const maskImage = useMotionTemplate`radial-gradient(250px at ${mouseX}px ${mouseY}px, white, transparent)`
  const style = { maskImage, WebkitMaskImage: maskImage }

  return (
    <div className="pointer-events-auto absolute inset-0 z-10">
      <div className="absolute inset-0 [mask-image:linear-gradient(white,transparent)] group-hover/card:opacity-50"></div>
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-green-500 to-blue-700 opacity-0 group-hover/card:opacity-100 backdrop-blur-xl transition duration-500"
        style={style}
      />
      <motion.div className="absolute inset-0 opacity-0 mix-blend-overlay group-hover/card:opacity-100" style={style}>
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <p className="absolute top-0 left-0 w-full h-full text-xs break-words whitespace-pre-wrap text-white font-mono font-bold transition duration-500 leading-3 p-0 m-0">
            {randomString}
          </p>
        </div>
      </motion.div>
    </div>
  )
}

export default EvervaultBackground
