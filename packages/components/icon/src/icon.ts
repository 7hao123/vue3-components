// 这里放   组件相关的属性  和   ts的类型
import { ExtractPropTypes, PropType } from "vue";
// as const 设置只读
export const iconProps = {
  color: String,
  size: [Number, String] as PropType<number | string>,
} as const;

export type IconProps = ExtractPropTypes<typeof iconProps>;
