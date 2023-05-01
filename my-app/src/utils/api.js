import axios from "axios";

const handleError = (error) => {
  console.log(error);
};

const getProfile = async (username) => {
  try {
    const response = await axios.get(`https://api.github.com/users/${username}`);
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    handleError(error);
    throw Error(error);
  }
};

const getRepos = async (username) => {
  try {
    const response = await axios.get(`https://api.github.com/users/${username}/repos?per_page=100`);
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    handleError(error);
    throw Error(error);
  }
};

const getStarCount = (repos) => {
  return repos.reduce((acc, repo) => acc + repo.stargazers_count, 0);
};

const calculateScore = (profile, repos) => {
  const followers = profile.followers;
  const totalStars = getStarCount(repos);
  return followers * totalStars;
};

const getUserData = async (username) => {
  try {
    const [profile, repos] = await Promise.all([getProfile(username), getRepos(username)]);
    if (profile && repos) {
      return {
        profile,
        score: calculateScore(profile, repos),
      };
    }
  } catch (error) {
    handleError(error);
    throw Error(error);
  }
};

const sortPlayers = (players) => players.sort((a, b) => b.score - a.score);

export const battle = async (players) => {
  try {
    const battleResult = await Promise.all(players.map(getUserData));
    if (battleResult) {
      return sortPlayers(battleResult);
    }
  } catch (error) {
    handleError(error);
  }
};

export const fetchPopularRepos = (language) => {
  const url = window.encodeURI(`https://api.github.com/search/repositories?q=stars:>1+language:${language}&sort=stars&order=descr&type=Repositories`);
  return axios
    .get(url)
    .then((response) => response.data.items)
    .catch(handleError);
};
