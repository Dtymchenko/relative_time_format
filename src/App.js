import "./App.css";
import React from "react";
import { intlFormatDistance } from "date-fns";

function App() {
  const [input, setInput] = React.useState(0);

  // const rtf = new Intl.RelativeTimeFormat("en", {
  //   numeric: "auto",
  //   style: "long",
  //   localeMatcher: "best fit",
  // });

  // console.log(rtf.format(-2, "day"));

  function getRelativeTimeString(date, lang = navigator.language) {
    const timeMs = typeof date === "number" ? date : date.getTime();

    const deltaSeconds = Math.round((timeMs - Date.now()) / 1000);

    const cutoffs = [
      60,
      3600,
      86400,
      86400 * 7,
      86400 * 30,
      86400 * 365,
      Infinity,
    ];

    const units = ["second", "minute", "hour", "day", "week", "month", "year"];

    const unitIndex = cutoffs.findIndex(
      (cutoff) => cutoff > Math.abs(deltaSeconds)
    );

    const divisor = unitIndex ? cutoffs[unitIndex - 1] : 1;

    const rtf = new Intl.RelativeTimeFormat(lang, { numeric: "auto" });

    return rtf.format(Math.floor(deltaSeconds / divisor), units[unitIndex]);
  }

  return (
    <div>
      <label htmlFor="input-id">Enter date</label>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        type="date"
        id="input-id"
        name="name"
      ></input>
      <div>
        How the hand-made function works:{" "}
        {input ? getRelativeTimeString(new Date(input), "en") : null}
      </div>
      <div>
        How the intlFormatDistance works:{" "}
        {input
          ? intlFormatDistance(new Date(input), Date.now(), { locale: "en" })
          : null}
      </div>
    </div>
  );
}

export default App;
