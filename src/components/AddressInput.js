import React, { useState } from "react";
import UseAddressPredictions from "./Autocomplete";
import './AddressInput2.css'

export default function AddressPredictions() {
  const [input, setInput] = useState("");
  const predictions = UseAddressPredictions(input);

  return (
    <div>
      <input
        value={input}
        onChange={event => setInput(event.target.value)}
      />
      <ul>
        {predictions.map((prediction, index) => (
          <li key={index}>{prediction}</li>
        ))}
      </ul>
    </div>
  );
}