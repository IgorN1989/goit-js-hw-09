!function(){var t=document.querySelector("[data-start]"),e=document.querySelector("[data-stop]"),n=document.querySelector("body"),a=0;function o(t,e){t.disabled&&(t.disabled=!1,e.disabled=!0)}function d(t){t.style.backgroundColor="#".concat(Math.floor(16777215*Math.random()).toString(16).padStart(6,0))}t.addEventListener("click",(function(){o(e,t),d(n),a=setInterval((function(){d(n)}),1e3)})),e.addEventListener("click",(function(){o(t,e),clearInterval(a)})),e.disabled=!0}();
//# sourceMappingURL=01-color-switcher.3c120a16.js.map
