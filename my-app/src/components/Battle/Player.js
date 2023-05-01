import React from "react";
import PlayerPreview from "./PlayerPreview";

const Player = ({ label, score, info }) => {
  return (
    <div>
      <h1 className="header">{label}</h1>
      <h3 style={{ textAlign: "center" }}>Score: {score}</h3>

      {info && (
        <PlayerPreview username={info.login} avatar={info.avatar_url}>
          <ul className="space-list-items">
            {info.name && <li>{info.name}</li>}
            {info.location && <li>{info.location}</li>}
            {info.company && <li>{info.company}</li>}
            <li>Followers: {info.followers}</li>
            <li>Following: {info.following}</li>
            <li>Public Repos: {info.public_repos}</li>
            {info.blog && (
              <li>
                <a href={info.blog}>{info.blog}</a>
              </li>
            )}
          </ul>
        </PlayerPreview>
      )}
    </div>
  );
};

export default Player;
