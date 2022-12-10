import routing from "./routing";

const urls ={
  language: "/" + routing.language,
  home: "/" + routing.home,
  journal: "/" + routing.journal,
  paymentMethods: "/" + routing.paymentMethods,
  shopMethods: "/" + routing.shopMethods,
  receipt: "/" + routing.receipt,
  expenseEdit: "/" + routing.expenseEdit,
  incomeEdit: "/" + routing.incomeEdit,
  warehouse: "/" + routing.warehouse,
  addProduct: "/" + routing.addProduct,
  editProduct: "/" + routing.editProduct,
  settings: "/" + routing.settings,
  unauthorized: "/" + routing.unauthorized,
  report: "/" + routing.report,
  help: "/" + routing.help, //about component
  login: "/" + routing.login,
  register: "/" + routing.register,
}

export default urls;
