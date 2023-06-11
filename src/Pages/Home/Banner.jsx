import one from "../../images/gaming.jpg";
import two from "../../images/hard.jpg";
import three from "../../images/Clotins.jpg";

function Banner() {
  return (
    <div className="mx-auto container flex gap-[30px] flex-col lg:flex-row py-16">
      <div className="lg:w-2/3 h-[430px] relative">
        <img
          src={one}
          alt="banner"
          style={{ width: "100%", height: "100%" }}
          className=" object-cover brightness-50 "
        />
        <div className="absolute top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%] hidden py-5 text-center text-white md:block">
          <h2 className="text-xl font-semibold">Gaming accessoriess</h2>
          <p className="my-5">
            Some representative placeholder content for the first slide.
          </p>
          <button className="btn text-dark bg-gold px-5 py-3">Shop</button>
        </div>
      </div>
      <div className=" lg:w-1/3  ">
        <div className="h-[200px] mb-[30px] relative">
          <img
            src={two}
            alt="banner"
            style={{ width: "100%", height: "100%" }}
            className=" object-cover brightness-50 "
          />
          <div className="absolute top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%] hidden py-5 text-center text-white md:block">
            <h2 className="text-xl font-semibold">HardWare</h2>
            <p className="my-5">Some representative placeholder</p>
            <button className="btn text-dark bg-gold px-3 py-1">Shop</button>
          </div>
        </div>
        <div className="h-[200px] mb-[30px] relative">
          <img
            src={three}
            alt="banner"
            style={{ width: "100%", height: "100%" }}
            className=" object-cover brightness-50 "
          />
          <div className="absolute top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%] hidden py-5 text-center text-white md:block">
            <h2 className="text-xl font-semibold">Clothes</h2>
            <p className="my-5">Some representative placeholder</p>
            <button className="btn text-dark bg-gold px-3 py-1">Shop</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Banner;
