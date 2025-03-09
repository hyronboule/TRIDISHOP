import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { colorVar } from "../../style/colorVar.js";
import { Stack } from "@mui/material";
import { useUserContext } from "../../context/User.jsx";
import Swal from "sweetalert2";

const MenuICon = ({ icon, path, verifCo, logount, name }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { setToken, setInfoUser } = useUserContext();

  const onClick = () => {
    if (verifCo) {
      navigate("/login");
    } else {
      if (logount) {
        Swal.fire({
          text: "Voulez-vous vous déconnecté?",
          icon: "info",
          confirmButtonText: "Oui",
          cancelButtonText: "Annuler",
          showCancelButton: true,
          timer: 1500,
          showConfirmButton: true,
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire({
              text: "Vous avez été déconnecté",
              icon: "success",
              confirmButtonText: "Ok",
              timer: 1500,
              showConfirmButton: false,
            });
            navigate("/");
            setToken();
            setInfoUser({
              pseudo: "",
              email: "",
            });
          }
        });
      } else {
        navigate(path);
      }
    }
  };

  return (
    <>
      <div
        className="hoverLink"
        tabIndex={0}
        role="button"
        onClick={onClick}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onClick();
          }
        }}
      >
        <Stack flexDirection={"row"} alignItems={"center"} gap={1}>
          {React.createElement(icon, {
            sx: {
              color: pathname === path ? colorVar.backgroundPaleBlue : "white",
              height: "auto",
              fontSize: "23px",
            },
          })}
          <Stack
            className="nameNav"
            sx={
              pathname === path
                ? { color: colorVar.backgroundPaleBlue }
                : { color: "white" }
            }
          >
            {name}
          </Stack>
        </Stack>
      </div>
      {/* {shopNumberProduct > 0 && <Stack sx={{
                position: 'absolute',
                top: { xs: 20, sm: 58 }, right: { sm: 3 }, left: { xs: 50, sm: 'auto' },
                backgroundColor: 'red', color: 'white', padding: '2px 5px', borderRadius: '100%', fontSize: 10
            }}>{shopNumberProduct}</Stack>} */}
    </>
  );
};

export default MenuICon;
