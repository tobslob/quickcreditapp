/* Toggle functionality for user  */
function userToggle() {
    const userlists = document.querySelector('.userlist');
    const panelusers = document.querySelectorAll('.paneluser');
    if (userlists) {
        userlists.addEventListener('click', (e) => {
            if (e.target.tagName === 'LI') {
                const targetUserPanel = document.querySelector(e.target.dataset.target);

                panelusers.forEach((paneluser) => {
                    if (paneluser === targetUserPanel) {
                        paneluser.classList.add('activerUserPanel');
                    } else {
                        paneluser.classList.remove('activerUserPanel');
                    }
                });
            }
        });
    }
}

/* Toggle functionality for admin panel */
function adminToggle() {
    const lists = document.querySelector('.list');
    const panels = document.querySelectorAll('.panel');
    console.log(panels)
    if (lists) {
        lists.addEventListener('click', (e) => {
            if (e.target.tagName === 'LI') {
                const targetPanel = document.querySelector(e.target.dataset.target);


                panels.forEach((panel) => {
                    if (panel === targetPanel) {
                        panel.classList.add('active');
                    } else {
                        panel.classList.remove('active');
                    }
                });
            }
        });
    }
}

userToggle();
adminToggle();
