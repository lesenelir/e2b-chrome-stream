# e2b-chrome-stream

`e2b-chrome-stream` is an E2B template for running a full Chrome browser inside an ephemeral sandbox and viewing it through the browser with noVNC.

The project packages a lightweight Linux desktop stack:

- `Xvfb` provides the virtual display.
- `Openbox` provides a minimal window manager.
- `google-chrome-stable` runs on that display.
- `x11vnc` exposes the desktop as a VNC server.
- `noVNC` and `websockify` publish it over HTTP on port `8080`.

The result is a sandbox you can open from a normal browser and use as a remote Chrome session.

## What This Repository Contains

- `Dockerfile`: Builds the runtime image with Chrome, X11, VNC, and noVNC.
- `supervisord.conf`: Starts and supervises the display server, window manager, VNC bridge, noVNC, and Chrome.
- `vnc.html`: Replaces the default noVNC entry page with a minimal full-screen client that auto-reconnects.
- `template.ts`: Declares the E2B template from the Dockerfile.
- `build.dev.ts`: Builds the development template as `e2b-chrome-stream-dev`.
- `build.prod.ts`: Builds the production template as `e2b-chrome-stream`.
- `app.ts`: Creates a sandbox from `e2b-chrome-stream-dev`, maps port `8080`, and prints the remote URL.

## How It Works

At runtime, `supervisord` starts the following services in order:

1. `Xvfb :99 -screen 0 1024x768x24`
2. `openbox --display :99`
3. `xsetroot` to paint the background black
4. `x11vnc` on the same display
5. `websockify --web=/usr/share/novnc/ 8080 localhost:5900`
6. `google-chrome-stable` attached to `DISPLAY=:99`

When you call `sandbox.getHost(8080)`, E2B gives you a public host for the noVNC web app. Opening that URL connects you to the running Chrome session inside the sandbox.

## Prerequisites

Before using this project, you need:

- an E2B account
- an E2B API key
- Node.js
- a package manager such as `pnpm` or `npm`

Create a local `.env` file:

```bash
E2B_API_KEY=your_api_key_here
```

## Build the Template

Development template:

```bash
pnpm e2b:build:dev
```

Production template:

```bash
pnpm e2b:build:prod
```

These scripts build the Docker-based template under the following names:

- `e2b-chrome-stream-dev`
- `e2b-chrome-stream`

## Start a Sandbox

Run the development entry point:

```bash
pnpm dev
```

The script in [`app.ts`](/Users/lesenelir/GithubProjects/e2b-chrome-stream/app.ts) does three things:

1. creates a sandbox from `e2b-chrome-stream-dev`
2. sets a sandbox timeout of `2 * 60 * 1000` milliseconds
3. prints the public noVNC URL for port `8080`

Open the printed URL in your browser to view the remote Chrome window.

## License
MIT
