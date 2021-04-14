import firebase from 'firebase/app'
import { useForm } from 'react-hook-form'
import classNames from 'classnames'
import { useState } from 'react'
import { useHistory } from 'react-router'

function Register () {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const { register, handleSubmit, formState: { errors } } = useForm({ mode: 'all', defaultValues: { email: '', password: '', displayName: '' } })
  const history = useHistory()

  function renderField (registerArg, label, field, type = 'text') {
    return (
      <div className="field">
        <label className="label">{label}</label>
        <div className="control">
          <input type={type} className={classNames({ 'input': true, 'is-danger': errors[field] })} {...registerArg}></input>
        </div>
        {errors[field] ? <p className="help is-danger">{errors[field].message}</p> : null}
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(async (value) => {
      try {
        setLoading(true)
        const credential = await firebase.auth().createUserWithEmailAndPassword(value.email, value.password)
        const userDoc = firebase.firestore().collection('/users').doc(`/${credential.user.uid}`)
        await userDoc.set({
          email: value.email,
          displayName: value.displayName,
          uid: credential.user.uid
        })
        await firebase.auth().currentUser.updateProfile({ displayName: value.displayName })
        setLoading(false)
        history.push("/")
      } catch (e) {
        console.log(e)
        setError(e.message)
      }
    })}>
      {
        <>
          {error ? <h1>error</h1> : null}
          {renderField(register("email", { pattern: { value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/, message: 'Please enter a valid email' } }), 'Email', 'email')}
          {renderField(register("password", { pattern: { value: /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, message: 'Password must have at least: 1 uppercase letter, 1 lowercase letter, 1 number or special character, must have at least 8 characters' } }), 'Password', 'password', 'password')}
          {renderField(register("displayName", { minLength: { value: 2, message: "Display name must be at least 2 characters" }, maxLength: { value: 32, message: 'Display name must be at most 32 characters' } }), 'Display Name', 'displayName')}
        </>
      }
      <button type="submit" className={classNames({ 'button': true, 'is-primary': true, 'is-loading': loading })}>Register!</button>
    </form>
  )
}

export default Register