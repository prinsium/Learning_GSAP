const menuIcon = document.getElementById("menu-icon");
const navList = document.getElementById("nav-list");

// Create timeline
const tl = gsap.timeline({ paused: true, reversed: true });

// Animate: icon rotate + nav list expand
tl.to(menuIcon, {
  rotate: 45,
  duration: 0.3,
  ease: "power2.inOut",
})
.to(
  navList,
  {
    height: "auto",
    opacity: 1,
    duration: 0.5,
    stagger: 0.1,
    ease: "power2.inOut",
    onStart: () => {
      navList.style.display = "block";
    },
    onReverseComplete: () => {
      navList.style.display = "none";
    }
  },
  "<"
);

// Make sure nav list is hidden initially
navList.style.display = "none";

menuIcon.addEventListener("click", () => {
  if (tl.reversed()) {
    navList.style.display = "block";
    tl.play();
  } else {
    tl.reverse();
  }
});
