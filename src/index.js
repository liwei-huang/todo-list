import m from "mithril";
import Todos from "./Todos.jsx";

m.route(document.getElementById("app"), "/", {
  "/": Todos,
  "/:status": Todos
});