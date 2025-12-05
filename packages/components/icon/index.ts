// 整合组件最终导出
import _Icon from "./src/icon.vue";
import { withInstall } from "@mine/utils/with-install";

const Icon = withInstall(_Icon);

export default Icon;

export * from "./src/icon";

// 用来给volar识别，不然不高亮显示
declare module "vue" {
  export interface GlobalComponents {
    ZIcon: typeof Icon;
  }
}
