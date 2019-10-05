import React, { useState, useMemo } from "react";
import api from "../../services/api";

import camera from "../../assets/camera.svg";

import("./styles.css");

export default function New({ history }) {
  const [thumbnail, setThumbnail] = useState(null);
  const [company, setCompany] = useState("");
  const [techs, setTechs] = useState("");
  const [price, setPrice] = useState("");

  const preview = useMemo(() => {
    return thumbnail ? URL.createObjectURL(thumbnail) : null;
  }, [thumbnail]);

  async function handleSubmit(e) {
    e.preventDefault();

    const data = new FormData();
    const user_id = localStorage.getItem("user");

    data.append("thumbnail", thumbnail);
    data.append("company", company);
    data.append("techs", techs);
    data.append("price", price);

    await api.post("/spots", data, {
      headers: { user_id }
    });

    history.push("/Dashboard");
  }

  return (
    <form onSubmit={handleSubmit}>
      <label
        id="thumbnail"
        style={{ backgroundImage: `url(${preview})` }}
        className={thumbnail ? "has-thumbnail" : ""}
      >
        <input type="file" onChange={e => setThumbnail(e.target.files[0])} />
        <img src={camera} alt="Camera" />
      </label>

      <label htmlFor="company">EMPRESA *</label>
      <input
        id="company"
        value={company}
        onChange={e => setCompany(e.target.value)}
        placeholder="Sua empresa incŕivel"
      />

      <label htmlFor="company">
        TECNOLOGIAS * <span>(separadas por vírgula)</span>
      </label>
      <input
        id="techs"
        value={techs}
        onChange={e => setTechs(e.target.value)}
        placeholder="Quais tecnologias usam?"
      />

      <label htmlFor="company">
        VALOR DA DIÁRIA * <span>(em branco para GRATUITO)</span>
      </label>
      <input
        id="price"
        value={price}
        onChange={e => setPrice(e.target.value)}
        placeholder="Valor cobrado por dia"
      />

      <button className="btn">Cadastrar</button>
    </form>
  );
}
