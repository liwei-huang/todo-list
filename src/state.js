const state = {
  // 从 localStorage 取出 Todos 数据。
  todos: JSON.parse(localStorage["todos-mithril"] || "[]"),
  // 正在展示的 Todos。
  showing: null,
  // 未完成的 Todos 的数量。
  remaining: 0,
  // 依据完成状态分类后的 Todos。
  todosByStatus: [],

  dispatch: (action, args) => {
    // 将参数统一为数组类型。
    state[action].apply(state, args || []);
    // 浏览器在下次重绘之前存储 Todos 数据到 localStorage。
    requestAnimationFrame(() => {
      localStorage["todos-mithril"] = JSON.stringify(state.todos);
    });
  },

  // 创建一个新的 Todo。
  // 回车键的 keycode 是 13。
  createTodo(evt) {
    if (evt.keyCode !== 13 || !evt.target.value) return;
    const title = evt.target.value.trim();
    state.todos = state.todos.concat([{ title: title, completed: false, id: new Date().getTime() }]);
    evt.target.value = "";
  },

  // 更改 Todo 的完成状态。
  setStatus(todo, completed) {
    state.todos = state.todos.map((t) => {
      if (todo.id === t.id) {
        return { ...todo, completed: completed };
      }
      return t;
    });
  },

  // 清除指定的 Todo。
  destroy(todo) {
    if (state.todos.indexOf(todo) > -1) {
      state.todos = state.todos.filter((t) => todo.id !== t.id);
    }
  },

  // 更改所有 Todo 的完成状态。
  setAllStatuses(completed) {
    state.todos = state.todos.map((todo) => {
      return { ...todo, completed: completed };
    });
  },

  // 清除所有已完成的 Todo。
  clearCompleted() {
    state.todos = state.todos.filter((todo) => !todo.completed);
  },

  computed(vnode) {
    // m.route.Link 的 href 属性的值通过 vnode.attrs.status 访问。
    state.showing = vnode.attrs.status || "all";
    // 未完成的 Todos 数量。
    state.remaining = state.todos.filter((todo) => !todo.completed).length;
    // 分类显示 Todos。
    state.todosByStatus = state.todos.filter((todo) => {
      switch (state.showing) {
        case "all": return true;
        case "active": return !todo.completed;
        case "completed": return todo.completed;
        default: return true;
      }
    });
  }
};

export default state;