# app.py
from flask import Flask, render_template, jsonify, request
import sqlite3
from datetime import datetime

app = Flask(__name__)


# Инициализация базы данных
def init_db():
    conn = sqlite3.connect('tetris.db')
    c = conn.cursor()
    c.execute('''CREATE TABLE IF NOT EXISTS scores
                 (name TEXT, score INTEGER, date TEXT)''')
    conn.commit()
    conn.close()


@app.route('/')
def index():
    return render_template('index.html', top_players=get_top_players())


def get_top_players():
    conn = sqlite3.connect('tetris.db')
    c = conn.cursor()
    c.execute('SELECT name, score FROM scores ORDER BY score DESC LIMIT 10')
    players = c.fetchall()
    conn.close()
    return players


@app.route('/save_score', methods=['POST'])
def save_score():
    data = request.get_json()
    name = data['name']
    score = data['score']

    conn = sqlite3.connect('tetris.db')
    c = conn.cursor()
    c.execute('INSERT INTO scores (name, score, date) VALUES (?, ?, ?)',
              (name, score, datetime.now().strftime('%Y-%m-%d %H:%M:%S')))
    conn.commit()
    conn.close()

    return jsonify({'status': 'success'})


if __name__ == '__main__':
    init_db()
    app.run(debug=True)
