import "./Content.css"
const Content = ({subtitle}, {content}) => {
  return (
      <div className={"body"} >
          <div className={"subtitle"}>
              <h1>{subtitle}</h1>
          </div>
          {content}
      </div>
  )
}

export default Content;