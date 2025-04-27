import { HeaderContainer } from "./steles";
import logoIgnite from "../../assets/logo-ignite.svg";
import { Scroll, Timer } from "phosphor-react";
import { NavLink } from "react-router-dom";

export function Header() {
  return (
    <HeaderContainer>
      <img src={logoIgnite} alt="" />
      <nav>
        <NavLink to={"/"} title="Timer">
          <Timer size={24} />
        </NavLink>
        <NavLink to={"/history"} title="Hist[orico">
          <Scroll size={24} />
        </NavLink>
      </nav>
    </HeaderContainer>
  );
}
