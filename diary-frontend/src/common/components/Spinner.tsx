import Loader from "react-loader-spinner";

export const Spinner = () => {
  return (
    <div style={{ textAlign: "center" }}>
      <Loader type="Puff" color="#00BFFF" height={100} width={100} />
    </div>
  );
};