import { Button, Stack } from "@mui/material";
import React, { useEffect } from "react";
import { useThemeContext } from "../../../Components/db/Theme/ThemeContext";
import PublishedWithChangesIcon from "@mui/icons-material/PublishedWithChanges";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import PlaylistAddCheckIcon from "@mui/icons-material/PlaylistAddCheck";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import BlockOutlinedIcon from "@mui/icons-material/BlockOutlined";
import { BsFillCartCheckFill } from "react-icons/bs";
import { FaUserTimes } from "react-icons/fa";
import {
  changeOrderStatus,
  getOrderStatuses,
} from "../../../Components/db/Redux/api/OrderSlice";
import { useDispatch, useSelector } from "react-redux";
import PrintIcon from "@mui/icons-material/Print";

const OrderButtons = ({ data }) => {
  const { mode } = useThemeContext();
  const orderStatuses = useSelector((state) => state.order.orderStasuses);
  const dispatch = useDispatch();
  console.log(orderStatuses);
  useEffect(() => {
    dispatch(getOrderStatuses());
  }, [dispatch]);
  const handleChangeOrderStatus = (id) => {
    const body = {
      orderId: data?.id,
      newStatusId: id,
    };
    console.log(body);

    dispatch(changeOrderStatus(body));
  };

  const handlePrint = () => {
    const elementsToHide = document.querySelectorAll(".print-block");

    // Hide all elements before printing
    elementsToHide.forEach((el) => {
      el.style.display = "none";
    });

    window.print();

    // Show all elements back after printing
    elementsToHide.forEach((el) => {
      el.style.display = "";
    });
  };
  // const handlePrint = () => {
  //   const printBlock = document.querySelector(".print-block");
  //   printBlock.style.display = "none"; // Hide the block before printing

  //   window.print();

  //   printBlock.style.display = "block"; // Show it back after printing
  // };
  return (
    <Stack direction="row" spacing={1} className="print-block">
      {orderStatuses?.map((btn) => (
        <Button
          key={btn.id}
          variant="outlined"
          sx={{
            height: 40,
            textTransform: "revert",
            fontWeight: 400,
            fontFamily: "Montserrat",
            fontSize: 15,
            p: 1,
            color:
              mode === "dark"
                ? "#fff"
                : data?.orderStatusDetails?.id === btn.id
                ? "#fff"
                : "#00B69B",
            borderColor: mode === "dark" ? "#00B69B" : "inherit",
            bgcolor:
              data?.orderStatusDetails?.id === btn.id
                ? "#00B69B"
                : "transparent",
            "&:hover": {
              color: "#000",
              bgcolor:
                btn.nameTm === "Amala aşyrylýar"
                  ? "#FDE047"
                  : btn.nameTm === "Barlagda"
                  ? "#DFDFDF"
                  : btn.nameTm === "Eltip berilen"
                  ? "#86EFAC"
                  : btn.nameTm === "Kabul edilen"
                  ? "#93C5FD"
                  : btn.nameTm === "Yzyna gaýtarylan"
                  ? "#FCA5A5"
                  : "",
            },
          }}
          onClick={() => handleChangeOrderStatus(btn.id)}
        >
          {btn.nameTm === "Amala aşyrylýar" ? (
            <PublishedWithChangesIcon sx={{ mr: 1 }} />
          ) : btn.nameTm === "Barlagda" ? (
            <HourglassEmptyIcon sx={{ mr: 1 }} />
          ) : btn.nameTm === "Eltip berilen" ? (
            <BsFillCartCheckFill style={{ marginRight: "10px" }} size={23} />
          ) : btn.nameTm === "Kabul edilen" ? (
            <PlaylistAddCheckIcon sx={{ mr: 1 }} />
          ) : btn.nameTm === "Yzyna gaýtarylan" ? (
            <HighlightOffIcon sx={{ mr: 1 }} />
          ) : (
            ""
          )}
          {btn.nameTm}
        </Button>
      ))}
      <Button
        variant="outlined"
        sx={{
          height: 40,
          textTransform: "revert",
          fontWeight: 400,
          fontFamily: "Montserrat",
          fontSize: 15,
          p: 1,
          color: mode === "dark" ? "#fff" : "#00B69B",
          borderColor: mode === "dark" ? "#00B69B" : "inherit",
          bgcolor: "transparent",
          "&:hover": {
            color: "#000",
            bgcolor: "#FCA5A5",
          },
        }}
      >
        <FaUserTimes style={{ marginRight: "10px" }} size={23} />
        Bloklamak
      </Button>
      <Button
        variant="outlined"
        sx={{
          height: 40,
          textTransform: "revert",
          fontWeight: 400,
          fontFamily: "Montserrat",
          fontSize: 15,
          p: 1,
          color: mode === "dark" ? "#fff" : "#00B69B",
          borderColor: mode === "dark" ? "#00B69B" : "inherit",
          bgcolor: "transparent",
          "&:hover": {
            color: "#000",
            bgcolor: "#86EFAC",
          },
        }}
        onClick={() => window.print()}
      >
        <PrintIcon style={{ marginRight: "10px" }} />
        Çek çap et
      </Button>
    </Stack>
  );
};

export default OrderButtons;
