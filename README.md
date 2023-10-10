# brodie969/dashboard

This project is a Flask-based IOT Dashboard designed to run on a Raspberry Pi, or any PC that runs 24/7. It provides real-time weather information and features a simple to-do list/reminder system. As the project evolves, it aims to become a versatile dashboard for various useful functionalities.

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

Enter your [weatherapi.com API Key](https://www.weatherapi.com/) and your nearest major city into `config.js`:

```Javascript
export const data = {
    key: "1234567890",
    location: "Brisbane",
};
```

4. Run Flask App

```bash
python main.py
```

5. Access The Site From Any Device On The Same Network At `http://192.168.1.XXX:8000` (Host's IP)

## Plans:

- Stock Prices (May Have To Be Serve Side Rendered)

- File/Directory Sync
