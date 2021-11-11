import mongoose from 'mongoose';
import log from './logger';

type TInput = {
  db: string;
}
export default ({db}: TInput) => {
  
  const connect = () => {
    mongoose
      .connect(db)
      .then(() => {
        log.info("Connected to database");
      })
      .catch(error => {
        log.error("db error", error);
        process.exit(1);
      });
  };
  connect();

  mongoose.connection.on('disconnected', connect);
};