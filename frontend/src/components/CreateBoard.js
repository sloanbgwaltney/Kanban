import firebase from 'firebase/app'
import When from './When'
import { useState } from 'react'
import Loading from './Loading'
import { useForm } from 'react-hook-form'

function CreateBoard ({ user, boards }) {
  const [loading, setLoading] = useState(false)
  const { register, handleSubmit, formState: { errors } } = useForm({ mode: 'all', defaultValues: { name: '', description: '' } })

  return (
    <div>
      <When condition={loading}>
        <Loading></Loading>
      </When>
      <div className="card">
        <header className="card-header">
          <p className="card-header-title">
            Create a New Board
        </p>
        </header>
        <div className="card-content">
          <form onSubmit={handleSubmit(async ({ name, description }) => {
            try {
              setLoading(true)
              const batch = firebase.firestore().batch()
              const boardOperation = firebase.firestore().collection('/boards').doc()
              const userOperations = firebase.firestore().collection('/users').doc(user.uid)
              batch.set(boardOperation, { id: boardOperation.id, name, description, createdBy: user.uid, users: { [user.uid]: { roles: ['OWNER'] } } })
              batch.update(userOperations, { boards: boards ? boards.push({ name, description, id: boardOperation.id }) : [{ name, description, id: boardOperation.id }] })
              await batch.commit()
              setLoading(false)
            } catch (e) {
              console.log(e)
            }
          })}>
            <div className="field">
              <label className="label">Name</label>
              <div className="control">
                <input className="input" {...register("name")}></input>
              </div>
            </div>
            <div className="field">
              <label className="label">Description</label>
              <div className="control">
                <textarea className="textarea" {...register("description")}></textarea>
              </div>
            </div>
            <button className="button is-primary">Create!</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default CreateBoard