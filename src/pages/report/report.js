import Vue from 'vue'
import Report from "./Report.vue";
import index from "./router";
import store from '../../store'
import Http from "../../Http/http";
import VueAxios from 'vue-axios'

import {
  Input,
  Button,
  Backtop,
  PageHeader,
  Form,
  FormItem,
  InputNumber
} from 'element-ui';

Vue.use(InputNumber);
Vue.use(PageHeader);
Vue.use(Input);
Vue.use(Button);
Vue.use(Backtop);
Vue.use(FormItem);
Vue.use(Form);

Vue.use(VueAxios,Http);
Vue.config.productionTip = false;

new Vue({
  router: index,
  store,
  render: h => h(Report)
}).$mount('#report')