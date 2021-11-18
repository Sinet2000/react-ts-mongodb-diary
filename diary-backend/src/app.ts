import { Request, Response } from "express";
import connect from "./utils/connect";
import config from "config";
import logger from "./utils/logger";
import responseTime from "response-time";
import { restResponseTimeHistogram, startMetricsServer } from "./utils/metrics";
import swaggerDocs from "./utils/swagger";
import createServer from "./utils/server";

const PORT = config.get("port") as number;
const db = config.get("dbConnString") as string

const app = createServer();

app.use(
  responseTime((req: Request, res: Response, time: number) => {
    if (req?.route?.path) {
      restResponseTimeHistogram.observe(
        {
          method: req.method,
          route: req.route.path,
          status_code: res.statusCode,
        },
        time * 1000
      );
    }
  })
);

app.listen(PORT, async () => {
  logger.info(`App is running at http://localhost:${PORT}`);

  await connect({db});

  startMetricsServer();

  swaggerDocs(app, PORT);
});