import feathers from "feathers"

import middleware from "./middleware"
import servicesV1 from "./services/v1"

const app = feathers()

app.configure(middleware)
app.configure(servicesV1)

app.listen(3030)
