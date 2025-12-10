<template>
  <div
    :class="[
      bem.b(),
      bem.is('selected', isSelected),
      bem.is('disabled', node?.disabled)
    ]"
  >
    <div
      :class="[bem.e('content')]"
      :style="{ paddingLeft: node!.level * 16 + 'px' }"
    >
      <span
        :class="[
          bem.e('expand-icon'),
          { expanded: expanded && !node?.isLeaf },
          bem.is('leaf', node?.isLeaf)
        ]"
        @click="handleExpand"
      >
        <z-icon size="25">
          <Switcher v-if="!isLoading"></Switcher>
          <Loading v-else></Loading>
        </z-icon>
      </span>
      <span @click="handleSelected" :class="bem.e('label')">
        <z-tree-node-content :node="node"></z-tree-node-content>
        <!-- {{ node?.label }} {{ treeContext?.slots.default!({ node }) }} -->
      </span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { treeInjectKey, treeNodeEmits, treeNodeProps } from './tree'
import { createNamespace } from '@mine/utils/create'
import ZIcon from '@mine/components/icon'
import Switcher from './icon/Switcher'
import Loading from './icon/Loading'
import ZTreeNodeContent from './tree-node-content'
import { computed, inject } from 'vue'

const props = defineProps(treeNodeProps)
const emit = defineEmits(treeNodeEmits)
const bem = createNamespace('tree-node')
function handleExpand() {
  emit('toggle', props.node!)
}

const isLoading = computed(() => {
  return props.loadingKeys?.has(props.node!.key)
})

const isSelected = computed(() => {
  return props.selectedKeys?.includes(props.node!.key)
})
function handleSelected() {
  if (props.node?.disabled) return
  emit('select', props.node!)
}

const treeContext = inject(treeInjectKey)
// 这是一个虚拟节点
// console.log(treeContext.slots.default({props.node}))
</script>
