import React from "react";
import "./Cards.css";
import { cardsData } from "../Data/Data";
import Card from "../Card/Card";

const Cards = () => {
  return (
    <div className="Cards">
      {cardsData.map((card, id) => {
        return (
          <div className="parentContainer" key={id}>
            <Card
              param={{
                title: card.title,
                color: card.color,
                // value: card.value,
                png: card.png,
              }}
            />
          </div>
        );
      })}
    </div>
  );
};

export default Cards;
