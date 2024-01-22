import "./Content.css"
const Content = ({subtitle, children}) => {
  return (
      <div className={"body mt-5 mx-auto"} >
          <div className={"subtitle"}>
              <h1 className={"mt-3 mx-4"}><strong>{subtitle}</strong></h1>
          </div>
          {children}
      </div>
  )
}

export default Content;