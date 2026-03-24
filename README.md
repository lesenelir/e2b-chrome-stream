# e2b-chrome-stream

`e2b-chrome-stream` is an E2B template for running a full Chrome browser inside an ephemeral sandbox and viewing it through the browser with noVNC.

The project packages a lightweight Linux desktop stack:

- `Xvfb` provides the virtual display.
- `Openbox` provides a minimal window manager.
- `google-chrome-stable` runs on that display.
- `x11vnc` exposes the desktop as a VNC server.
- `noVNC` and `websockify` publish it over HTTP on port `8080`.

The result is a sandbox you can open from a normal browser and use as a remote Chrome session.

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

## License
MIT
