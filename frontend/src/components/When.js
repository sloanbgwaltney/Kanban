function When (props) {
  return (
    <>
      {
        props.condition ? props.children : null
      }
    </>
  )
}

export default When