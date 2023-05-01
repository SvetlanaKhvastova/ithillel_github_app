import React, { useState, useEffect } from "react";
import { fetchPopularRepos } from "../../utils/api";
import Repos from "./Repos";
import Languages from "./Languages";
import Loader from "../Loader";
import { useSearchParams, useLocation } from "react-router-dom";

const languages = ["All", "Javascript", "Ruby", "Java", "CSS", "Python"];

const Popular = () => {
  const [searchParams, setSearchParams] = useSearchParams("All");
  const [repos, setRepos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();

  const langQuery = searchParams.get("languages") || "";

  useEffect(() => {
    if (!langQuery) {
      setSearchParams({
        languages: "All",
      });
    }
  }, []);

  // console.log(searchParams, `searchParams`);
  // console.log(location, `location.search`);

  useEffect(() => {
    fetchPopularRepos(searchParams).then((data) => {
      {
        setRepos(data);
      }
    });

    // setSearchParams({
    //   languages: langQuery,
    // });
  }, [location.search]);

  return (
    <div>
      <Languages languages={languages} searchParams={langQuery} setSearchParams={setSearchParams} />

      {repos.length !== 0 ? <Repos repositories={repos} /> : <Loader />}
    </div>
  );
};

export default Popular;
