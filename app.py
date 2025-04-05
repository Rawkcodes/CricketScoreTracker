import os
import json
import logging
from flask import Flask, render_template, request, jsonify, redirect, url_for

# Configure logging
logging.basicConfig(level=logging.DEBUG)

# Create Flask app
app = Flask(__name__)
app.secret_key = os.environ.get("SESSION_SECRET", "cricket_score_app_secret")

# Custom Jinja filter for safe slicing
@app.template_filter('safe_slice')
def safe_slice(iterable, start, end=None):
    if not iterable:
        return []
    if end is None:
        return iterable[start:]
    return iterable[start:end]

# Helper function to load data from JSON files
def load_data(filename):
    try:
        with open(f"static/data/{filename}", 'r') as file:
            return json.load(file)
    except Exception as e:
        logging.error(f"Error loading {filename}: {e}")
        return {}

# Routes
@app.route('/')
def index():
    matches = load_data("matches.json")
    tournaments = load_data("tournaments.json")
    return render_template('index.html', matches=matches, tournaments=tournaments)

@app.route('/match/<match_id>')
def match_detail(match_id):
    matches = load_data("matches.json")
    match = next((m for m in matches if m.get('id') == match_id), None)
    if not match:
        return redirect(url_for('index'))
    return render_template('match_detail.html', match=match)

@app.route('/teams')
def teams_list():
    teams = load_data("teams.json")
    return render_template('teams.html', teams=teams)

@app.route('/team/<team_id>')
def team_detail(team_id):
    teams = load_data("teams.json")
    team = next((t for t in teams if t.get('id') == team_id), None)
    matches = load_data("matches.json")
    # Filter matches for this team
    team_matches = [m for m in matches if team_id in [m.get('team1_id'), m.get('team2_id')]]
    if not team:
        return redirect(url_for('teams_list'))
    return render_template('team_detail.html', team=team, matches=team_matches)

@app.route('/players')
def players_list():
    players = load_data("players.json")
    return render_template('players.html', players=players)

@app.route('/player/<player_id>')
def player_detail(player_id):
    players = load_data("players.json")
    player = next((p for p in players if p.get('id') == player_id), None)
    if not player:
        return redirect(url_for('players_list'))
    return render_template('player_detail.html', player=player)

@app.route('/search')
def search():
    query = request.args.get('q', '').lower()
    results = {'matches': [], 'teams': [], 'players': []}
    
    if query:
        # Search in matches
        matches = load_data("matches.json")
        results['matches'] = [m for m in matches if query in m.get('team1', '').lower() or 
                             query in m.get('team2', '').lower() or 
                             query in m.get('tournament', '').lower()]
        
        # Search in teams
        teams = load_data("teams.json")
        results['teams'] = [t for t in teams if query in t.get('name', '').lower() or 
                           query in t.get('short_name', '').lower()]
        
        # Search in players
        players = load_data("players.json")
        results['players'] = [p for p in players if query in p.get('name', '').lower() or 
                             query in p.get('country', '').lower()]
    
    return render_template('search.html', results=results, query=query)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
