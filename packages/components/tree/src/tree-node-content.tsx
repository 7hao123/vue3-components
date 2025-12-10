import { defineComponent, inject } from 'vue'
import { treeInjectKey, treeNodeContentProps } from './tree'
export default defineComponent({
  name: 'ZTreeNodeContent',
  props: treeNodeContentProps,
  setup(props, ctx) {
    const treeContext = inject(treeInjectKey)
    return () => {
      return treeContext?.slots.default
        ? treeContext.slots.default({ node: props.node })
        : props.node?.label
    }
  }
})
