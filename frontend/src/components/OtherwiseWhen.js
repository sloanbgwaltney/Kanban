import React from 'react'
import When from "./When"

function OtherwiseWhen (props) {
  let hasReturned = false

  return (
    <>
      {React.Children.map(props.children, (child, index) => {
        if (child.type === When && child.props.condition) {
          hasReturned = true
          return child
        }
        if (index === props.children.length - 1 && !hasReturned) {
          return child
        }
        return null
      })}
    </>
  )
}

export default OtherwiseWhen