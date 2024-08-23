(() => {
  "use strict";
  class e {
    constructor(e, t, n, r) {
      (this.templateElement = document.getElementById(e)),
        (this.hostElement = document.getElementById(t));
      const s = document.importNode(this.templateElement.content, !0);
      (this.element = s.firstElementChild),
        r && (this.element.id = r),
        this.attatch(n);
    }
    attatch(e) {
      this.hostElement.insertAdjacentElement(
        e ? "afterbegin" : "beforeend",
        this.element
      );
    }
  }
  function t(e) {
    let t = !0;
    return (
      e.required && (t = t && 0 !== e.value.toString().trim().length),
      null != e.minLength &&
        "string" == typeof e.value &&
        (t = t && e.value.length >= e.minLength),
      e.maxLength &&
        "string" == typeof e.value &&
        (t = t && e.value.length <= e.maxLength),
      null != e.min &&
        "number" == typeof e.value &&
        (t = t && e.value >= e.min),
      null != e.max &&
        "number" == typeof e.value &&
        (t = t && e.value <= e.max),
      t
    );
  }
  function n(e, t, n) {
    const r = n.value;
    return {
      configurable: !0,
      get() {
        return r.bind(this);
      },
    };
  }
  var r;
  !(function (e) {
    (e[(e.Active = 0)] = "Active"), (e[(e.Finished = 1)] = "Finished");
  })(r || (r = {}));
  class s {
    constructor(e, t, n, r, s) {
      (this.id = e),
        (this.title = t),
        (this.description = n),
        (this.people = r),
        (this.status = s);
    }
  }
  class i {
    constructor() {
      this.listeners = [];
    }
    addListener(e) {
      this.listeners.push(e);
    }
  }
  class l extends i {
    constructor() {
      super(), (this.projects = []);
    }
    static getInstance() {
      return this.instance || (this.instance = new l()), this.instance;
    }
    addProject(e, t, n) {
      const i = new s(Math.random().toString(), e, t, n, r.Active);
      this.projects.push(i), this.updateListeners();
    }
    moveProject(e, t) {
      const n = this.projects.find((t) => t.id === e);
      n && n.status !== t && ((n.status = t), this.updateListeners());
    }
    updateListeners() {
      for (const e of this.listeners) e(this.projects.slice());
    }
  }
  const o = l.getInstance();
  class a extends e {
    constructor() {
      super("project-input", "app", !0, "user-input"),
        (this.titleInputElement = this.element.querySelector("#title")),
        (this.descriptionInputElement =
          this.element.querySelector("#description")),
        (this.peopleInputElement = this.element.querySelector("#people")),
        this.configure();
    }
    configure() {
      this.element.addEventListener("submit", this.submitHandler);
    }
    renderContent() {}
    getherUserInput() {
      const e = this.titleInputElement.value,
        n = this.descriptionInputElement.value,
        r = this.peopleInputElement.value,
        s = { value: n, required: !0, minLength: 5 },
        i = { value: +r, required: !0, min: 1, max: 5 };
      if (t({ value: e, required: !0 }) && t(s) && t(i)) return [e, n, +r];
      alert("Invalid input, please try again!");
    }
    clearInputs() {
      (this.titleInputElement.value = ""),
        (this.descriptionInputElement.value = ""),
        (this.peopleInputElement.value = "");
    }
    submitHandler(e) {
      e.preventDefault();
      const t = this.getherUserInput();
      if (Array.isArray(t)) {
        const [e, n, r] = t;
        console.log(e, n, r), o.addProject(e, n, r), this.clearInputs();
      }
    }
  }
  !(function (e, t, n, r) {
    var s,
      i = arguments.length,
      l =
        i < 3
          ? t
          : null === r
          ? (r = Object.getOwnPropertyDescriptor(t, n))
          : r;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      l = Reflect.decorate(e, t, n, r);
    else
      for (var o = e.length - 1; o >= 0; o--)
        (s = e[o]) && (l = (i < 3 ? s(l) : i > 3 ? s(t, n, l) : s(t, n)) || l);
    i > 3 && l && Object.defineProperty(t, n, l);
  })([n], a.prototype, "submitHandler", null);
  var c = function (e, t, n, r) {
    var s,
      i = arguments.length,
      l =
        i < 3
          ? t
          : null === r
          ? (r = Object.getOwnPropertyDescriptor(t, n))
          : r;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      l = Reflect.decorate(e, t, n, r);
    else
      for (var o = e.length - 1; o >= 0; o--)
        (s = e[o]) && (l = (i < 3 ? s(l) : i > 3 ? s(t, n, l) : s(t, n)) || l);
    return i > 3 && l && Object.defineProperty(t, n, l), l;
  };
  class d extends e {
    get persons() {
      return 1 === this.project.people
        ? "1 person"
        : `${this.project.people} persons`;
    }
    constructor(e, t) {
      console.log(e),
        super("single-project", e, !1, t.id),
        (this.project = t),
        this.configure(),
        this.renderContent();
    }
    dragStartHandler(e) {
      console.log("drag start"),
        e.dataTransfer.setData("text/plain", this.project.id),
        (e.dataTransfer.effectAllowed = "move");
    }
    dragEndHandler(e) {
      console.log("drag end");
    }
    configure() {
      this.element.addEventListener("dragstart", this.dragStartHandler),
        this.element.addEventListener("dragend", this.dragEndHandler);
    }
    renderContent() {
      (this.element.querySelector("h2").textContent = this.project.title),
        (this.element.querySelector("h3").textContent =
          this.persons + " assigned"),
        (this.element.querySelector("p").textContent =
          this.project.description);
    }
  }
  c([n], d.prototype, "dragStartHandler", null),
    c([n], d.prototype, "configure", null);
  var p = function (e, t, n, r) {
    var s,
      i = arguments.length,
      l =
        i < 3
          ? t
          : null === r
          ? (r = Object.getOwnPropertyDescriptor(t, n))
          : r;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      l = Reflect.decorate(e, t, n, r);
    else
      for (var o = e.length - 1; o >= 0; o--)
        (s = e[o]) && (l = (i < 3 ? s(l) : i > 3 ? s(t, n, l) : s(t, n)) || l);
    return i > 3 && l && Object.defineProperty(t, n, l), l;
  };
  class u extends e {
    constructor(e) {
      super("project-list", "app", !1, `${e}-projects`),
        (this.type = e),
        (this.assignedProjects = []),
        this.configure(),
        this.renderContent();
    }
    dragOverHandler(e) {
      e.dataTransfer &&
        "text/plain" === e.dataTransfer.types[0] &&
        (e.preventDefault(),
        this.element.querySelector("ul").classList.add("droppable"));
    }
    dragLeaveHandler(e) {
      this.element.querySelector("ul").classList.remove("droppable");
    }
    dropHandler(e) {
      const t = e.dataTransfer.getData("text/plain");
      o.moveProject(t, "active" === this.type ? r.Active : r.Finished);
    }
    configure() {
      this.element.addEventListener("dragover", this.dragOverHandler),
        this.element.addEventListener("dragleave", this.dragLeaveHandler),
        this.element.addEventListener("drop", this.dropHandler),
        o.addListener((e) => {
          const t = e.filter((e) =>
            "active" === this.type
              ? e.status === r.Active
              : e.status === r.Finished
          );
          (this.assignedProjects = t), this.renderProjects();
        });
    }
    renderContent() {
      const e = `${this.type}-project-list`;
      (this.element.querySelector("ul").id = e),
        (this.element.querySelector("h2").textContent =
          this.type.toUpperCase() + " PROJECTS");
    }
    renderProjects() {
      document.getElementById(`${this.type}-project-list`).innerHTML = "";
      for (const e of this.assignedProjects)
        new d(this.element.querySelector("ul").id, e);
    }
  }
  p([n], u.prototype, "dragOverHandler", null),
    p([n], u.prototype, "dragLeaveHandler", null),
    p([n], u.prototype, "dropHandler", null),
    new a(),
    new u("active"),
    new u("finished");
})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QU96RCxHQUFJNEcsRUFFMUQsRUF2REEsR0FEQzVGLEcsb0NBVUQsR0FEQ0EsRyxxQ0FPRCxHQURDQSxHLGdDQ2hDSCxJQUFJdUMsRUFDSixJQUFJa0MsRUFBWSxVQUNoQixJQUFJQSxFQUFZLFciLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly93ZWJwYWNrLy4vc3JjL2NvbXBvbmVudHMvYmFzZV9jb21wb25lbnQudHMiLCJ3ZWJwYWNrOi8vd2VicGFjay8uL3NyYy91dGlsL3ZhbGlkYXRpb24udHMiLCJ3ZWJwYWNrOi8vd2VicGFjay8uL3NyYy9kZWNvcmF0b3JzL2F1dG9iaW5kLnRzIiwid2VicGFjazovL3dlYnBhY2svLi9zcmMvbW9kZWxzL3Byb2plY3QudHMiLCJ3ZWJwYWNrOi8vd2VicGFjay8uL3NyYy9zdGF0ZS9wcm9qZWN0X3N0YXRlLnRzIiwid2VicGFjazovL3dlYnBhY2svLi9zcmMvY29tcG9uZW50cy9wcm9qZWN0X2lucHV0LnRzIiwid2VicGFjazovL3dlYnBhY2svLi9zcmMvY29tcG9uZW50cy9wcm9qZWN0X2l0ZW0udHMiLCJ3ZWJwYWNrOi8vd2VicGFjay8uL3NyYy9jb21wb25lbnRzL3Byb2plY3RfbGlzdC50cyIsIndlYnBhY2s6Ly93ZWJwYWNrLy4vc3JjL2FwcC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb21wb25lbnQgQmFzZSBDbGFzc1xuZXhwb3J0IGFic3RyYWN0IGNsYXNzIENvbXBvbmVudDxUIGV4dGVuZHMgSFRNTEVsZW1lbnQsIFUgZXh0ZW5kcyBIVE1MRWxlbWVudD4ge1xuICB0ZW1wbGF0ZUVsZW1lbnQ6IEhUTUxUZW1wbGF0ZUVsZW1lbnQ7XG4gIGhvc3RFbGVtZW50OiBUO1xuICBlbGVtZW50OiBVO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHRlbXBsYXRlSWQ6IHN0cmluZyxcbiAgICBob3N0RWxlbWVudElkOiBzdHJpbmcsXG4gICAgaW5zZXJ0QXRTdGFydDogYm9vbGVhbixcbiAgICBuZXdFbGVtZW50SWQ/OiBzdHJpbmdcbiAgKSB7XG4gICAgdGhpcy50ZW1wbGF0ZUVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcbiAgICAgIHRlbXBsYXRlSWRcbiAgICApISBhcyBIVE1MVGVtcGxhdGVFbGVtZW50O1xuICAgIHRoaXMuaG9zdEVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChob3N0RWxlbWVudElkKSEgYXMgVDtcblxuICAgIGNvbnN0IGltcG9ydGVkTm9kZSA9IGRvY3VtZW50LmltcG9ydE5vZGUoXG4gICAgICB0aGlzLnRlbXBsYXRlRWxlbWVudC5jb250ZW50LFxuICAgICAgdHJ1ZVxuICAgICk7XG4gICAgdGhpcy5lbGVtZW50ID0gaW1wb3J0ZWROb2RlLmZpcnN0RWxlbWVudENoaWxkIGFzIFU7XG4gICAgaWYgKG5ld0VsZW1lbnRJZCkge1xuICAgICAgdGhpcy5lbGVtZW50LmlkID0gbmV3RWxlbWVudElkO1xuICAgIH1cblxuICAgIHRoaXMuYXR0YXRjaChpbnNlcnRBdFN0YXJ0KTtcbiAgfVxuXG4gIHByaXZhdGUgYXR0YXRjaChpbnNlcnRBdEJlZ2lubmluZzogYm9vbGVhbikge1xuICAgIHRoaXMuaG9zdEVsZW1lbnQuaW5zZXJ0QWRqYWNlbnRFbGVtZW50KFxuICAgICAgaW5zZXJ0QXRCZWdpbm5pbmcgPyBcImFmdGVyYmVnaW5cIiA6IFwiYmVmb3JlZW5kXCIsXG4gICAgICB0aGlzLmVsZW1lbnRcbiAgICApO1xuICB9XG5cbiAgYWJzdHJhY3QgY29uZmlndXJlKCk6IHZvaWQ7XG4gIGFic3RyYWN0IHJlbmRlckNvbnRlbnQoKTogdm9pZDtcbn1cbiIsIi8vIFZhbGlkYXRpb25cbmV4cG9ydCBpbnRlcmZhY2UgVmFsaWRhdGFibGUge1xuICB2YWx1ZTogc3RyaW5nIHwgbnVtYmVyO1xuICByZXF1aXJlZD86IGJvb2xlYW47XG4gIG1pbkxlbmd0aD86IG51bWJlcjtcbiAgbWF4TGVuZ3RoPzogbnVtYmVyO1xuICBtaW4/OiBudW1iZXI7XG4gIG1heD86IG51bWJlcjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHZhbGlkYXRlKHZhbGlkYXRhYmxlSW5wdXQ6IFZhbGlkYXRhYmxlKSB7XG4gIGxldCBpc1ZhbGlkID0gdHJ1ZTtcbiAgaWYgKHZhbGlkYXRhYmxlSW5wdXQucmVxdWlyZWQpIHtcbiAgICBpc1ZhbGlkID0gaXNWYWxpZCAmJiB2YWxpZGF0YWJsZUlucHV0LnZhbHVlLnRvU3RyaW5nKCkudHJpbSgpLmxlbmd0aCAhPT0gMDtcbiAgfVxuICBpZiAoXG4gICAgdmFsaWRhdGFibGVJbnB1dC5taW5MZW5ndGggIT0gbnVsbCAmJlxuICAgIHR5cGVvZiB2YWxpZGF0YWJsZUlucHV0LnZhbHVlID09PSBcInN0cmluZ1wiXG4gICkge1xuICAgIGlzVmFsaWQgPVxuICAgICAgaXNWYWxpZCAmJiB2YWxpZGF0YWJsZUlucHV0LnZhbHVlLmxlbmd0aCA+PSB2YWxpZGF0YWJsZUlucHV0Lm1pbkxlbmd0aDtcbiAgfVxuICBpZiAoXG4gICAgdmFsaWRhdGFibGVJbnB1dC5tYXhMZW5ndGggJiZcbiAgICB0eXBlb2YgdmFsaWRhdGFibGVJbnB1dC52YWx1ZSA9PT0gXCJzdHJpbmdcIlxuICApIHtcbiAgICBpc1ZhbGlkID1cbiAgICAgIGlzVmFsaWQgJiYgdmFsaWRhdGFibGVJbnB1dC52YWx1ZS5sZW5ndGggPD0gdmFsaWRhdGFibGVJbnB1dC5tYXhMZW5ndGg7XG4gIH1cbiAgaWYgKFxuICAgIHZhbGlkYXRhYmxlSW5wdXQubWluICE9IG51bGwgJiZcbiAgICB0eXBlb2YgdmFsaWRhdGFibGVJbnB1dC52YWx1ZSA9PT0gXCJudW1iZXJcIlxuICApIHtcbiAgICBpc1ZhbGlkID0gaXNWYWxpZCAmJiB2YWxpZGF0YWJsZUlucHV0LnZhbHVlID49IHZhbGlkYXRhYmxlSW5wdXQubWluO1xuICB9XG4gIGlmIChcbiAgICB2YWxpZGF0YWJsZUlucHV0Lm1heCAhPSBudWxsICYmXG4gICAgdHlwZW9mIHZhbGlkYXRhYmxlSW5wdXQudmFsdWUgPT09IFwibnVtYmVyXCJcbiAgKSB7XG4gICAgaXNWYWxpZCA9IGlzVmFsaWQgJiYgdmFsaWRhdGFibGVJbnB1dC52YWx1ZSA8PSB2YWxpZGF0YWJsZUlucHV0Lm1heDtcbiAgfVxuXG4gIHJldHVybiBpc1ZhbGlkO1xufVxuIiwiLy8gQXV0b2JpbmQgRGVjb3JhdG9yXG5leHBvcnQgZnVuY3Rpb24gYXV0b2JpbmQoXzogYW55LCBfMjogc3RyaW5nLCBkZXNjcmlwdG9yOiBQcm9wZXJ0eURlc2NyaXB0b3IpIHtcbiAgY29uc3Qgb3JpZ2luYWxNZXRob2QgPSBkZXNjcmlwdG9yLnZhbHVlO1xuICBjb25zdCBhZGpEZXNjcmlwdG9yOiBQcm9wZXJ0eURlc2NyaXB0b3IgPSB7XG4gICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgIGdldCgpIHtcbiAgICAgIGNvbnN0IGJvdW5kRm4gPSBvcmlnaW5hbE1ldGhvZC5iaW5kKHRoaXMpO1xuICAgICAgcmV0dXJuIGJvdW5kRm47XG4gICAgfSxcbiAgfTtcbiAgcmV0dXJuIGFkakRlc2NyaXB0b3I7XG59XG4iLCIvLyBQcm9qZWN0IFR5cGVcbmV4cG9ydCBlbnVtIFByb2plY3RTdGF0dXMge1xuICBBY3RpdmUsXG4gIEZpbmlzaGVkLFxufVxuXG5leHBvcnQgY2xhc3MgUHJvamVjdCB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHB1YmxpYyBpZDogc3RyaW5nLFxuICAgIHB1YmxpYyB0aXRsZTogc3RyaW5nLFxuICAgIHB1YmxpYyBkZXNjcmlwdGlvbjogc3RyaW5nLFxuICAgIHB1YmxpYyBwZW9wbGU6IG51bWJlcixcbiAgICBwdWJsaWMgc3RhdHVzOiBQcm9qZWN0U3RhdHVzXG4gICkge31cbn1cbiIsImltcG9ydCB7IFByb2plY3QsIFByb2plY3RTdGF0dXMgfSBmcm9tIFwiLi4vbW9kZWxzL3Byb2plY3RcIjtcblxuLy8gUHJvamVjdCBTdGF0ZSBNYW5hZ2VtZW50XG50eXBlIExpc3RlbmVyPFQ+ID0gKGl0ZW1zOiBUW10pID0+IHZvaWQ7XG5cbmNsYXNzIFN0YXRlPFQ+IHtcbiAgcHJvdGVjdGVkIGxpc3RlbmVyczogTGlzdGVuZXI8VD5bXSA9IFtdO1xuXG4gIGFkZExpc3RlbmVyKGxpc3RlbmVyRm46IExpc3RlbmVyPFQ+KSB7XG4gICAgdGhpcy5saXN0ZW5lcnMucHVzaChsaXN0ZW5lckZuKTtcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgUHJvamVjdFN0YXRlIGV4dGVuZHMgU3RhdGU8UHJvamVjdD4ge1xuICBwcml2YXRlIHByb2plY3RzOiBQcm9qZWN0W10gPSBbXTtcblxuICBwcml2YXRlIHN0YXRpYyBpbnN0YW5jZTogUHJvamVjdFN0YXRlO1xuXG4gIHByaXZhdGUgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoKTtcbiAgfVxuXG4gIHN0YXRpYyBnZXRJbnN0YW5jZSgpIHtcbiAgICBpZiAodGhpcy5pbnN0YW5jZSkge1xuICAgICAgcmV0dXJuIHRoaXMuaW5zdGFuY2U7XG4gICAgfVxuICAgIHRoaXMuaW5zdGFuY2UgPSBuZXcgUHJvamVjdFN0YXRlKCk7XG4gICAgcmV0dXJuIHRoaXMuaW5zdGFuY2U7XG4gIH1cblxuICBhZGRQcm9qZWN0KHRpdGxlOiBzdHJpbmcsIGRlc2NyaXB0aW9uOiBzdHJpbmcsIG51bU9mUGVvcGxlOiBudW1iZXIpIHtcbiAgICBjb25zdCBuZXdQcm9qZWN0ID0gbmV3IFByb2plY3QoXG4gICAgICBNYXRoLnJhbmRvbSgpLnRvU3RyaW5nKCksXG4gICAgICB0aXRsZSxcbiAgICAgIGRlc2NyaXB0aW9uLFxuICAgICAgbnVtT2ZQZW9wbGUsXG4gICAgICBQcm9qZWN0U3RhdHVzLkFjdGl2ZVxuICAgICk7XG4gICAgdGhpcy5wcm9qZWN0cy5wdXNoKG5ld1Byb2plY3QpO1xuICAgIHRoaXMudXBkYXRlTGlzdGVuZXJzKCk7XG4gIH1cblxuICBtb3ZlUHJvamVjdChwcm9qZWN0SWQ6IHN0cmluZywgbmV3U3RhdHVzOiBQcm9qZWN0U3RhdHVzKSB7XG4gICAgY29uc3QgcHJvamVjdCA9IHRoaXMucHJvamVjdHMuZmluZCgocHJqKSA9PiBwcmouaWQgPT09IHByb2plY3RJZCk7XG4gICAgaWYgKHByb2plY3QgJiYgcHJvamVjdC5zdGF0dXMgIT09IG5ld1N0YXR1cykge1xuICAgICAgcHJvamVjdC5zdGF0dXMgPSBuZXdTdGF0dXM7XG4gICAgICB0aGlzLnVwZGF0ZUxpc3RlbmVycygpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgdXBkYXRlTGlzdGVuZXJzKCkge1xuICAgIGZvciAoY29uc3QgbGlzdGVuZXJGbiBvZiB0aGlzLmxpc3RlbmVycykge1xuICAgICAgbGlzdGVuZXJGbih0aGlzLnByb2plY3RzLnNsaWNlKCkpO1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgY29uc3QgcHJvamVjdFN0YXRlID0gUHJvamVjdFN0YXRlLmdldEluc3RhbmNlKCk7XG4iLCJpbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tIFwiLi9iYXNlX2NvbXBvbmVudFwiO1xuaW1wb3J0IHsgVmFsaWRhdGFibGUsIHZhbGlkYXRlIH0gZnJvbSBcIi4uL3V0aWwvdmFsaWRhdGlvblwiO1xuaW1wb3J0IHsgYXV0b2JpbmQgfSBmcm9tIFwiLi4vZGVjb3JhdG9ycy9hdXRvYmluZFwiO1xuaW1wb3J0IHsgcHJvamVjdFN0YXRlIH0gZnJvbSBcIi4uL3N0YXRlL3Byb2plY3Rfc3RhdGVcIjtcblxuLy8gUHJvamVjdElucHV0IENsYXNzXG5leHBvcnQgY2xhc3MgUHJvamVjdElucHV0IGV4dGVuZHMgQ29tcG9uZW50PEhUTUxEaXZFbGVtZW50LCBIVE1MRm9ybUVsZW1lbnQ+IHtcbiAgdGl0bGVJbnB1dEVsZW1lbnQ6IEhUTUxJbnB1dEVsZW1lbnQ7XG4gIGRlc2NyaXB0aW9uSW5wdXRFbGVtZW50OiBIVE1MSW5wdXRFbGVtZW50O1xuICBwZW9wbGVJbnB1dEVsZW1lbnQ6IEhUTUxJbnB1dEVsZW1lbnQ7XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoXCJwcm9qZWN0LWlucHV0XCIsIFwiYXBwXCIsIHRydWUsIFwidXNlci1pbnB1dFwiKTtcblxuICAgIHRoaXMudGl0bGVJbnB1dEVsZW1lbnQgPSB0aGlzLmVsZW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICAgIFwiI3RpdGxlXCJcbiAgICApISBhcyBIVE1MSW5wdXRFbGVtZW50O1xuICAgIHRoaXMuZGVzY3JpcHRpb25JbnB1dEVsZW1lbnQgPSB0aGlzLmVsZW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICAgIFwiI2Rlc2NyaXB0aW9uXCJcbiAgICApISBhcyBIVE1MSW5wdXRFbGVtZW50O1xuICAgIHRoaXMucGVvcGxlSW5wdXRFbGVtZW50ID0gdGhpcy5lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgICBcIiNwZW9wbGVcIlxuICAgICkhIGFzIEhUTUxJbnB1dEVsZW1lbnQ7XG5cbiAgICB0aGlzLmNvbmZpZ3VyZSgpO1xuICB9XG5cbiAgY29uZmlndXJlKCkge1xuICAgIHRoaXMuZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwic3VibWl0XCIsIHRoaXMuc3VibWl0SGFuZGxlcik7XG4gIH1cblxuICByZW5kZXJDb250ZW50KCk6IHZvaWQge31cblxuICBwcml2YXRlIGdldGhlclVzZXJJbnB1dCgpOiBbc3RyaW5nLCBzdHJpbmcsIG51bWJlcl0gfCB2b2lkIHtcbiAgICBjb25zdCBlbnRlcmVkVGl0bGUgPSB0aGlzLnRpdGxlSW5wdXRFbGVtZW50LnZhbHVlO1xuICAgIGNvbnN0IGVudGVyZWREZXNjcmlwdGlvbiA9IHRoaXMuZGVzY3JpcHRpb25JbnB1dEVsZW1lbnQudmFsdWU7XG4gICAgY29uc3QgZW50ZXJlZFBlb3BsZSA9IHRoaXMucGVvcGxlSW5wdXRFbGVtZW50LnZhbHVlO1xuXG4gICAgY29uc3QgdGl0bGVWYWxpZGF0YWJsZTogVmFsaWRhdGFibGUgPSB7XG4gICAgICB2YWx1ZTogZW50ZXJlZFRpdGxlLFxuICAgICAgcmVxdWlyZWQ6IHRydWUsXG4gICAgfTtcblxuICAgIGNvbnN0IGRlc2NyaXB0aW9uVmFsaWRhdGFibGU6IFZhbGlkYXRhYmxlID0ge1xuICAgICAgdmFsdWU6IGVudGVyZWREZXNjcmlwdGlvbixcbiAgICAgIHJlcXVpcmVkOiB0cnVlLFxuICAgICAgbWluTGVuZ3RoOiA1LFxuICAgIH07XG5cbiAgICBjb25zdCBwZW9wbGVWYWxpZGF0YWJsZTogVmFsaWRhdGFibGUgPSB7XG4gICAgICB2YWx1ZTogK2VudGVyZWRQZW9wbGUsXG4gICAgICByZXF1aXJlZDogdHJ1ZSxcbiAgICAgIG1pbjogMSxcbiAgICAgIG1heDogNSxcbiAgICB9O1xuXG4gICAgaWYgKFxuICAgICAgIXZhbGlkYXRlKHRpdGxlVmFsaWRhdGFibGUpIHx8XG4gICAgICAhdmFsaWRhdGUoZGVzY3JpcHRpb25WYWxpZGF0YWJsZSkgfHxcbiAgICAgICF2YWxpZGF0ZShwZW9wbGVWYWxpZGF0YWJsZSlcbiAgICApIHtcbiAgICAgIGFsZXJ0KFwiSW52YWxpZCBpbnB1dCwgcGxlYXNlIHRyeSBhZ2FpbiFcIik7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHJldHVybiBbZW50ZXJlZFRpdGxlLCBlbnRlcmVkRGVzY3JpcHRpb24sICtlbnRlcmVkUGVvcGxlXTtcbiAgfVxuXG4gIHByaXZhdGUgY2xlYXJJbnB1dHMoKSB7XG4gICAgdGhpcy50aXRsZUlucHV0RWxlbWVudC52YWx1ZSA9IFwiXCI7XG4gICAgdGhpcy5kZXNjcmlwdGlvbklucHV0RWxlbWVudC52YWx1ZSA9IFwiXCI7XG4gICAgdGhpcy5wZW9wbGVJbnB1dEVsZW1lbnQudmFsdWUgPSBcIlwiO1xuICB9XG5cbiAgQGF1dG9iaW5kXG4gIHByaXZhdGUgc3VibWl0SGFuZGxlcihldmVudDogRXZlbnQpIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGNvbnN0IHVzZXJJbnB1dCA9IHRoaXMuZ2V0aGVyVXNlcklucHV0KCk7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkodXNlcklucHV0KSkge1xuICAgICAgY29uc3QgW3RpdGxlLCBkZXNjLCBwZW9wbGVdID0gdXNlcklucHV0O1xuICAgICAgY29uc29sZS5sb2codGl0bGUsIGRlc2MsIHBlb3BsZSk7XG4gICAgICBwcm9qZWN0U3RhdGUuYWRkUHJvamVjdCh0aXRsZSwgZGVzYywgcGVvcGxlKTtcbiAgICAgIHRoaXMuY2xlYXJJbnB1dHMoKTtcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gXCIuL2Jhc2VfY29tcG9uZW50XCI7XG5pbXBvcnQgeyBEcmFnZ2FibGUgfSBmcm9tIFwiLi4vbW9kZWxzL2RyYWdfZHJvcFwiO1xuaW1wb3J0IHsgYXV0b2JpbmQgfSBmcm9tIFwiLi4vZGVjb3JhdG9ycy9hdXRvYmluZFwiO1xuaW1wb3J0IHsgUHJvamVjdCB9IGZyb20gXCIuLi9tb2RlbHMvcHJvamVjdFwiO1xuXG4vLyBQcm9qZWN0SXRlbSBDbGFzc1xuZXhwb3J0IGNsYXNzIFByb2plY3RJdGVtXG4gIGV4dGVuZHMgQ29tcG9uZW50PEhUTUxVTGlzdEVsZW1lbnQsIEhUTUxMSUVsZW1lbnQ+XG4gIGltcGxlbWVudHMgRHJhZ2dhYmxlXG57XG4gIHByaXZhdGUgcHJvamVjdDogUHJvamVjdDtcblxuICBnZXQgcGVyc29ucygpIHtcbiAgICBpZiAodGhpcy5wcm9qZWN0LnBlb3BsZSA9PT0gMSkge1xuICAgICAgcmV0dXJuIFwiMSBwZXJzb25cIjtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGAke3RoaXMucHJvamVjdC5wZW9wbGV9IHBlcnNvbnNgO1xuICAgIH1cbiAgfVxuXG4gIGNvbnN0cnVjdG9yKGhvc3RJZDogc3RyaW5nLCBwcm9qZWN0OiBQcm9qZWN0KSB7XG4gICAgY29uc29sZS5sb2coaG9zdElkKTtcbiAgICBzdXBlcihcInNpbmdsZS1wcm9qZWN0XCIsIGhvc3RJZCwgZmFsc2UsIHByb2plY3QuaWQpO1xuICAgIHRoaXMucHJvamVjdCA9IHByb2plY3Q7XG5cbiAgICB0aGlzLmNvbmZpZ3VyZSgpO1xuICAgIHRoaXMucmVuZGVyQ29udGVudCgpO1xuICB9XG5cbiAgQGF1dG9iaW5kXG4gIGRyYWdTdGFydEhhbmRsZXIoZXZlbnQ6IERyYWdFdmVudCk6IHZvaWQge1xuICAgIGNvbnNvbGUubG9nKFwiZHJhZyBzdGFydFwiKTtcbiAgICBldmVudC5kYXRhVHJhbnNmZXIhLnNldERhdGEoXCJ0ZXh0L3BsYWluXCIsIHRoaXMucHJvamVjdC5pZCk7XG4gICAgZXZlbnQuZGF0YVRyYW5zZmVyIS5lZmZlY3RBbGxvd2VkID0gXCJtb3ZlXCI7XG4gIH1cblxuICBkcmFnRW5kSGFuZGxlcihfOiBEcmFnRXZlbnQpOiB2b2lkIHtcbiAgICBjb25zb2xlLmxvZyhcImRyYWcgZW5kXCIpO1xuICB9XG5cbiAgQGF1dG9iaW5kXG4gIGNvbmZpZ3VyZSgpOiB2b2lkIHtcbiAgICB0aGlzLmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImRyYWdzdGFydFwiLCB0aGlzLmRyYWdTdGFydEhhbmRsZXIpO1xuICAgIHRoaXMuZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwiZHJhZ2VuZFwiLCB0aGlzLmRyYWdFbmRIYW5kbGVyKTtcbiAgfVxuXG4gIHJlbmRlckNvbnRlbnQoKTogdm9pZCB7XG4gICAgdGhpcy5lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCJoMlwiKSEudGV4dENvbnRlbnQgPSB0aGlzLnByb2plY3QudGl0bGU7XG4gICAgdGhpcy5lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCJoM1wiKSEudGV4dENvbnRlbnQgPSB0aGlzLnBlcnNvbnMgKyBcIiBhc3NpZ25lZFwiO1xuICAgIHRoaXMuZWxlbWVudC5xdWVyeVNlbGVjdG9yKFwicFwiKSEudGV4dENvbnRlbnQgPSB0aGlzLnByb2plY3QuZGVzY3JpcHRpb247XG4gIH1cbn1cbiIsImltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gXCIuL2Jhc2VfY29tcG9uZW50XCI7XG5pbXBvcnQgeyBEcmFnVGFyZ2V0IH0gZnJvbSBcIi4uL21vZGVscy9kcmFnX2Ryb3BcIjtcbmltcG9ydCB7IGF1dG9iaW5kIH0gZnJvbSBcIi4uL2RlY29yYXRvcnMvYXV0b2JpbmRcIjtcbmltcG9ydCB7IFByb2plY3QsIFByb2plY3RTdGF0dXMgfSBmcm9tIFwiLi4vbW9kZWxzL3Byb2plY3RcIjtcbmltcG9ydCB7IHByb2plY3RTdGF0ZSB9IGZyb20gXCIuLi9zdGF0ZS9wcm9qZWN0X3N0YXRlXCI7XG5pbXBvcnQgeyBQcm9qZWN0SXRlbSB9IGZyb20gXCIuL3Byb2plY3RfaXRlbVwiO1xuXG4vLyBQcm9qZWN0TGlzdCBDbGFzc1xuZXhwb3J0IGNsYXNzIFByb2plY3RMaXN0XG4gIGV4dGVuZHMgQ29tcG9uZW50PEhUTUxEaXZFbGVtZW50LCBIVE1MRWxlbWVudD5cbiAgaW1wbGVtZW50cyBEcmFnVGFyZ2V0XG57XG4gIGFzc2lnbmVkUHJvamVjdHM6IFByb2plY3RbXTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHR5cGU6IFwiYWN0aXZlXCIgfCBcImZpbmlzaGVkXCIpIHtcbiAgICBzdXBlcihcInByb2plY3QtbGlzdFwiLCBcImFwcFwiLCBmYWxzZSwgYCR7dHlwZX0tcHJvamVjdHNgKTtcblxuICAgIHRoaXMuYXNzaWduZWRQcm9qZWN0cyA9IFtdO1xuXG4gICAgdGhpcy5jb25maWd1cmUoKTtcbiAgICB0aGlzLnJlbmRlckNvbnRlbnQoKTtcbiAgfVxuXG4gIEBhdXRvYmluZFxuICBkcmFnT3ZlckhhbmRsZXIoZXZlbnQ6IERyYWdFdmVudCk6IHZvaWQge1xuICAgIGlmIChldmVudC5kYXRhVHJhbnNmZXIgJiYgZXZlbnQuZGF0YVRyYW5zZmVyLnR5cGVzWzBdID09PSBcInRleHQvcGxhaW5cIikge1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGNvbnN0IGxpc3RFbCA9IHRoaXMuZWxlbWVudC5xdWVyeVNlbGVjdG9yKFwidWxcIikhO1xuICAgICAgbGlzdEVsLmNsYXNzTGlzdC5hZGQoXCJkcm9wcGFibGVcIik7XG4gICAgfVxuICB9XG5cbiAgQGF1dG9iaW5kXG4gIGRyYWdMZWF2ZUhhbmRsZXIoXzogRHJhZ0V2ZW50KTogdm9pZCB7XG4gICAgY29uc3QgbGlzdEVsID0gdGhpcy5lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCJ1bFwiKSE7XG4gICAgbGlzdEVsLmNsYXNzTGlzdC5yZW1vdmUoXCJkcm9wcGFibGVcIik7XG4gIH1cblxuICBAYXV0b2JpbmRcbiAgZHJvcEhhbmRsZXIoZXZlbnQ6IERyYWdFdmVudCk6IHZvaWQge1xuICAgIGNvbnN0IHByaklkID0gZXZlbnQuZGF0YVRyYW5zZmVyIS5nZXREYXRhKFwidGV4dC9wbGFpblwiKTtcbiAgICBwcm9qZWN0U3RhdGUubW92ZVByb2plY3QoXG4gICAgICBwcmpJZCxcbiAgICAgIHRoaXMudHlwZSA9PT0gXCJhY3RpdmVcIiA/IFByb2plY3RTdGF0dXMuQWN0aXZlIDogUHJvamVjdFN0YXR1cy5GaW5pc2hlZFxuICAgICk7XG4gIH1cblxuICBjb25maWd1cmUoKTogdm9pZCB7XG4gICAgdGhpcy5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJkcmFnb3ZlclwiLCB0aGlzLmRyYWdPdmVySGFuZGxlcik7XG4gICAgdGhpcy5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJkcmFnbGVhdmVcIiwgdGhpcy5kcmFnTGVhdmVIYW5kbGVyKTtcbiAgICB0aGlzLmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImRyb3BcIiwgdGhpcy5kcm9wSGFuZGxlcik7XG5cbiAgICBwcm9qZWN0U3RhdGUuYWRkTGlzdGVuZXIoKHByb2plY3RzOiBQcm9qZWN0W10pID0+IHtcbiAgICAgIGNvbnN0IHJlbGV2YW50UHJvamVjdHMgPSBwcm9qZWN0cy5maWx0ZXIoKHByaikgPT4ge1xuICAgICAgICBpZiAodGhpcy50eXBlID09PSBcImFjdGl2ZVwiKSB7XG4gICAgICAgICAgcmV0dXJuIHByai5zdGF0dXMgPT09IFByb2plY3RTdGF0dXMuQWN0aXZlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBwcmouc3RhdHVzID09PSBQcm9qZWN0U3RhdHVzLkZpbmlzaGVkO1xuICAgICAgfSk7XG4gICAgICB0aGlzLmFzc2lnbmVkUHJvamVjdHMgPSByZWxldmFudFByb2plY3RzO1xuICAgICAgdGhpcy5yZW5kZXJQcm9qZWN0cygpO1xuICAgIH0pO1xuICB9XG5cbiAgcmVuZGVyQ29udGVudCgpIHtcbiAgICBjb25zdCBsaXN0SWQgPSBgJHt0aGlzLnR5cGV9LXByb2plY3QtbGlzdGA7XG4gICAgdGhpcy5lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCJ1bFwiKSEuaWQgPSBsaXN0SWQ7XG4gICAgdGhpcy5lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCJoMlwiKSEudGV4dENvbnRlbnQgPVxuICAgICAgdGhpcy50eXBlLnRvVXBwZXJDYXNlKCkgKyBcIiBQUk9KRUNUU1wiO1xuICB9XG5cbiAgcHJpdmF0ZSByZW5kZXJQcm9qZWN0cygpIHtcbiAgICBjb25zdCBsaXN0RWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcbiAgICAgIGAke3RoaXMudHlwZX0tcHJvamVjdC1saXN0YFxuICAgICkhIGFzIEhUTUxVTGlzdEVsZW1lbnQ7XG4gICAgbGlzdEVsLmlubmVySFRNTCA9IFwiXCI7XG4gICAgZm9yIChjb25zdCBwcmpJdGVtIG9mIHRoaXMuYXNzaWduZWRQcm9qZWN0cykge1xuICAgICAgbmV3IFByb2plY3RJdGVtKHRoaXMuZWxlbWVudC5xdWVyeVNlbGVjdG9yKFwidWxcIikhLmlkLCBwcmpJdGVtKTtcbiAgICB9XG4gIH1cbn1cbiIsIi8vIC8vLyA8cmVmZXJlbmNlIHBhdGg9XCJkcmFnX2Ryb3BfaW50ZXJmYWNlcy50c1wiIC8+XG4vLyAvLy8gPHJlZmVyZW5jZSBwYXRoPVwicHJvamVjdF9tb2RlbC50c1wiIC8+XG5cbmltcG9ydCB7IFByb2plY3RJbnB1dCB9IGZyb20gXCIuL2NvbXBvbmVudHMvcHJvamVjdF9pbnB1dFwiO1xuaW1wb3J0IHsgUHJvamVjdExpc3QgfSBmcm9tIFwiLi9jb21wb25lbnRzL3Byb2plY3RfbGlzdFwiO1xuXG5uZXcgUHJvamVjdElucHV0KCk7XG5uZXcgUHJvamVjdExpc3QoXCJhY3RpdmVcIik7XG5uZXcgUHJvamVjdExpc3QoXCJmaW5pc2hlZFwiKTtcbiJdLCJuYW1lcyI6WyJDb21wb25lbnQiLCJjb25zdHJ1Y3RvciIsInRlbXBsYXRlSWQiLCJob3N0RWxlbWVudElkIiwiaW5zZXJ0QXRTdGFydCIsIm5ld0VsZW1lbnRJZCIsInRoaXMiLCJ0ZW1wbGF0ZUVsZW1lbnQiLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwiaG9zdEVsZW1lbnQiLCJpbXBvcnRlZE5vZGUiLCJpbXBvcnROb2RlIiwiY29udGVudCIsImVsZW1lbnQiLCJmaXJzdEVsZW1lbnRDaGlsZCIsImlkIiwiYXR0YXRjaCIsImluc2VydEF0QmVnaW5uaW5nIiwiaW5zZXJ0QWRqYWNlbnRFbGVtZW50IiwidmFsaWRhdGUiLCJ2YWxpZGF0YWJsZUlucHV0IiwiaXNWYWxpZCIsInJlcXVpcmVkIiwidmFsdWUiLCJ0b1N0cmluZyIsInRyaW0iLCJsZW5ndGgiLCJtaW5MZW5ndGgiLCJtYXhMZW5ndGgiLCJtaW4iLCJtYXgiLCJhdXRvYmluZCIsIl8iLCJfMiIsImRlc2NyaXB0b3IiLCJvcmlnaW5hbE1ldGhvZCIsImNvbmZpZ3VyYWJsZSIsImdldCIsImJpbmQiLCJQcm9qZWN0U3RhdHVzIiwiUHJvamVjdCIsInRpdGxlIiwiZGVzY3JpcHRpb24iLCJwZW9wbGUiLCJzdGF0dXMiLCJTdGF0ZSIsImxpc3RlbmVycyIsImFkZExpc3RlbmVyIiwibGlzdGVuZXJGbiIsInB1c2giLCJQcm9qZWN0U3RhdGUiLCJzdXBlciIsInByb2plY3RzIiwiZ2V0SW5zdGFuY2UiLCJpbnN0YW5jZSIsImFkZFByb2plY3QiLCJudW1PZlBlb3BsZSIsIm5ld1Byb2plY3QiLCJNYXRoIiwicmFuZG9tIiwiQWN0aXZlIiwidXBkYXRlTGlzdGVuZXJzIiwibW92ZVByb2plY3QiLCJwcm9qZWN0SWQiLCJuZXdTdGF0dXMiLCJwcm9qZWN0IiwiZmluZCIsInByaiIsInNsaWNlIiwicHJvamVjdFN0YXRlIiwiUHJvamVjdElucHV0IiwidGl0bGVJbnB1dEVsZW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwiZGVzY3JpcHRpb25JbnB1dEVsZW1lbnQiLCJwZW9wbGVJbnB1dEVsZW1lbnQiLCJjb25maWd1cmUiLCJhZGRFdmVudExpc3RlbmVyIiwic3VibWl0SGFuZGxlciIsInJlbmRlckNvbnRlbnQiLCJnZXRoZXJVc2VySW5wdXQiLCJlbnRlcmVkVGl0bGUiLCJlbnRlcmVkRGVzY3JpcHRpb24iLCJlbnRlcmVkUGVvcGxlIiwiZGVzY3JpcHRpb25WYWxpZGF0YWJsZSIsInBlb3BsZVZhbGlkYXRhYmxlIiwiYWxlcnQiLCJjbGVhcklucHV0cyIsImV2ZW50IiwicHJldmVudERlZmF1bHQiLCJ1c2VySW5wdXQiLCJBcnJheSIsImlzQXJyYXkiLCJkZXNjIiwiY29uc29sZSIsImxvZyIsIlByb2plY3RJdGVtIiwicGVyc29ucyIsImhvc3RJZCIsImRyYWdTdGFydEhhbmRsZXIiLCJkYXRhVHJhbnNmZXIiLCJzZXREYXRhIiwiZWZmZWN0QWxsb3dlZCIsImRyYWdFbmRIYW5kbGVyIiwidGV4dENvbnRlbnQiLCJQcm9qZWN0TGlzdCIsInR5cGUiLCJhc3NpZ25lZFByb2plY3RzIiwiZHJhZ092ZXJIYW5kbGVyIiwidHlwZXMiLCJjbGFzc0xpc3QiLCJhZGQiLCJkcmFnTGVhdmVIYW5kbGVyIiwicmVtb3ZlIiwiZHJvcEhhbmRsZXIiLCJwcmpJZCIsImdldERhdGEiLCJGaW5pc2hlZCIsInJlbGV2YW50UHJvamVjdHMiLCJmaWx0ZXIiLCJyZW5kZXJQcm9qZWN0cyIsImxpc3RJZCIsInRvVXBwZXJDYXNlIiwiaW5uZXJIVE1MIiwicHJqSXRlbSJdLCJzb3VyY2VSb290IjoiIn0=
