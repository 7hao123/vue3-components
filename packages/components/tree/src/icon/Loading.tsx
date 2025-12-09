import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Loading',
  render() {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="48"
        height="48"
        viewBox="0 0 50 50"
      >
        <circle
          cx="25"
          cy="25"
          r="20"
          fill="none"
          stroke="#ddd"
          stroke-width="5"
        />
        <circle
          cx="25"
          cy="25"
          r="20"
          fill="none"
          stroke="currentColor"
          stroke-width="5"
          stroke-linecap="round"
          stroke-dasharray="31.4 125.6"
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            dur="1s"
            repeatCount="indefinite"
            from="0 25 25"
            to="360 25 25"
          />
        </circle>
      </svg>
    )
  }
})
