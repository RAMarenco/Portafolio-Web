let burger_menu_icon = document.getElementById("burger-menu-icon");
let nav = document.getElementById("nav");

burger_menu_icon.addEventListener("click", () => {
    let animation = burger_menu_icon.animate([            
        { opacity: 0},
        { opacity: 0.5},
        { opacity: 1}
      ], {             
        duration: 300,
        fill: "forwards"
    });;
    nav.classList.toggle("nav-active");
    if(nav.classList.contains("nav-active")){        
        burger_menu_icon.textContent = "X";        
    }else{
        burger_menu_icon.textContent = "☰";
    }
});
