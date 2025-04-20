import { httpRequest } from "../../services/initRequest"

function Dashboard() {

  async function handleAuthenticate() {
    const res = await httpRequest('/api/auth', {
      method: 'POST',
      headers: {
        "x-auth-token": window.localStorage.getItem('access_token')
      }
    });

    console.log("handleAuthenticate: ", res)
  }

  return (
    <div>
      <button type="button" onClick={handleAuthenticate}>
        check authen
      </button>
    </div>
  )
}

export default Dashboard