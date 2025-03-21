import { pizzaCartJs } from "../data/pizzas";
import Button from "../components/Button";
import { useState, useEffect } from "react";
import { pricer } from "../utilities/helper";

export default function Cart({ setTotalisimo, cuponPromo }) {
  const [pizzaCart, setPizzaCart] = useState(pizzaCartJs);
  const [cupon, setCupon] = useState("");
  const [descuentoAplicado, setDescuentoAplicado] = useState(0);

  function addPizza(id) {
    setPizzaCart((prevPizzas) =>
      prevPizzas.map((pizza) =>
        pizza.id === id ? { ...pizza, count: pizza.count + 1 } : pizza
      )
    );
  }

  function deletePizza(id) {
    setPizzaCart((prevPizzas) =>
      prevPizzas.map((pizza) =>
        pizza.id === id && pizza.count > 0
          ? { ...pizza, count: pizza.count - 1 }
          : pizza
      )
    );
  }

  const total = pizzaCart.reduce(
    (acc, pizza) => acc + pizza.price * pizza.count,
    0
  );
  const cantidad = pizzaCart.reduce((acc, pizza) => acc + pizza.count, 0);

  function calcularDescuento(total) {
    if (total < 10000) return 0;
    let descuento = total * 0.35;
    return Math.min(descuento, 12000);
  }

  function aplicarCupon() {
    if (cupon.toLowerCase() === cuponPromo) {
      setDescuentoAplicado(calcularDescuento(total));
    } else {
      setDescuentoAplicado(0);
      alert("Cupón inválido ❌");
    }
  }

  useEffect(() => {
    const newTotal =
      pricer(total - descuentoAplicado) < pricer(total)
        ? pricer(total - descuentoAplicado)
        : pricer(total);
    setTotalisimo(newTotal);
  }, [total, descuentoAplicado, setTotalisimo]);

  return (
    <div className="cart">
      <h3>Detalle del pedido</h3>
      {pizzaCart.map(
        (pizza) =>
          pizza.count > 0 && (
            <div key={pizza.id} className="cart-item">
              <img src={pizza.img} alt={pizza.name} />
              <div className="column">
                <p>{pizza.name}</p>
                <p>${pricer(pizza.price)}</p>
              </div>
              <div className="botones">
                <Button
                  buttonText="+"
                  className="addPizza"
                  onClick={() => addPizza(pizza.id)}
                />
                <p>{pizza.count}</p>
                <Button
                  buttonText="-"
                  className="deletePizza"
                  onClick={() => deletePizza(pizza.id)}
                />
              </div>
            </div>
          )
      )}
      <div className="column" style={{width: '90%'}}>
        <label htmlFor="Cupon">Cupón:</label>
        <input
          type="text"
          id="Cupon"
          placeholder="Ingrese el código del cupón. Ejemplo: 'movistar'"
          value={cupon}
          onChange={(e) => setCupon(e.target.value)}
        />
        <Button
          type="submit"
          className="total"
          buttonText="Aplicar"
          onClick={aplicarCupon}
        />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "start",
          flexDirection: "column",
          gap: ".5rem",
          padding: "0",
          margin: "0",
          lineHeight: "0",
        }}
      >
        <p>Total: ${pricer(total)}</p>
        {descuentoAplicado > 0 && cantidad > 0 && (
          <p>Descuento aplicado: -${pricer(descuentoAplicado)}</p>
        )}
        {descuentoAplicado > 0 && cantidad > 0 && (
          <p>Total a pagar: ${pricer(total - descuentoAplicado)}</p>
        )}
        <p>Cantidad: {cantidad}</p>
      </div>
      <Button buttonText="PAGAR 🍕" className="total" />
    </div>
  );
}
