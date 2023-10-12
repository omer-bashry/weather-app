import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchWither = createAsyncThunk(
  "weatherApi/fetchingWeather",
  async () => {
    console.log("calling fetch weather");
    const response = await axios.get(
      "https://api.openweathermap.org/data/2.5/weather?lat=19.61745&lon=37.21644&appid=b7aab8c15600171ef2ea4afb601a0935"
    );
    console.log("The response is =========", response);
    const number = Math.round(response.data.main.temp - 272.15);
    const min = Math.round(response.data.main.temp_min - 272.15);
    const max = Math.round(response.data.main.temp_max - 272.15);
    const description = response.data.weather[0].description;
    const icon = `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`;

    return { number, min, max, description, icon };
  }
);

export const witherSlice = createSlice({
  name: "witherApi",
  initialState: {
    result: "empty",
    weather: {
      number: 0, // Default value for number
      min: 0, // Default value for min
      max: 0, // Default value for max
      description: "",
      icon: "",
    },
    isLoading: false,
  },
  reducers: {
    changeWither: (currentState, action) => {
      currentState.result = "changed";
    },
  },

  extraReducers(builder) {
    builder
      .addCase(fetchWither.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchWither.fulfilled, (state, action) => {
        state.isLoading = false;
        state.weather = action.payload;
      });
  },
});

export const { changeWither } = witherSlice.actions;
export default witherSlice.reducer;

// "https://api.openweathermap.org/data/2.5/weather?lat=19.61745&lon=37.21644&appid=b7aab8c15600171ef2ea4afb601a0935"
