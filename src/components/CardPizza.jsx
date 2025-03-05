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
      <h2 className="cardTitle">{capitalizer(name)}</h2>

      <div className="cardWindows">
        <img className="cardImg" src={img} alt={name} />
        <img className="zombie" src={img2} alt={name} />
        <p className="cardPrice">${pricer(price)}</p>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          paddingBottom: "1rem",
        }}
      >
        <Button buttonText="Añadir 🍕" className="agregar" />
      </div>

      <h4 className="cardSubTitle">
        {capitalizer(ingredients?.join(", ") || "No disponible")}
      </h4>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <p className="cardText">{desc}</p>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
      >
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
    </div>
  );
}

export default CardPizza;
