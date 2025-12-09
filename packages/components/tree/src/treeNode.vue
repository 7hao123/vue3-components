<template>
  <div :class="bem.b()">
    <div
      :class="bem.e('content')"
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
          <Switcher></Switcher>
        </z-icon>
      </span>
      <span>{{ node?.label }}</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { treeNodeEmits, treeNodeProps } from './tree'
import { createNamespace } from '@mine/utils/create'
import ZIcon from '@mine/components/icon'
import Switcher from './icon/Switcher'

const props = defineProps(treeNodeProps)
const emit = defineEmits(treeNodeEmits)
const bem = createNamespace('tree-node')
function handleExpand() {
  emit('toggle', props.node!)
}
</script>
