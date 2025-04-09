import { TailSpin } from "react-loader-spinner";
import "../../styles/Dialog.css"; // Add this line to include the CSS

const LoaderComp = () => {
  return (
    <div className="loader-backdrop">
      <div className="loader-container">
        <TailSpin
          height="80"
          width="80"
          color="#4fa94d"
          ariaLabel="tail-spin-loading"
          radius="1"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      </div>
    </div>
  );
};

export default LoaderComp;
