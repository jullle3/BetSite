var nav_bar =
    '        <a class="navbar-brand" href="index.html">Find nu på et navn..:)</a>\n' +
    '        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">\n' +
    '            <span class="navbar-toggler-icon"></span>\n' +
    '        </button>\n' +
    '        <div class="collapse navbar-collapse" id="navbarNavAltMarkup">\n' +
    '            <div class="navbar-nav">\n' +
    '                <a class="nav-item nav-link" href="main.html">Kommende odds</a>\n' +
    '                <a class="nav-item nav-link" href="history.html">Historik</a>\n' +
    '                <a class="nav-item nav-link" href="#" data-toggle="modal" data-target="#modal_hvordan">Hvordan virker det?</a>\n' +
    '                <a id="nav_login" class="nav-item nav-link" href="#" data-toggle="modal" data-target="#loginModal">Log ind</a>\n' +
    '                <a id="nav_logout" onclick="logout()" class="nav-item nav-link" hidden style="cursor:pointer">Log ud</a>\n' +
    '            </div>\n' +
    '        </div>'


var all_modals =
    '        <div class="modal fade" id="modal_hvordan">\n' +
    '            <div class="modal-dialog">\n' +
    '                <div class="modal-content">\n' +
    '\n' +
    '                    <!-- Modal Header -->\n' +
    '                    <div class="modal-header">\n' +
    '                        <h4 class="modal-title">Kontakt</h4>\n' +
    '                        <button type="button" class="close" data-dismiss="modal">×</button>\n' +
    '                    </div>\n' +
    '\n' +
    '                    <!-- Modal body -->\n' +
    '                    <div class="modal-body">\n' +
    '                        <p>Todo</p>\n' +
    '                    </div>\n' +
    '\n' +
    '                    <!-- Modal footer -->\n' +
    '                    <div class="modal-footer">\n' +
    '                        <button type="button" class="btn btn-primary" data-dismiss="modal">Luk</button>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '            </div>\n' +
    '        </div>' +

    '<div id="loginModal" class="modal fade">\n' +
    '  <div class="modal-dialog modal-login">\n' +
    '    <div class="modal-content">\n' +
    '      <div class="modal-header">\n' +
    '        <h4 class="modal-title" id="sign_in_text">Log ind</h4>\n' +
    '        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>\n' +
    '      </div>\n' +
    '      <div class="modal-body">\n' +
    '        <form id="form_login">\n' +
    '          <div class="form-group">\n' +
    '            <div class="input-group">\n' +
    '              <span class="input-group-addon"><i class="fa fa-user"></i></span>\n' +
    '              <input type="text" class="form-control" name="email" placeholder="Email" required="required">\n' +
    '            </div>\n' +
    '          </div>\n' +
    '          <div class="form-group">\n' +
    '            <div class="input-group">\n' +
    '              <span class="input-group-addon"><i class="fa fa-lock"></i></span>\n' +
    '              <input type="password" class="form-control" name="password" placeholder="Kode" required="required">\n' +
    '            </div>\n' +
    '          </div>\n' +
    '          <div class="form-group">\n' +
    '            <button type="button" class="btn btn-primary btn-block btn-lg" onclick="login()">Log ind</button>\n' +
    '          </div>\n' +
    '          <p class="hint-text"><a href="#">Glemt password?</a></p>\n' +
    '        </form>\n' +
    '      </div>\n' +
    '      <div class="modal-footer">Ny bruger? <a class="nav-item nav-link" href="#" data-toggle="modal" data-target="#create_user_modal">Opret her</a></div>\n' +
    '    </div>\n' +
    '  </div>\n' +
    '</div>' +
    '\n' +

    '<div id="create_user_modal" class="modal fade" style="z-index: 5000; position: absolute">\n' +
    '  <div class="modal-dialog modal-login">\n' +
    '    <div class="modal-content" style="min-height: 24rem">\n' +
    '      <div class="modal-header">\n' +
    '        <h4 class="modal-title" id="create_user_text">Opret bruger</h4>\n' +
    '        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>\n' +
    '      </div>\n' +
    '      <div class="modal-body">\n' +
    '        <form id="form_create_user">\n' +
    '          <div class="form-group">\n' +
    '            <div class="input-group">\n' +
    '              <span class="input-group-addon"><i class="fa fa-user"></i></span>\n' +
    '              <input type="text" class="form-control" name="email1" placeholder="Email" required="required">\n' +
    '            </div>\n' +
    '            <div class="input-group">\n' +
    '              <span class="input-group-addon"><i class="fa fa-user"></i></span>\n' +
    '              <input type="text" class="form-control" name="email2" placeholder="Gentag email" required="required">\n' +
    '            </div>\n' +
    '          </div>\n' +
    '          <div class="form-group">\n' +
    '            <div class="input-group">\n' +
    '              <span class="input-group-addon"><i class="fa fa-lock"></i></span>\n' +
    '              <input type="password" class="form-control" name="password1" placeholder="Kode" required="required">\n' +
    '            </div>\n' +
    '            <div class="input-group">\n' +
    '              <span class="input-group-addon"><i class="fa fa-lock"></i></span>\n' +
    '              <input type="password" class="form-control" name="password2" placeholder="Gentag kode" required="required">\n' +
    '            </div>\n' +
    '          </div>\n' +
    '          <div class="form-group">\n' +
    '            <button type="button" class="btn btn-primary btn-block btn-lg" onclick="create_user()">Opret bruger</button>\n' +
    '          </div>\n' +
    '        </form>\n' +
    '      </div>\n' +
    '      <!--<div class="modal-footer">Eksisterende bruger? <a class="nav-item nav-link" href="#" data-toggle="modal" data-target="#loginModal">Log ind her</a></div> -->\n' +
    '    </div>\n' +
    '  </div>\n' +
    '</div>' +
    ''


