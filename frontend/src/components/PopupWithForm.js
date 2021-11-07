import '../index.css';

function PopupWithForm(props) {
  return (
    <section className={`popup popup_type_${props.name} ${props.isOpen ? "popup_opened":""}`}>
    <div className="popup__window">
      <button 
        type="button" 
        className="button button_type_close"  
        onClick={props.onClose} 
      />
      <h2 className="popup__heading">{props.title}</h2>
      <form 
        className="form" 
        name={props.name} 
        onSubmit={props.onSubmit}
        method="POST"
      > 
        {props.children}
        <button className="button button_type_submit" type="submit" >
        {props.submitText}
        </button>
      </form>
    </div>
    <div className="popup__overlay popup__overlay_edit" onClick={props.onClose} />
  </section>
  );
}

export default PopupWithForm;