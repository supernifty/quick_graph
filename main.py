#!/usr/bin/env python

import flask

app = flask.Flask(__name__, template_folder='templates')
app.config.from_pyfile('config.py')
app.secret_key = 'ducks in space'

@app.route('/', methods=['GET', 'POST'])
def main():
    '''
        saves the uploaded file and forwards to the processor
    '''
    if flask.request.method == 'POST':
        # check if the post request has the file part
        if 'file' not in flask.request.files:
            flask.abort(400, 'No file part')
            return flask.redirect(flask.request.url)
        file = flask.request.files['file']
        # if user does not select file, browser also
        # submit a empty part without filename
        if file.filename == '':
            flask.abort(400, 'No selected file')
            return flask.redirect(flask.request.url)
        if file:
            data = ''.join([line.decode("utf-8") for line in file])
            return flask.render_template('main.html', data=data)
    return flask.render_template('main.html')

if __name__ == '__main__':
  app.run(host='0.0.0.0', port=4321)
