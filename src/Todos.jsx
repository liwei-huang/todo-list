// 使用 JSX 语法，就必须导入 mithril。
// Mithril.js 的 JSX 语法与  React 的 JSX 有轻微不同，主要表现在：
// 1. className 写为 class；htmlFor 写为 for。
// 2. 事件名都小写，比如，onClick 写为 onclick。
import m from "mithril";
import state from './state.js';

import "metro4-dist/css/metro-all.min.css";
import "metro4-dist/js/metro.min.js";

import TodoItem from "./TodoItem.jsx";
import TodoStatistics from "./Todostatistics.jsx";

const Todos = {
  // 在组件初始化和组件更新之前时，执行 state.computed 方法，重新获取计算值。
  oninit: state.computed,
  // 虽然官方文档声明尽量不要使用 onbeforeupdate，但是不用它，组件不能渲染最新的 Todos 数据，
  // 我不知问题出在哪里，换成 onupdate 也不行，只好用 onbeforeupdate 了。
  onbeforeupdate: state.computed,

  view() {
    return (
      <div class="container">
        <header class="d-flex flex-column flex-align-center">
          <h1 class="display4 fg-red">Todos</h1>
          <input
            type="text"
            placeholder="需要做些什么？"
            id="new-todo"
            class="mw-50-md"
            autofocus="autofocus"
            onkeypress={(evt) => state.dispatch("createTodo", [evt])}
            data-role="input"
            data-prepend="待办项："
          />
        </header>
        {/* Todos 为空，则不渲染 section。 */}
        <section class={state.todos.length === 0 ? "d-none" : "mt-10 card"}>
          <div class="card-header">
            {/* 当有未完成的 Todo 时，state.remaining !== 0 为 true， */}
            {/* 选中 checbox，则所有 Todo 的 completed 设置为 true，表示已完成。 */}
            <input
              type="checkbox"
              id="toggle-all"
              checked={state.remaining === 0}
              onclick={() => state.dispatch("setAllStatuses", [state.remaining !== 0])}
              data-role="checkbox"
              data-caption="标记所有列表项为已完成"
            />
          </div>
          <div class="card-content p-2">
            <TodoItem state={state} />
          </div>
          {/* 我发现，Mithril.js 的 m.fragment() （片段元素）好像不支持 JSX 语法， */}
          {/* 所以我把 div 容器写在 TodoStatistics 组件里面，并指定类名为 card-footer，以确保布局正常。 */}
          {state.todos.length ? (
            <TodoStatistics state={state} containerClass="card-footer" />
          ) : null}
        </section>
      </div>
    );
  }
};

export default Todos;