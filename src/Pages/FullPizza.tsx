import React from "react";
import axios from "axios";

import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const FullPizza: React.FC = () => {
  const [pizza, setPizza] = useState<{
    imageUrl: string;
    title: string;
    price: number;
  }>();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get(
          `https://658ed78a2871a9866e79ed6f.mockapi.io/pizza/pizzav2/` + id
        );
        setPizza(data);
      } catch (error) {
        console.log(error);
        alert("oshibka");
        navigate("/");
      }
    }

    fetchPizza();
  }, [id, navigate]);

  if (!pizza) {
    return <>Загрузка...</>;
  }

  return (
    <div>
      <img src={pizza.imageUrl} alt="alt" />
      <h2>{pizza.title}</h2>
      <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Soluta,
        blanditiis autem necessitatibus quibusdam neque fuga minus rem porro.
        Obcaecati, minima!
      </p>
      <h4>{pizza.price} руб.</h4>
      <Link to={"/"} className="button button--black">
        <span>Вернуться назад</span>
      </Link>
    </div>
  );
};

export default FullPizza;
