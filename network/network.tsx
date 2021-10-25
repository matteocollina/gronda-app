import Creation from "../model/Creation";

const JSON_DATA = require("./api.json");
export const getData = () : Creation[] => {
    return JSON_DATA["data"];
}