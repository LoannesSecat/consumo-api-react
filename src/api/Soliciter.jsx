const Soliciter = async (request) => {
  return fetch(request)
    .then((res) => res.json())
    .then((data) => data)
    .catch((err) => console.log(`Error in Soliciter.jsx - ${err}`));
};

export default Soliciter;
