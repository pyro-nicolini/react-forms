import Button from "./Button";
import ytImage from "../images/yt.png";

function CardPizza({ name, price, ingredients = [], img2, desc, img }) {
  function capitalizer(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  function pricer(num) {
    return num.toLocaleString().replace(",", ".");
  }

  return (
    <div className="cardBody">
      <div className="cardWindows">
        <img className="cardImg" src={img} alt={name} />
        <img className="cardImg2" src={img2} alt={name} />
        <Button
          buttonText={
            <>
              <img className="ytImage" src={ytImage} alt="YouTube" />
              <span>Ver Más</span>
            </>
          }
          className="verMas"
        />
      </div>
      <h2 className="cardTitle">{capitalizer(name)}</h2>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          paddingBottom: "2rem",
        }}
      >
        <h3 className="cardPrice">${pricer(price)}</h3>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            src={"src/images/hand.png"}
            style={{ width: "auto", height: "6rem" }}
          />
          <Button buttonText="Añadir 🍕" className="agregar" />
        </div>
      </div>

      <h4 className="cardSubTitle">
        {capitalizer(ingredients?.join(", ") || "No disponible")}
      </h4>
      <p className="cardText">{desc}</p>
    </div>
  );
}

export default CardPizza;
