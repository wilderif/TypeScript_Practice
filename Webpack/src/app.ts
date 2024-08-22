// /// <reference path="drag_drop_interfaces.ts" />
// /// <reference path="project_model.ts" />

import { ProjectInput } from "./components/project_input.js";
import { ProjectList } from "./components/project_list.js";

new ProjectInput();
new ProjectList("active");
new ProjectList("finished");
