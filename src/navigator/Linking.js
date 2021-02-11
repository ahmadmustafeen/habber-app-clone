

const { default: ResetPassword } = require("../containers/ResetPassword");
const { default: BookDetails } = require("../containers/BookDetails");

const config = {
  screens: {
    ResetPassword: {

      path: "ResetPassword/:token",
      parse: {
        token: (token) => `${token}`,
      },
    },
    BookDetails: {

      path: "BookDetails/:id/:product_type",
      parse: {
        id: (id) => `${id}`,
        product_type: (product_type) => `${product_type}`,
      },

    },

  }
}
const Linking = {
  prefixes: ["hebber://", "https://hebber.com"],
  config,

}
export default Linking