// /// <reference path="drag_drop_interfaces.ts" />
// /// <reference path="project_model.ts" />

import { ProjectInput } from "./components/project_input";
import { ProjectList } from "./components/project_list";

new ProjectInput();
new ProjectList("active");
new ProjectList("finished");

console.log("webpack-dev-server test");
