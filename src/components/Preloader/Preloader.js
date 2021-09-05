import "./Preloader.css";

const Preloader = () => (
  <div className="preloader">
    <div className="preloader__item">
      <div className="lds-ring">
        <div />
        <div />
        <div />
        <div />
      </div>
    </div>
  </div>
);

export default Preloader;
