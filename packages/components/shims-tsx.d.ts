import type { DefineComponent } from 'vue'

declare module '*.tsx' {
  const component: DefineComponent<{}, {}, any>
  export default component
}
