import app from "./app";
import config from "./config";
import mongoose from "mongoose";

mongoose.connect(config.database.atlas || 'mongodb://127.0.0.1:27017/test')
    .then(() => {
        app.listen(config.general.port, () => {
            console.log(`Server running on port: ${config.general.port}`);
        });
    })
    .catch(err => console.log(err));