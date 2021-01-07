import { Linking } from "react-native";

const { default: ChangePassword } = require("../containers/ChangePassword");

const config = {
  screens: {
    ChangePassword: {

      path: "ChangePassword"
    },
    Profile: {
      path: "profile/:id"
    }

  }
}
const linking = {
  prefixes: ["demo://app"],
  config,

}
export default Linking