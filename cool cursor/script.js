// gsap.to("h1", {
//     duration: 2,
//     delay:1,
//     rotation: 360,
//     color: "blue", // 👈 Add this line
//     ease: "power1.inOut",
//     repeat: 1,
//     yoyo: true,
//   });

var cursor = document.querySelector("#cursor")
var img = document.querySelector("#image")
document.querySelector("#box").addEventListener("mousemove", function(dets) {
    gsap.to(cursor, {
        duration: 0.5,
        x: dets.x,
        y: dets.y,
        ease: "back.out(1.7)",
    })
  })

  img.addEventListener("mouseenter", function(dets) {
    gsap.to(cursor, {
        scale:3,
        duration: 0.5,
    })
  })

  img.addEventListener("mouseleave", function(dets) {
    gsap.to(cursor, {
        scale:1,
        duration: 0.5,
    })
  })
  

