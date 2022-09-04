import { Init } from "./services/init";

try {
    Init();
} catch (err) {
    console.log(err);
    process.exit(1);
}

process.on("uncaughtException", err => {
    console.log("uncaughtException", err);
    process.exit(1);
})