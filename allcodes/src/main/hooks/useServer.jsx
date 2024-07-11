
const useServer = () => {
  return import.meta.env.VITE_SERVER;
};

export default useServer;
