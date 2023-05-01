import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { battle } from "../../utils/api";
import Player from "./Player";
import Loader from "../Loader";

const Results = () => {
  const location = useLocation();

  const [winnerScoreState, setWinnerScoreState] = useState();
  const [loserScoreState, setLoserScoreState] = useState();
  const [winnerInfoState, setWinnerInfoState] = useState();
  const [loserInfoState, setLoserInfoState] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(null);
  const params = new URLSearchParams(location.search);

  const getBattleResult = async () => {
    try {
      const players = await battle([params.get("playerOneName"), params.get("playerTwoName")]);

      console.log(players);
      if (players.length > 0) {
        setIsLoading(false);
        setWinnerScoreState(players[0].score);
        setLoserScoreState(players[1].score);
        setWinnerInfoState(players[0].profile);
        setLoserInfoState(players[1].profile);
      }
    } catch (error) {
      setIsError("Was an error. Check users!");
      throw Error(error);
    }
  };

  useEffect(() => {
    getBattleResult();
  }, []);

  return (
    <>
      {isError ? (
        <div>
          <p>{isError}</p>
          <Link className="reset" to="/battle">
            Reset
          </Link>
        </div>
      ) : (
        <>
          {" "}
          <div className="row">
            <h2>Results</h2>
            {!isLoading ? (
              <>
                <Player label="Winner" score={winnerScoreState} info={winnerInfoState} />
                <Player label="Loser" score={loserScoreState} info={loserInfoState} />
              </>
            ) : (
              <Loader />
            )}
          </div>
        </>
      )}
    </>
  );
};

export default Results;
