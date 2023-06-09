import React from "react";

const PlayerPreview = ({ avatar, username, children }) => {
  return (
    <div>
      <div className="column">
        <img className="avatar" src={avatar} alt="Avatar" />
        <h2 className="username">@{username}</h2>
      </div>
      {children}
    </div>
  );
};

export default PlayerPreview;
