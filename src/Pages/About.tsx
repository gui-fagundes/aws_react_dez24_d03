
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="mt-32 flex flex-col">
      <div className="bg-[url(/src/assets/profile_banner.jpg)] bg-no-repeat bg-cover h-50">
        <img
          src="https://avatars.githubusercontent.com/u/182035274?v=4"
          className="flex w-3xs rounded-full border-2 border-bl-900 relative left-[63%] mx-10"
        ></img>
      </div>
      <div className="bg-w-200 px-30 flex flex-col gap-3 py-10">
        <h1 className="max-w-120 font-inter font-bold text-h3 text-bl-900">OutSider</h1>
        <p className="max-w-120 font-inter font-medium text-p1 text-bl-800">
          Hey there 👋 I'm Guilherme! Web developer since 2025, Passionate
          about crafting user experiences and transforming ideas into polished
          products.
        </p>

        <div>
        <span className="flex gap-10 min-w-fit text-lg place-self-center">
                <Link to="https://github.com/gui-fagundes"  className=""><img src="/src/icons/Github.png"></img></Link>
                <Link to="https://www.linkedin.com/in/guilherme-lemos-180174262/"  className=""><img src="/src/icons/linkedIn.png" className="w-6 h-6"></img></Link>
              </span>
        </div>
      </div>
    </div>
  );
};

export default About;
