# brodie969/server-side-weather

This project is yet *another* weather app, but this time it doesn't contain a single line of Javascript. All the weather data is pre-rendered on the server-side, using Flask.

## How To Run Locally

1. Clone this repository:

```bash
git clone https://github.com/brodie969/dashboard
```

2. Install Flask

```bash
pip install Flask
```

3. Create A File Called `config.js`

Enter your [weatherapi.com API Key](https://www.weatherapi.com/) and your nearest major city into `config.json`:

```JSON
{
    "key": "1234567890"
}
```

4. Run Flask App

```bash
python main.py
```

5. Access The Site From Any Device On The Same Network At `http://192.168.1.XXX:8000` (Host's IP)
