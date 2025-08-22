// pages/_layout.tsx
import { Link } from "exta/components";
import { useEffect, useState } from "react";
import "D:\\zely-blog\\styles\\global.scss";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
function MyApp({ children }) {
  const [isScrolled, setScrolled] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined") return;
    window.addEventListener("scroll", () => {
      const scrollTop = window.pageYOffset;
      if (scrollTop > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    });
  });
  return jsxs(Fragment, { children: [
    jsx("div", { className: `header-container fixed${isScrolled ? " scrolled" : ""}`, children: jsx("div", { className: "header-bg", children: jsxs("div", { className: `header`, children: [
      jsx("div", { className: "name", children: jsx(Link, { href: "/", children: "\u{1F984}\u{1F412}" }) }),
      jsxs("div", { className: "items", children: [
        jsx(Link, { href: "/project", children: jsx("i", { className: "ri-instance-line" }) }),
        jsx(Link, { href: "/tags", children: jsx("i", { className: "ri-hashtag" }) }),
        jsx(Link, { href: "/about", children: jsx("i", { className: "ri-at-line" }) })
      ] })
    ] }) }) }),
    jsx("div", { className: "root", children: jsx("div", { className: "container", children }) })
  ] });
}
var layout_default = MyApp;
export {
  layout_default as _page
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vcGFnZXMvX2xheW91dC50c3giXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8qIGVzbGludC1kaXNhYmxlIHJlYWN0LWhvb2tzL3J1bGVzLW9mLWhvb2tzICovXHJcbid1c2UgY2xpZW50JztcclxuXHJcbi8qIGVzbGludC1kaXNhYmxlIEBuZXh0L25leHQvbm8tcGFnZS1jdXN0b20tZm9udCAqL1xyXG5cclxuaW1wb3J0IHsgTGluayB9IGZyb20gJ2V4dGEvY29tcG9uZW50cyc7XHJcblxyXG5pbXBvcnQgeyB1c2VFZmZlY3QsIHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnO1xyXG5cclxuaW1wb3J0ICcuLi9zdHlsZXMvZ2xvYmFsLnNjc3MnO1xyXG5cclxuZnVuY3Rpb24gTXlBcHAoeyBjaGlsZHJlbiB9KSB7XHJcbiAgY29uc3QgW2lzU2Nyb2xsZWQsIHNldFNjcm9sbGVkXSA9IHVzZVN0YXRlKGZhbHNlKTtcclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgaWYgKHR5cGVvZiB3aW5kb3cgPT09ICd1bmRlZmluZWQnKSByZXR1cm47XHJcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgKCkgPT4ge1xyXG4gICAgICBjb25zdCBzY3JvbGxUb3AgPSB3aW5kb3cucGFnZVlPZmZzZXQ7XHJcbiAgICAgIGlmIChzY3JvbGxUb3AgPiAxMCkge1xyXG4gICAgICAgIHNldFNjcm9sbGVkKHRydWUpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHNldFNjcm9sbGVkKGZhbHNlKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfSk7XHJcblxyXG4gIHJldHVybiAoXHJcbiAgICA8PlxyXG4gICAgICA8ZGl2IGNsYXNzTmFtZT17YGhlYWRlci1jb250YWluZXIgZml4ZWQke2lzU2Nyb2xsZWQgPyAnIHNjcm9sbGVkJyA6ICcnfWB9PlxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiaGVhZGVyLWJnXCI+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17YGhlYWRlcmB9PlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm5hbWVcIj5cclxuICAgICAgICAgICAgICA8TGluayBocmVmPVwiL1wiPlx1RDgzRVx1REQ4NFx1RDgzRFx1REMxMjwvTGluaz5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiaXRlbXNcIj5cclxuICAgICAgICAgICAgICA8TGluayBocmVmPVwiL3Byb2plY3RcIj5cclxuICAgICAgICAgICAgICAgIDxpIGNsYXNzTmFtZT1cInJpLWluc3RhbmNlLWxpbmVcIj48L2k+XHJcbiAgICAgICAgICAgICAgPC9MaW5rPlxyXG4gICAgICAgICAgICAgIDxMaW5rIGhyZWY9XCIvdGFnc1wiPlxyXG4gICAgICAgICAgICAgICAgPGkgY2xhc3NOYW1lPVwicmktaGFzaHRhZ1wiPjwvaT5cclxuICAgICAgICAgICAgICA8L0xpbms+XHJcbiAgICAgICAgICAgICAgPExpbmsgaHJlZj1cIi9hYm91dFwiPlxyXG4gICAgICAgICAgICAgICAgPGkgY2xhc3NOYW1lPVwicmktYXQtbGluZVwiPjwvaT5cclxuICAgICAgICAgICAgICA8L0xpbms+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInJvb3RcIj5cclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbnRhaW5lclwiPntjaGlsZHJlbn08L2Rpdj5cclxuICAgICAgPC9kaXY+XHJcbiAgICA8Lz5cclxuICApO1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBNeUFwcDtcclxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUtBLFNBQVMsWUFBWTtBQUVyQixTQUFTLFdBQVcsZ0JBQWdCO0FBRXBDLE9BQU87QUFpQkgsbUJBS1UsS0FFRixZQVBSO0FBZkosU0FBUyxNQUFNLEVBQUUsU0FBUyxHQUFHO0FBQzNCLFFBQU0sQ0FBQyxZQUFZLFdBQVcsSUFBSSxTQUFTLEtBQUs7QUFDaEQsWUFBVSxNQUFNO0FBQ2QsUUFBSSxPQUFPLFdBQVcsWUFBYTtBQUNuQyxXQUFPLGlCQUFpQixVQUFVLE1BQU07QUFDdEMsWUFBTSxZQUFZLE9BQU87QUFDekIsVUFBSSxZQUFZLElBQUk7QUFDbEIsb0JBQVksSUFBSTtBQUFBLE1BQ2xCLE9BQU87QUFDTCxvQkFBWSxLQUFLO0FBQUEsTUFDbkI7QUFBQSxJQUNGLENBQUM7QUFBQSxFQUNILENBQUM7QUFFRCxTQUNFLGlCQUNFO0FBQUEsUUFBQyxTQUFJLFdBQVcseUJBQXlCLGFBQWEsY0FBYyxFQUFFLElBQ3BFLGNBQUMsU0FBSSxXQUFVLGFBQ2IsZUFBQyxTQUFJLFdBQVcsVUFDZDtBQUFBLFVBQUMsU0FBSSxXQUFVLFFBQ2IsY0FBQyxRQUFLLE1BQUssS0FBSSxnQ0FBSSxHQUNyQjtBQUFBLE1BQ0EsS0FBQyxTQUFJLFdBQVUsU0FDYjtBQUFBLFlBQUMsUUFBSyxNQUFLLFlBQ1QsY0FBQyxPQUFFLFdBQVUsb0JBQW1CLEdBQ2xDO0FBQUEsUUFDQSxJQUFDLFFBQUssTUFBSyxTQUNULGNBQUMsT0FBRSxXQUFVLGNBQWEsR0FDNUI7QUFBQSxRQUNBLElBQUMsUUFBSyxNQUFLLFVBQ1QsY0FBQyxPQUFFLFdBQVUsY0FBYSxHQUM1QjtBQUFBLFNBQ0Y7QUFBQSxPQUNGLEdBQ0YsR0FDRjtBQUFBLElBQ0EsSUFBQyxTQUFJLFdBQVUsUUFDYixjQUFDLFNBQUksV0FBVSxhQUFhLFVBQVMsR0FDdkM7QUFBQSxLQUNGO0FBRUo7QUFFQSxJQUFPLGlCQUFROyIsCiAgIm5hbWVzIjogW10KfQo=
