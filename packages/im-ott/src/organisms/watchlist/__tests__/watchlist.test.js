import ReactDOM from "react-dom";
import Watchlist from "../Watchlist";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<Watchlist />, div);
});
