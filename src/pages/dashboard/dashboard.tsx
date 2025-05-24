import AccessControl from "../../components/access-control";
import SimpleButton from "../../components/button/simple-button";

function Dashboard() {
  const user = {};
  return (
    <div>
        {user}
      <AccessControl resource="/dashboard/action/create">
        <SimpleButton>
          Create
        </SimpleButton>
      </AccessControl>
      
      <br /><br />
      <SimpleButton>
        Show
      </SimpleButton>
      <br /><br />
      <SimpleButton>
        Edit
      </SimpleButton>
      <br /><br />
      <SimpleButton>
        Delete
      </SimpleButton>

      <AccessControl resource="/report/action/import">
        <SimpleButton>
          IMPORT CSV
        </SimpleButton>
      </AccessControl>
    </div>
  )
}

export default Dashboard