from flask import Flask

def create_app():
    app = Flask(__name__, static_folder='static')
    app.secret_key = "we will do it"


    from .controllers import auths, reading, listening, writing

   
    app.register_blueprint(auths.auths_bp)  
    app.register_blueprint(reading.reading_bp)
    app.register_blueprint(listening.listening_bp, url_prefix='/listening')
    app.register_blueprint(writing.writing_bp, url_prefix='/writing')

    return app
