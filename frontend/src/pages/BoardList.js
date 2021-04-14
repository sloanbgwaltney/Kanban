import { useDocumentData } from 'react-firebase-hooks/firestore'
import { useAuthState } from 'react-firebase-hooks/auth'
import Loading from '../components/Loading'
import OtherwiseWhen from '../components/OtherwiseWhen'
import When from '../components/When'
import CreateBoard from '../components/CreateBoard'
import firebase from 'firebase/app'

function BoardList () {
  const [user, loading, error] = useAuthState(firebase.auth())
  const [document, docLoading, docError] = useDocumentData(firebase.firestore().collection('/users').doc(user.uid))

  return (
    <div>
      <h1>Your boards</h1>
      <OtherwiseWhen>
        <When condition={loading || docLoading}>
          <Loading></Loading>
        </When>
        <When condition={user && document}>
          <CreateBoard user={user} boards={document?.boards}></CreateBoard>
          <When condition={document && document?.boards}>
            {
              document?.boards.map((board, i) => (
                <div className="card" key={i}>
                  <header className="card-header">
                    <p className="card-header-title">{board.name}</p>
                  </header>
                  <div className="card-content">
                    <p>{board.description}</p>
                  </div>
                  <div className="card-footer">
                    <button className="button is-primary card-footer-item">Open Board</button>
                  </div>
                </div>
              ))
            }
          </When>
        </When>
      </OtherwiseWhen>
    </div>
  )
}

export default BoardList