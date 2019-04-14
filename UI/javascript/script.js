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

userToggle();