import m from "mithril";

const TodoStatistics = {
  view(vnode) {
    const { state, containerClass } = vnode.attrs;
    return (
      <div class={containerClass}>
        <button type="button" class="image-button m-1">
          <span class="mif-list icon"></span>
          <span class="ml-2 caption">待办项</span>
          <span class="badge bg-red fg-white">{state.remaining}</span>
        </button>
        <ul class="h-menu">
          {/* m.route.Link 的 href 属性的值通过 vnode.attrs.status 访问， */}
          {/* 点击 m.route.Link，切换到对应的路由。 */}
          {/* state.showing 改变，state.todosByStatus 就改变，以实现分类显示 Todos 的功能。 */}
          <li class="mr-4">
            <m.route.Link href="/all" class={state.showing === "all" ? "bg-red fg-white" : ""}>所有</m.route.Link>
          </li>
          <li class="mr-4">
            <m.route.Link href="/active" class={state.showing === "active" ? "bg-red fg-white" : ""}>未完成</m.route.Link>
          </li>
          <li class="mr-4">
            <m.route.Link href="/completed" class={state.showing === "completed" ? "bg-red fg-white" : ""}>已完成</m.route.Link>
          </li>
        </ul>
        <button type="button" class="button outline alert" onclick={() => state.dispatch("clearCompleted")}>移除已完成</button>
      </div>
    );
  }
};

export default TodoStatistics;