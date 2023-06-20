"use client";

import * as React from "react";

import { useSelector } from "react-redux";
import { selectCurrentIngredients, selectURLParams } from "@/redux/selectors";
import store, { RootState } from "@/redux/store";

import { Snackbar } from "@mui/material";

import Box from "@mui/joy/Box";
import ShareIcon from "@mui/icons-material/Share";
import SaveIcon from "@mui/icons-material/Save";
import Sheet from "@mui/joy/Sheet";
import IconButton from "@mui/joy/IconButton";
import Tooltip from "@mui/joy/Tooltip";
import { useTranslation } from "react-i18next";

const AppBar = () => {
  const [open, setOpen] = React.useState(false);
  const { t } = useTranslation();

  const params = useSelector((state: RootState) =>
    selectURLParams(state, "userRecipe")
  );
  function handleShareButtonClick() {
    const url = "https://amathjourney.com/api/yololo";

    const ingredients = selectCurrentIngredients(
      store.getState(),
      "userRecipe"
    );

    const valuesAndQuantities = ingredients.flatMap((ingredient) =>
      ingredient.quantities.map((quantity) => ({
        quantity: quantity.id,
        value: quantity.value,
      }))
    );
    const body = JSON.stringify({ valuesAndQuantities });

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: body,
    })
      .then((response) => response.json())
      .then((data) => {
        return data;
      })
      .catch((error) => {
        console.error(error);
      });
  }
  return (
    <Sheet
      variant="solid"
      color="primary"
      invertedColors
      sx={(theme) => ({
        width: "100%",
        height: "54px",
        ...theme.typography.h5,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 2,
      })}
    >
      Rate My Recipes
      <Box>
        <Tooltip title={t("appbar.share_link")}>
          <IconButton
            sx={{ mr: 1 }}
            onClick={() => {
              navigator.clipboard.writeText(
                `${window.location.origin}${window.location.pathname}?${params}`
              );
              setOpen(true);
            }}
          >
            <ShareIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title={t("appbar.save_recipe")}>
          <IconButton
            onClick={() => {
              handleShareButtonClick();
            }}
          >
            <SaveIcon />
          </IconButton>
        </Tooltip>
      </Box>
      <Snackbar
        open={open}
        autoHideDuration={5000}
        onClose={() => setOpen(false)}
        message={t("messages.copied")}
      />
    </Sheet>
  );
};

export default AppBar;