var footer =
    '        <div class="bottom-banner">\n' +
    '            <div class="row navbar-dark">\n' +
    '                <div class="col-sm-6">\n' +
    '\n' +
    //    '                    <div class="container text-center" style="color:#b1afaf">\n' +
    '                    <div class="container text-center " style="color:#b1afaf">\n' +
    '                        <p></p>\n' +
    '                        <p>Alle odds er vist med værdien oddset stod til da det blev hentet</p>\n' +
    '                        <p>Der tages forbehold for oddsændringer fra de enkelte bookmakers, & fejl</p>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '                <div class="col-sm-6">\n' +
    '                    <div class="container text-center">\n' +
    '                        <a class="nav-link" href="#" data-toggle="modal" data-target="#modal_kontakt">Kontakt</a>\n' +
    '                        <a class="nav-item nav-link" href="main.html">Kommende odds</a>\n' +
    '                        <a class="nav-link" href="history.html"">Historik</a>\n' +
    '                        <a class="nav-item nav-link" href="#" data-toggle="modal" data-target="#modal_hvordan">Hvordan virker det?</a>\n' +
    '                        <a class="nav-link" href="#">FAQ</a>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '            </div>\n' +
    '\n' +
    '            <div class="footer-copyright" style="color:#b1afaf">\n' +
    '                <p>© 2021 Copyright SOME_NAME.dk. All Rights Reserved.</p>\n' +
    '            </div>\n' +
    '        </div>'


function loadHTML(skip_footer=false) {
    document.getElementById('placeholder-navbar').innerHTML = nav_bar;
    document.getElementById('placeholder_all_modals').innerHTML = all_modals;

    if (!skip_footer) {
        document.getElementById('placeholder_footer').innerHTML = footer;
    }

    // Updater UI afhængigt af om man er logget ind
    logout_nav = document.getElementById("nav_logout")
    login_nav = document.getElementById("nav_login")
    jwt = window.localStorage.getItem("jwt")

    // Ikke logget ind
    if (jwt == null){
        console.log("not logged in")
        login_nav.hidden = false
        logout_nav.hidden = true
    // Logget ind
    } else {
        console.log("logged in")
        login_nav.hidden = true
        logout_nav.hidden = false
    }


    // Login modal reagerer på 'enter'
    var input = document.getElementById("loginModal");
    input.addEventListener("keyup", function(event) {
        if (event.keyCode === 13) {
            login()
        }
    });


}
