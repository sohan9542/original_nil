import React, {useEffect} from "react";

function App() {
  useEffect(() => {
    // Dynamically add app.js
    const appScript = document.createElement('script');
    appScript.src = '/js/app.js';
    appScript.type = 'module';
    document.body.appendChild(appScript);

    // Dynamically add route.js
    const routeScript = document.createElement('script');
    routeScript.src = '/js/route.js';
    routeScript.type = 'module';
    document.body.appendChild(routeScript);

    // Dynamically add index.js
    const indexScript = document.createElement('script');
    indexScript.src = 'index.js';
    document.body.appendChild(indexScript);

    // Cleanup to remove scripts on component unmount
    return () => {
      document.body.removeChild(appScript);
      document.body.removeChild(routeScript);
      document.body.removeChild(indexScript);
    };
  }, []);
  return (
    <div>
      {/* HEADER */}
      <header className="header">
        <div className="container">
          <a href="/weather?lat=51.5073219&lon=-0.1276474" className="logo">
            <img
              src="/images/logo.png"
              width="364"
              height="58"
              alt="logo"
            />
          </a>

          <div className="search-view" data-search-view>
            <div className="search-wrapper">
              <input
                type="search"
                name="search"
                placeholder="Search city..."
                autoComplete="off"
                className="search-field"
                data-search-field
              />
              <span className="m-icon leading-icon">search</span>

              <button
                className="icon-btn leading-icon has-state"
                aria-label="close search"
                data-search-toggler
              >
                <span className="m-icon">arrow_back</span>
              </button>
            </div>

            <div className="search-result" data-search-result></div>
          </div>

          <div className="header-actions">
            <button
              className="icon-btn has-state"
              aria-label="open search"
              data-search-toggler
            >
              <span className="m-icon icon">search</span>
            </button>

            <a
              href="#/current-location"
              className="btn-primary has-state"
              data-current-location-btn
            >
              <span className="m-icon">my_location</span>
              <span className="span">Current Location</span>
            </a>
          </div>
        </div>
      </header>

      {/* MAIN */}
      <main>
        <article className="container" data-container>
          <div className="content-left">
            {/* Current Weather */}
            <section
              className="section current-weather"
              aria-label="current weather"
              data-current-weather
            ></section>

            {/* Forecast */}
            <section
              className="section forecast"
              aria-labelledby="forecast"
              data-5-day-forecast
            ></section>
          </div>

          <div className="content-right">
            {/* Highlights */}
            <section
              className="section highlights"
              aria-labelledby="highlights-label"
              data-highlights
            ></section>

            {/* Hourly Forecast */}
            <section
              className="section hourly-forecast"
              aria-label="hourly forecast"
              data-hourly-forecast
            ></section>

            {/* Footer */}
            <footer className="footer">
              <p className="body-3">
                Copyright 2024 n1l4y. All Rights Reserved.
              </p>
              <p className="body-3">
                Powered By{" "}
                <a
                  href="https://openweathermap.org/api"
                  title="Free OpenWeather Api"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src="/images/openweather.png"
                    loading="lazy"
                    width="150"
                    height="30"
                    alt="OpenWeather"
                  />
                </a>
              </p>
            </footer>
          </div>

          <div className="loading" data-loading></div>
        </article>
      </main>

      {/* 404 */}
      <section className="error-content" data-error-content>
        <h2 className="heading">404</h2>
        <p className="body-1">Page not found!</p>
        <a
          href="#/weather?lat=51.5073219&lon=-0.1276474"
          className="btn-primary"
        >
          <span className="span">Go Home</span>
        </a>
      </section>
    </div>
  );
}

export default App;
