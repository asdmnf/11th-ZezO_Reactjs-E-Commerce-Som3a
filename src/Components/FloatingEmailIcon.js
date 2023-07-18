import FloatingEmailIconHook from "../Hooks/FloatingEmailIconHook"


const FloatingEmailIcon = () => {

  const [emailIconOnClickHandle] = FloatingEmailIconHook()

  return (
    <div className="floating-icon">
      <i className="fa-solid fa-envelope" title="report bugs" onClick={emailIconOnClickHandle}></i>
    </div>
  )
}

export default FloatingEmailIcon