class HelpPage {

}

class HelpModule {
    viewModule = HelpPage;
    template = { require: 'text!../pages/help.html' };
}

export = new HelpModule();