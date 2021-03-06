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
    '                <a class="nav-item nav-link disabled" href="#">Login</a>\n' +
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
    '        </div>'


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

function loadHTML() {
    document.getElementById('placeholder-navbar').innerHTML = nav_bar;
    document.getElementById('placeholder_all_modals').innerHTML = all_modals;
    document.getElementById('placeholder_footer').innerHTML = footer;
}
