import _Tree from './src/tree.vue'
import { withInstall } from '@mine/utils/with-install'

const Tree = withInstall(_Tree)
export default Tree

declare module 'vue' {
  export interface GlobalComponents {
    ZTree: typeof Tree
  }
}
