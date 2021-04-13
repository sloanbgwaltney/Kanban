function When (props) {
  console.log(props.condition)
  return (
    <>
      {
        props.condition ? props.children : null
      }
    </>
  )
}

export default When