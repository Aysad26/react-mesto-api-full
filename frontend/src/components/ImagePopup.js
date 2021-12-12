function ImagePopup(props){
  return(
    <section className={`popup popup_type_image ${props.isOpen  ? "popup_opened":""}`}>
      <figure className="popup__window popup__window_image" method="POST">
        <button type="button" className="button button_type_close" onClick={props.onClose} />
        <img className="popup__image" alt={props.card.name} src={props.card.link} />
        <figcaption className="popup__caption" >{props.card.name}</figcaption>
      </figure>
    <div className="popup__overlay popup__overlay_image" />
    </section>
  )
}
export default ImagePopup