import { configure } from "@storybook/react";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faCog,
  faBook,
  faStickyNote,
  faPlus
} from "@fortawesome/free-solid-svg-icons";
library.add(faCog, faBook, faStickyNote, faPlus);
import "../src/index.css";

configure(() => {
  const req = require.context("../src/components", true, /.stories.js$/);
  req.keys().forEach(filename => req(filename));
}, module);
