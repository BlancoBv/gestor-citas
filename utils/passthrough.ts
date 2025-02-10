const PT = {
  datatable: {
    root: "not-prose relative",
    table: "table table-zebra",
  },
  paginator: {
    root: "py-4",
    content: "flex justify-center items-center gap-4 flex-wrap",
    pages: "flex gap-4",
    first: "btn btn-sm",
    prev: "btn btn-sm",
    next: "btn btn-sm",
    last: "btn btn-sm",
    page: "btn btn-sm data-[p-active=true]:btn-secondary",
  },
  select: {
    root: "input input-bordered flex gap-2 items-center justify-center w-full",
    overlay: "menu bg-base-100 rounded-btn",
    label: "outline-none",
  },
  multiselect: {
    root: "input input-bordered w-full max-w-xs flex gap-2 items-center justify-center",
    overlay: "menu bg-base-100 rounded-btn shadow overflow-y-auto w-60 p-4",
    option: "flex items-center flex-row flex-nowrap",
    list: "pt-4",
    optionLabel: "",
    labelcontainer: "overflow-x-auto",
    label: "outline-none text-sm flex gap-4 items-center text-nowrap",
    header: "flex items-center gap-4",
    chipitem: "text-xs",
  },
  contextmenu: {
    root: "menu bg-base-100 shadow rounded-btn",
    itemlink: "flex gap-2 items-center",
  },
  textarea: {
    root: "textarea textarea-bordered",
  },
  checkbox: {
    root: "w-fit",
    input: "checkbox checkbox-primary checkbox-xs",
    box: "hidden",
  },
  inputtext: {
    root: "input input-bordered w-full max-w-xs",
  },
  iconfield: {
    root: "flex items-center gap-4",
  },
  chip: {
    root: "flex bg-base-200 gap-4 items-center p-1 rounded-btn",
  },
  dialog: {
    root: "modal-box transform-none",
    mask: { class: "bg-[#0006]" },
    header: "grid grid-cols-2",
    title: "text-lg font-bold",
    headeractions: "flex items-center justify-end",
    pcclosebutton: {
      root: "btn btn-sm btn-circle btn-ghost text-center",
      label: "hidden",
    },
  },
};
export default PT;
