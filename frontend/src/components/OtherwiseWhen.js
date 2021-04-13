import React from 'react'
import Otherwise from './Otherwise'
import When from "./When"

function OtherwiseWhen (props) {
  let hasReturned = false

  return (
    <>
      {React.Children.map(props.children, (child) => {
        if (child.type === When && child.props.condition) {
          hasReturned = true
          return child
        }
        if (child.type === Otherwise && !hasReturned) {
          hasReturned = false
          return child
        }
        return null
      })}
    </>
  )
}

export default OtherwiseWhen