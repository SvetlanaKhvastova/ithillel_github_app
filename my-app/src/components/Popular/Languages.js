import React from "react";

const Languages = ({ languages, searchParams, setSearchParams }) => {
  console.log("languages", languages);
  console.log("searchParams", searchParams);

  return (
    <ul className="languages">
      {languages.map((language, idx) => {
        return (
          <li key={idx} style={{ color: language === searchParams ? "#d0021b" : "#000000" }} onClick={() => setSearchParams(language)}>
            {language}
          </li>
        );
      })}
    </ul>
  );
};

export default Languages;
