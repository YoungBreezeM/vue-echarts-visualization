import Vue from 'vue'
import Whole from './Graph.vue'
import store from '../../store'
import Http from "../../Http/http";
import index from "./router";
import VueAxios from 'vue-axios'
Vue.use(VueAxios,Http);
Vue.config.productionTip = false;


import {
  Menu,
  Icon,
  Alert,
  Table,
  Button,
  Submenu,
  Message,
  MenuItem,
  Dropdown,
  Cascader,
  MessageBox,
  TableColumn,
  DropdownMenu,
  DropdownItem,
  MenuItemGroup,
  Card,
  Notification,
  Row,
  Col,
  Dialog,
  Input,
} from 'element-ui';
Vue.use(Input);
Vue.use(Dialog);
Vue.use(Card);
Vue.use(Row);
Vue.use(Col);
Vue.use(Menu);
Vue.use(Icon);
Vue.use(Alert);
Vue.use(Table);
Vue.use(Button);
Vue.use(Submenu);
Vue.use(Cascader);
Vue.use(MenuItem);
Vue.use(Dropdown);
Vue.use(TableColumn);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
Vue.use(MenuItemGroup);
Vue.prototype.$message = Message;
Vue.prototype.$notify = Notification;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$prompt = MessageBox.prompt;
Vue.prototype.$confirm = MessageBox.confirm;

new Vue({
  store,
  router: index,
  render: h => h(Whole)
}).$mount('#whole')
