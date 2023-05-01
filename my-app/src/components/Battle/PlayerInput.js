import React, { useState } from "react";

const PlayerInput = ({ id, label, onSubmit }) => {
  const [userName, setUserName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(id, userName);
  };

  return (
    <form className="column" onSubmit={handleSubmit}>
      <label className="header" htmlFor="username">
        {label}
      </label>
      <input
        type="text"
        id="username"
        placeholder="Github Username"
        value={userName}
        autoComplete="off"
        onChange={(event) => {
          setUserName(event.target.value);
        }}
      />
      <button className="button" type="submit" disabled={!userName}>
        Submit
      </button>
    </form>
  );
};

export default PlayerInput;
