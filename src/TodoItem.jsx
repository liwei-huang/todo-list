import m from "mithril";

const TodoItem = {
  view(vnode) {
    const { state } = vnode.attrs;
    return (
      <ul class="items-list">
        {state.todosByStatus.map((todo) => (
          <li class={"item" + (todo.completed ? " selected" : "")} key={todo.id}>
            <div class="d-flex flex-justify-between flex-align-center">
              {/* 选中 checkbox，切换（取反）对应 Todo 的完成状态。 */}
              <input
                type="checkbox"
                checked={todo.completed}
                onclick={() => state.dispatch("setStatus", [todo, !todo.completed])}
                data-role="checkbox"
              />
              {/* mt-0 类用来清除 p 元素自带的上外边距，以保证 p 元素竖直对齐。 */}
              <p class="mt-0">{todo.title}</p>
              <button type="button" class="button" onclick={() => state.dispatch("destroy", [todo])}>
                <span class="mif-cross"></span>
                <span class="ml-2">移除</span>
              </button>
            </div>
          </li>
        ))}
      </ul>
    );
  }
};

export default TodoItem;