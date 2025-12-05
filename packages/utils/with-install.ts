import { Plugin } from "vue";
export type SFCWithInstall<T> = T & Plugin;
// 这里给一个泛型
export function withInstall<T>(component: T) {
  (component as SFCWithInstall<T>).install = function (app) {
    const { name } = component as { name: string };
    app.component(name, component); //将组件注册成全局的
  };
  return component as SFCWithInstall<T>;
}
