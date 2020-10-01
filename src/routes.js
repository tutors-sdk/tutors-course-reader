// Components
import Blank from "./routes/Blank.svelte";
import Course from "./routes/Course.svelte";
import Topic from "./routes/Topic.svelte";
import Talk from "./routes/Talk.svelte";
import NotFound from "./routes/NotFound.svelte";

export default {
  "/": Blank,
  "/course/*": Course,
  "/topic/*": Topic,
  "/talk/*": Talk,
  "*": NotFound,
};
