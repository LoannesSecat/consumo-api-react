const Soliciter = async (request) => {
  return fetch(request)
    .then((res) => res.json())
    .catch((err) => console.warn(err));
};

export default Soliciter;
