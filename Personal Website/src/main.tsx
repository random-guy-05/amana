import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/global.css";
import "./styles/ecg.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

// Add cinematic "in-view" class after initial paint (respect reduced-motion)
if (typeof window !== 'undefined') {
  const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!prefersReduced) {
    window.requestAnimationFrame(() => {
      setTimeout(() => {
        document.querySelector('.page-shell')?.classList.add('in-view');
      }, 60);
    });
  } else {
    document.querySelector('.page-shell')?.classList.add('in-view');
  }
}

