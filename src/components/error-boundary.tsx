import { ErrorBoundary } from "react-error-boundary";
import { useSelector } from "react-redux";
import { RootState } from "../store";

function ErrorBoundaries({ children }: React.PropsWithChildren) {
  const user = useSelector((state: RootState) => state.app.user);

  const logError = (error: Error, info: any) => {
  
    // call api -> create error
      
    console.log('error: ', error)
    const bodyData = {
      error,
      componentStack: JSON.stringify(info.componentStack),
      level: "ERROR",
      datetime: new Date().toUTCString(),
      user,
      os: window.navigator.userAgent,
    }

    console.log("logError: ", {
     bodyData
    })
  };
  
  function fallbackRender() {
    return (
      <div role="alert">
        Server is maintance, please contact admin
      </div>
    );
  }

  return (
  <ErrorBoundary
    fallbackRender={fallbackRender}
    onError={logError}
  >
    {children}
  </ErrorBoundary>
  )
}

export default ErrorBoundaries