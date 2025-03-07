function Header({ title1, description1, fondo }) {
  return (
    <div className="header" style={{ backgroundImage: `url(${fondo})` }}>
        <div className="p1">
          <strong id="title1">{title1}</strong>
          <p id="desc1">{description1}</p>
        <img
          className="itemHeader"
          src="src/images/hand.png"
          alt="Fotografía de mano Plants Vs Zombie"
        />
        </div>
    </div>
  );
}

export default Header;
