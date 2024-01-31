import "./Content.css"
const Content = ({subtitle, children}) => {
  return (
      <div>
          <div className={"text d-flex justify-content-center mt-5 py-4"}>
              <h1 className={"mt-3 mx-4"}><strong>{subtitle}</strong></h1>
          </div>
          {children}
      </div>
  )
}

export default Content;