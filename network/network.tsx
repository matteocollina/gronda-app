const JSON_DATA = require("./api.json");
export const getData = () : any[] => {
    return JSON_DATA["data"];
}