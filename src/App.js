import "./App.css";
// React
import { useEffect, useState } from "react";

// mui component

import { createTheme, ThemeProvider } from "@mui/material";
import Container from "@mui/material/Container";
import CloudIcon from "@mui/icons-material/Cloud";
import { Button } from "@mui/material";

//Laibarais
import "./i18n";
import { useTranslation } from "react-i18next";
import moment from "moment";
import "moment/min/locales";

//Readux
import { useSelector, useDispatch } from "react-redux";
import { fetchWither } from "./witherApiSlice";

const theme = createTheme({
  typography: {
    fontFamily: ["IBM"],
  },
});
function App() {
  //Readux
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.weatherApi.isLoading);
  const temp = useSelector((state) => state.weatherApi.weather);

  console.log("The response is =====================", temp);
  console.log(temp);

  const { t, i18n } = useTranslation();

  // states
  const [local, setlocal] = useState("ar");
  const [dateAndTime, setDateAndTime] = useState("");

  // direction
  const direction = local == "ar" ? "rtl" : "ltr";

  //events handelers
  function handelTranstionCilcked() {
    if (local == "en") {
      setlocal("ar");
      i18n.changeLanguage("ar");
      moment.locale("ar");
    } else {
      setlocal("en");
      i18n.changeLanguage("en");
      moment.locale("en");
    }
    setDateAndTime(moment().format("LLLL"));
  }
  useEffect(() => {
    console.log("dispatching fetch weather from the component");
    dispatch(fetchWither());
    i18n.changeLanguage(local);
    setDateAndTime(moment().format("LLLL"));
  }, []);

  //;
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <div
          style={{
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Container maxWidth="sm">
            {/* Card */}
            <div
              style={{
                backgroundColor: "rgb(28 52 91 / 36% )",
                width: "100%",
                color: "white",
                borderRadius: "10px",
                padding: "15px",
                boxShadow: "0 10px 10px rgba(0,0,0,0.5)",
              }}
            >
              {/* Card Header */}
              <div
                style={{ display: "flex", alignItems: "end", gap: "15px" }}
                dir={direction}
              >
                <div style={{ fontSize: "51px", fontWeight: "bold" }}>
                  {t("Portsudan")}
                </div>
                <div>{dateAndTime}</div>
              </div>
              {/* Card Header */}
              <hr />
              {/* Card Body */}
              <div
                dir={direction}
                style={{
                  margin: "0 20px",
                  display: "flex",
                  justifyContent: "space-around",
                }}
              >
                {/* temp */}
                <div style={{ position: "relative" }}>
                  <div
                    style={{
                      background: "#0a47a6",
                      position: "absolute",
                      top: "0",
                      left: "0",
                      height: "100%",
                      width: "100%",
                      display: isLoading ? "flex" : "none",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <span class="loader"></span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <div
                      style={{
                        marginBottom: "5px",
                        fontSize: "65px",
                        marginTop: "20px",
                      }}
                    >
                      {temp.number}
                    </div>
                    <img src={temp.icon} alt="Weather Status" />
                    {/* diescription icon */}
                  </div>
                  <div>{t(temp.description)}</div>
                  {/* min && max */}
                  <div style={{ display: "flex", gap: "5px" }}>
                    <h5>
                      {t("min")}: {temp.min}
                    </h5>
                    <h5>|</h5>
                    <h5>
                      {t("max")}: {temp.max}
                    </h5>
                  </div>
                </div>
                {/* temp */}
                {/* icon */}
                <div>
                  <CloudIcon style={{ fontSize: "200px", color: "white" }} />
                </div>
                {/* icon */}
              </div>
              {/* Card Body */}
              <div dir={direction}>
                <Button variant="contained" onClick={handelTranstionCilcked}>
                  {local == "en" ? "العربية" : "English"}
                </Button>
              </div>
            </div>
            {/* Card */}
          </Container>
        </div>
      </ThemeProvider>
    </div>
  );
}

export default App;
